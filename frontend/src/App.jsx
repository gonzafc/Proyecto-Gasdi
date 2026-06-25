import { useState } from 'react';
import { Grupo, Usuario, Gasto } from './logic/clases'; 
import { AddFriendForm } from './components/AddFriendForm';
import { ExpenseForm } from './components/ExpenseForm';
import { BalanceBoard } from './components/BalanceBoard';

function App() {
  const [grupo] = useState(new Grupo(1, "Juntada"));
  const [amigos, setAmigos] = useState([]);
  const [gastos, setGastos] = useState([]); 
  const [resultados, setResultados] = useState(null);
  const manejarAgregarAmigo = (nombre) => {
    const nuevoId = Date.now(); 
    const nuevoUsuario = new Usuario(nuevoId, nombre);
    
    grupo.agregarUsuario(nuevoUsuario);
    setAmigos([...amigos, nuevoUsuario]);
  };

  const manejarEliminarAmigo = (id) => {
    grupo.eliminarUsuario(id);
    setAmigos(amigos.filter(amigo => amigo.id !== id));
  };

  const manejarAgregarGasto = (datosGasto) => {
    const nuevoId = Date.now();
    const nuevoGasto = new Gasto(
      nuevoId,
      datosGasto.concepto,
      datosGasto.monto,
      datosGasto.pagadorId,
      datosGasto.participantesIds
    );

    grupo.agregarGasto(nuevoGasto);
    
    setGastos([...gastos, nuevoGasto]);
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
        
        {/* COLUMNA IZQUIERDA: Gestión de Amigos */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <AddFriendForm onAddFriend={manejarAgregarAmigo} />
          
          <div className="lista-amigos" style={{ marginTop: '20px' }}>
            <h3>Participantes Actuales:</h3>
            {amigos.length === 0 ? (
              <p>Todavía no hay nadie en el grupo.</p>
            ) : (
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {amigos.map((amigo) => (
                  <li key={amigo.id} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
                    <span><strong>{amigo.nombre}</strong></span> 
                    <button 
                      onClick={() => manejarEliminarAmigo(amigo.id)}
                      style={{ color: '#dc3545', cursor: 'pointer', border: 'none', background: 'none', fontWeight: 'bold' }}
                    >
                      X Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* COLUMNA DERECHA: Gestión de Gastos */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <ExpenseForm amigos={amigos} onAddGasto={manejarAgregarGasto} />
          
          <div className="lista-gastos" style={{ marginTop: '20px' }}>
            <h3>Historial de Gastos:</h3>
            {gastos.length === 0 ? (
              <p>Aún no hay gastos registrados.</p>
            ) : (
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {gastos.map((gasto) => {
                  // Buscamos el nombre del pagador para mostrarlo en lista
                  const pagador = amigos.find(a => a.id === gasto.pagadorId)?.nombre;
                  return (
                    <li key={gasto.id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px', borderLeft: '4px solid #0d6efd' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>{gasto.concepto}</strong>
                        <span style={{ fontWeight: 'bold', color: '#198754' }}>${gasto.monto.toFixed(2)}</span>
                      </div>
                      <div style={{ fontSize: '0.85em', color: '#6c757d', marginTop: '5px' }}>
                        Pagó: {pagador} | Participan: {gasto.participantesIds.length}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

            {/* 4. SECCIÓN FINAL: BOTÓN DE CÁLCULO Y TABLERO */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button 
          onClick={manejarCalcularDeudas}
          style={{ padding: '15px 30px', fontSize: '1.2em', backgroundColor: '#198754', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Calcular Deudas
        </button>
      </div>

      {/* El componente recibe los resultados. Si son null, no se muestra nada. */}
      <BalanceBoard resultados={resultados} />
      </div>
    </div>
  );
}

export default App;