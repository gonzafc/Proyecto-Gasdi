// Descomentar los "export" cuando vayas a importar esto en React
export class Usuario {
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre;
  }
}

export class Gasto {
  constructor(id, concepto, monto, pagadorId, participantesIds) {
    this.id = id;
    this.concepto = concepto;
    this.monto = monto; 
    this.pagadorId = pagadorId;
    this.participantesIds = participantesIds;
  }
}

export class Grupo {
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre;
    this.usuarios = [];
    this.gastos = [];
  }

  agregarUsuario(usuario) {
    this.usuarios.push(usuario);
  }

  agregarGasto(gasto) {
    this.gastos.push(gasto);
  }

  calcularSaldos() {
    const balances = {};
    
    this.usuarios.forEach(usuario => {
      balances[usuario.id] = 0;
    });

    this.gastos.forEach(gasto => {
      const cantidadParticipantes = gasto.participantesIds.length;
      if (cantidadParticipantes === 0) return; 

      const division = gasto.monto / cantidadParticipantes;

      if (balances[gasto.pagadorId] !== undefined) {
        balances[gasto.pagadorId] += gasto.monto;
      }

      gasto.participantesIds.forEach(id => {
        if (balances[id] !== undefined) {
          balances[id] -= division;
        }
      });
    });

    const deudores = [];
    const acreedores = [];

    for (const [idStr, balance] of Object.entries(balances)) {
      const id = Number(idStr);
      if (balance < -0.01) {
        deudores.push({ id, monto: Math.abs(balance) });
      } else if (balance > 0.01) {
        acreedores.push({ id, monto: balance });
      }
    }

    deudores.sort((a, b) => b.monto - a.monto);
    acreedores.sort((a, b) => b.monto - a.monto);

    const transferencias = [];
    let i = 0;
    let j = 0;

    while (i < deudores.length && j < acreedores.length) {
      const deudor = deudores[i];
      const acreedor = acreedores[j];

      const montoATransferir = Math.min(deudor.monto, acreedor.monto);

      const nombreDeudor = this.usuarios.find(u => u.id === deudor.id).nombre;
      const nombreAcreedor = this.usuarios.find(u => u.id === acreedor.id).nombre;

      transferencias.push({
        de: nombreDeudor,
        para: nombreAcreedor,
        monto: Math.round(montoATransferir)
      });

      deudor.monto -= montoATransferir;
      acreedor.monto -= montoATransferir;

      if (deudor.monto < 0.01) i++;
      if (acreedor.monto < 0.01) j++;
    }

    const saldosNetosConNombres = {};
    for (const [idStr, balance] of Object.entries(balances)) {
      const id = Number(idStr);
      const nombre = this.usuarios.find(u => u.id === id).nombre;
      saldosNetosConNombres[nombre] = Math.round(balance);
    }

    return {
      saldosNetos: saldosNetosConNombres,
      transferencias: transferencias
    };
  }
}

// --- TEST DE PRUEBA ---
const grupoFacultad = new Grupo(1, "Trabajo Práctico Sistemas");

const gonzalo = new Usuario(1, "Gonzalo");
const luciano = new Usuario(2, "Luciano");
const nahuel = new Usuario(3, "Nahuel");
const tato = new Usuario(4, "Tatooo");

grupoFacultad.agregarUsuario(gonzalo);
grupoFacultad.agregarUsuario(luciano);
grupoFacultad.agregarUsuario(nahuel);
grupoFacultad.agregarUsuario(tato);

grupoFacultad.agregarGasto(new Gasto(101, "Comida", 15000.50, 1, [1, 2, 3, 4]));
grupoFacultad.agregarGasto(new Gasto(102, "Bebidas", 8500, 3, [1, 2, 3, 4]));

const resultados = grupoFacultad.calcularSaldos();
console.log("Resultados de la juntada:", JSON.stringify(resultados, null, 2));