import { useState, useEffect } from 'react';
import { Grupo, Usuario, Gasto } from './logic/clases'; 
import { AddFriendForm } from './components/AddFriendForm';
import { ExpenseForm } from './components/ExpenseForm';
import { BalanceBoard } from './components/BalanceBoard';
import { ExpenseList } from './components/ExpenseList';
import { FriendList } from './components/FriendList';
import { guardarAmigoEnNube, obtenerAmigosDeNube, guardarGastoEnNube, obtenerGastosDeNube } from './services/firestoreService';

function App() {
  const [grupo] = useState(new Grupo(1, "Juntada"));
  const [amigos, setAmigos] = useState([]);
  const [gastos, setGastos] = useState([]); 
  const [resultados, setResultados] = useState(null);

  useEffect(() => {
    const inicializarDatos = async () => {
      try {
        grupo.usuarios = [];
        grupo.gastos = [];
        const datosAmigos = await obtenerAmigosDeNube();
        const instanciasUsuarios = datosAmigos.map(dato => new Usuario(dato.id, dato.nombre));
        instanciasUsuarios.forEach(usuario => grupo.agregarUsuario(usuario));
        setAmigos(instanciasUsuarios);
        
        const datosGastos = await obtenerGastosDeNube();
        const instanciasGastos = datosGastos.map(dato => new Gasto(
          dato.id, dato.concepto, dato.monto, dato.pagadorId, dato.participantesIds
        ));
        instanciasGastos.forEach(gasto => grupo.agregarGasto(gasto));
        setGastos(instanciasGastos);
        
      } catch (error) {
        console.error("No se pudieron cargar los datos iniciales.");
      }
    };

    inicializarDatos();
  }, []);

  const manejarAgregarAmigo = async (nombre) => {
    try {
      const firebaseId = await guardarAmigoEnNube(nombre);
      const nuevoUsuario = new Usuario(firebaseId, nombre);        //se guarda en firebase y se obtiene el id único generado por firebase      
      grupo.agregarUsuario(nuevoUsuario);                          //se agrega al grupo
      setAmigos([...amigos, nuevoUsuario]);                        //se actualiza el estado de amigos para que se renderice la lista
      
    } catch (error) {
      alert("Hubo un problema de conexión al guardar el amigo.");
    }
  };

  const manejarEliminarAmigo = (id) => {
    grupo.eliminarUsuario(id);
    setAmigos(amigos.filter(amigo => amigo.id !== id));
  };

  const manejarAgregarGasto = async (datosGasto) => {
    try {
      const firebaseId = await guardarGastoEnNube(datosGasto);
      
      const nuevoGasto = new Gasto(
        firebaseId,
        datosGasto.concepto,
        datosGasto.monto,
        datosGasto.pagadorId,
        datosGasto.participantesIds
      );

      grupo.agregarGasto(nuevoGasto);
      setGastos([...gastos, nuevoGasto]);
      
    } catch (error) {
      alert("Hubo un problema al guardar el gasto.");
    }
  };
  const manejarCalcularDeudas = () => {
    if (gastos.length === 0) {
      alert("No hay gastos registrados para calcular.");
      return;
    }
    const resultadoCalculo = grupo.calcularSaldos();
    setResultados(resultadoCalculo);
  };

  return (
    <div className="app-container" style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Divisor de Gastos</h1>
      
      {/* Contenedor principal con Flexbox para dividir en dos columnas */}
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* Gestión de Amigos */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <AddFriendForm onAddFriend={manejarAgregarAmigo} />
          <FriendList amigos={amigos} onRemoveFriend={manejarEliminarAmigo} />
          
        </div>
        {/* Registrar gastos e historial de gastos */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <ExpenseForm amigos={amigos} onAddGasto={manejarAgregarGasto} />
          <ExpenseList gastos={gastos} amigos={amigos} />
          
        </div>

            {/* Cálculo y tablero */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button 
          onClick={manejarCalcularDeudas}
          style={{ padding: '15px 30px', fontSize: '1.2em', backgroundColor: '#198754', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Calcular Deudas
        </button>
      </div>
      <BalanceBoard resultados={resultados} />
      </div>
    </div>
  );
}

export default App;