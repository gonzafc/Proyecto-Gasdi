export function ExpenseList({ gastos, amigos, onRemoveGasto }) {
  
  // Mantiene tu formato numérico con comas para miles y puntos para decimales
  const formatearDinero = (monto) => {
    return Number(monto).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="lista-gastos" style={{ marginTop: '20px' }}>
      <h3>Historial de Gastos:</h3>
      {gastos.length === 0 ? (
        <p>Aún no hay gastos registrados.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {gastos.map((gasto) => {
            // Protección contra datos huérfanos
            const pagador = amigos.find(a => a.id === gasto.pagadorId)?.nombre || "Desconocido";
            const cantidadParticipantes = gasto.participantesIds ? gasto.participantesIds.length : 0;

            return (
              <li key={gasto.id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px', borderLeft: '4px solid #0d6efd' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>{gasto.concepto}</strong>
                  <div>
                    <span style={{ fontWeight: 'bold', color: '#198754', marginRight: '15px' }}>
                      ${formatearDinero(gasto.monto)}
                    </span>
                    <button 
                      onClick={() => onRemoveGasto(gasto.id)}
                      style={{ color: 'white', backgroundColor: '#dc3545', border: 'none', borderRadius: '4px', padding: '3px 8px', cursor: 'pointer', fontSize: '0.8em', fontWeight: 'bold' }}
                    >
                      X
                    </button>
                  </div>
                </div>
                <div style={{ fontSize: '0.85em', color: '#6c757d', marginTop: '5px' }}>
                  Pagó: <strong style={{ color: '#000' }}>{pagador}</strong> | Participan: {cantidadParticipantes}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}