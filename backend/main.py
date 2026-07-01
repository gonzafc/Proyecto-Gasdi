from flask import Flask, jsonify
from flask_cors import CORS
from database import db
from logica import Grupo, Usuario, Gasto

app = Flask(__name__)
CORS(app)

@app.route('/api/estado', methods=['GET'])
def estado_servidor():
    return jsonify({
        "estado": "ok",
        "mensaje": "¡El motor Flask de GASDI está vivo y escuchando!"
    })

@app.route('/api/calcular/<grupo_id>', methods=['GET'])
def calcular_deudas(grupo_id):
    try:
        grupo_ref = db.collection('grupos').document(grupo_id).get()
        if not grupo_ref.exists:
            return jsonify({"error": "Grupo no encontrado"}), 404
        
        datos_grupo = grupo_ref.to_dict()
        
        grupo_obj = Grupo(id_grupo=grupo_id, nombre=datos_grupo.get('nombre', 'Sin nombre'))
        usuarios_refs = db.collection('grupos').document(grupo_id).collection('usuarios').stream()
        for u in usuarios_refs:
            datos_user = u.to_dict()
            nuevo_usuario = Usuario(id_usuario=u.id, nombre=datos_user.get('nombre', 'Desconocido'))
            grupo_obj.agregar_usuario(nuevo_usuario)

        gastos_refs = db.collection('grupos').document(grupo_id).collection('gastos').stream()
        for g in gastos_refs:
            datos_gasto = g.to_dict()
            nuevo_gasto = Gasto(
                id_gasto=g.id,
                concepto=datos_gasto.get('concepto', ''),
                monto=datos_gasto.get('monto', 0),
                pagador_id=datos_gasto.get('pagador_id', ''),
                participantes_ids=datos_gasto.get('participantes_id', [])
            )
            grupo_obj.agregar_gasto(nuevo_gasto)

        resultados = grupo_obj.calcular_saldos()
        
        return jsonify(resultados), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8080)