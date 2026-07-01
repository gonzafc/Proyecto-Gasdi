import { useState, useEffect } from 'react';
import { AddFriendForm } from './components/AddFriendForm';
import { ExpenseForm } from './components/ExpenseForm';
import { BalanceBoard } from './components/BalanceBoard';
import { ExpenseList } from './components/ExpenseList';
import { FriendList } from './components/FriendList';
import { guardarAmigoEnNube, obtenerAmigosDeNube, guardarGastoEnNube, obtenerGastosDeNube } from './services/firestoreService';

function App() {
  const [amigos, setAmigos] = useState([]);
  const [gastos, setGastos] = useState([]); 
  const [resultados, setResultados] = useState(null);

  // Se define el ID del grupo con el que estamos trabajando
  const ID_GRUPO = 'id_grupos';

  useEffect(() => {
    const inicializarDatos = async () => {
      try {
        const datosAmigos = await obtenerAmigosDeNube(ID_GRUPO);
        setAmigos(datosAmigos);
        
        const datosGastos = await obtenerGastosDeNube(ID_GRUPO);
        setGastos(datosGastos);
      } catch (error) {
        console.error("No se pudieron cargar los datos iniciales.");
      }
    };

    inicializarDatos();
  }, []);

  const manejarAgregarAmigo = async (nombre) => {
    try {
      const firebaseId = await guardarAmigoEnNube(nombre, ID_GRUPO);
      setAmigos([...amigos, { id: firebaseId, nombre }]);
    } catch (error) {
      alert("Hubo un problema de conexión al guardar el amigo.");
    }
  };

  const manejarEliminarAmigo = (id) => {
    setAmigos(amigos.filter(amigo => amigo.id !== id));
  };

  const manejarAgregarGasto = async (datosGasto) => {
    try {
      const firebaseId = await guardarGastoEnNube(datosGasto, ID_GRUPO);
      setGastos([...gastos, { id: firebaseId, ...datosGasto }]);
    } catch (error) {
      alert("Hubo un problema al guardar el gasto.");
    }
  };

  // Conexión a flask
  const manejarCalcularDeudas = async () => {
    if (gastos.length === 0) {
      alert("No hay gastos registrados para calcular.");
      return;
    }
    
    try {
      const url = `http://127.0.0.1:8080/api/calcular/${ID_GRUPO}`;
      const respuesta = await fetch(url);
      
      if (!respuesta.ok) {
        throw new Error(`Error del servidor: ${respuesta.status}`);
      }

      const datos = await respuesta.json();
      setResultados(datos); // Actualizamos la vista con el JSON de Python
      
    } catch (error) {
      console.error("Hubo un problema al conectar con la API:", error);
      alert("Asegurate de que el servidor Flask esté corriendo (py main.py)");
    }
  };

  return (
    <div className="app-container" style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Divisor de Gastos</h1>
      
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        
        <div style={{ flex: '1', minWidth: '300px' }}>
          <AddFriendForm onAddFriend={manejarAgregarAmigo} />
          <FriendList amigos={amigos} onRemoveFriend={manejarEliminarAmigo} />
        </div>
        
        <div style={{ flex: '1', minWidth: '300px' }}>
          <ExpenseForm amigos={amigos} onAddGasto={manejarAgregarGasto} />
          <ExpenseList gastos={gastos} amigos={amigos} />
        </div>

      </div>

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
  );
}

export default App;