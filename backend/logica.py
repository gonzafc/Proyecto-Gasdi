class Usuario:
    def __init__(self, id_usuario, nombre):
        self.id = id_usuario
        self.nombre = nombre

class Gasto:
    def __init__(self, id_gasto, concepto, monto, pagador_id, participantes_ids):
        self.id = id_gasto
        self.concepto = concepto
        self.monto = float(monto)
        self.pagador_id = pagador_id
        self.participantes_ids = participantes_ids

class Grupo:
    def __init__(self, id_grupo, nombre):
        self.id = id_grupo
        self.nombre = nombre
        self.usuarios = []
        self.gastos = []

    def agregar_usuario(self, usuario):
        self.usuarios.append(usuario)

    def eliminar_usuario(self, id_usuario):
        self.usuarios = [u for u in self.usuarios if u.id != id_usuario]

    def agregar_gasto(self, gasto):
        self.gastos.append(gasto)

    def calcular_saldos(self):
        balances = {usuario.id: 0.0 for usuario in self.usuarios}

        for gasto in self.gastos:
            cantidad_participantes = len(gasto.participantes_ids)
            if cantidad_participantes == 0:
                continue

            division = gasto.monto / cantidad_participantes

            if gasto.pagador_id in balances:
                balances[gasto.pagador_id] += gasto.monto

            for part_id in gasto.participantes_ids:
                if part_id in balances:
                    balances[part_id] -= division

        deudores = []
        acreedores = []

        for id_usuario, balance in balances.items():
            if balance < -0.01:
                deudores.append({"id": id_usuario, "monto": abs(balance)})
            elif balance > 0.01:
                acreedores.append({"id": id_usuario, "monto": balance})

        deudores.sort(key=lambda x: x["monto"], reverse=True)
        acreedores.sort(key=lambda x: x["monto"], reverse=True)

        transferencias = []
        i = 0
        j = 0

        # Función de utilidad (helper) para buscar el nombre por ID
        def obtener_nombre(id_buscado):
            for u in self.usuarios:
                if u.id == id_buscado:
                    return u.nombre
            return "Desconocido"

        # calcular compensaciones
        while i < len(deudores) and j < len(acreedores):
            deudor = deudores[i]
            acreedor = acreedores[j]

            monto_a_transferir = min(deudor["monto"], acreedor["monto"])

            nombre_deudor = obtener_nombre(deudor["id"])
            nombre_acreedor = obtener_nombre(acreedor["id"])

            transferencias.append({
                "de": nombre_deudor,
                "para": nombre_acreedor,
                "monto": round(monto_a_transferir)
            })

            deudor["monto"] -= monto_a_transferir
            acreedor["monto"] -= monto_a_transferir

            if deudor["monto"] < 0.01:
                i += 1
            if acreedor["monto"] < 0.01:
                j += 1

        saldos_netos_con_nombres = {}
        for id_usuario, balance in balances.items():
            nombre = obtener_nombre(id_usuario)
            saldos_netos_con_nombres[nombre] = round(balance)

        return {
            "saldosNetos": saldos_netos_con_nombres,
            "transferencias": transferencias
        }