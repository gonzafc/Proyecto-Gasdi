const formatearDinero = (monto) => {
  return Number(monto).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

export function ExpenseList({ gastos, amigos, onRemoveGasto }) {
  return (
    <div className="lista-gastos" style={{ marginTop: '20px' }}>
      <h3>Historial de Gastos:</h3>
      {gastos.length === 0 ? (
        <p>Aún no hay gastos registrados.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {gastos.map((gasto) => {
            const pagador = amigos.find(a => a.id === gasto.pagadorId)?.nombre || "Desconocido";
            const cantidadParticipantes = gasto.participantesIds ? gasto.participantesIds.length : 0;

            return (
              <li key={gasto.id} className="expense-item">      
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>{gasto.concepto}</strong>
                  <div>
                    <span style={{ fontWeight: 'bold', color: '#198754', marginRight: '15px' }}>
                      ${formatearDinero(gasto.monto)}
                    </span>
                    <button 
                      type="button"
                      onClick={() => onRemoveGasto(gasto.id)}
                      className="btn-delete"
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