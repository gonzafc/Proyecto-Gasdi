export function ExpenseList({ gastos, amigos }) {
  
  // Función utilitaria para formatear con comas para miles y puntos para decimales
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
            const pagador = amigos.find(a => a.id === gasto.pagadorId)?.nombre;
            return (
              <li key={gasto.id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px', borderLeft: '4px solid #0d6efd' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{gasto.concepto}</strong>
                  {/* Aplicamos la máscara visual al monto */}
                  <span style={{ fontWeight: 'bold', color: '#198754' }}>
                    ${formatearDinero(gasto.monto)}
                  </span>
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
  );
}