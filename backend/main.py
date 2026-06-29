from flask import Flask, jsonify

# Inicializamos la aplicación
app = Flask(__name__)

# Definimos nuestra primera ruta REST
@app.route('/api/estado', methods=['GET'])
def estado_servidor():
    return jsonify({
        "estado": "ok",
        "mensaje": "¡El motor Flask de GASDI está vivo y escuchando!"
    })

# Punto de ejecución
if __name__ == '__main__':
    app.run(debug=True, port=8080)