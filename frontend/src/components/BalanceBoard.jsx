export function BalanceBoard({ resultados }) {
  if (!resultados) return null;                     //si no hay resultados, no se muestra nada

  const { saldosNetos, transferencias } = resultados;
  const formatearDinero = (monto) => {
    return "$" + monto.toLocaleString('en-US', {       //se usan comas para miles y puntos para decimales, 
      minimumFractionDigits: 2,                        //y se asegura que siempre haya 2 decimales
      maximumFractionDigits: 2 
    });
  };

  return (
    <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#e9ecef', borderRadius: '8px', border: '2px solid #0d6efd' }}>
      <h2 style={{ textAlign: 'center', color: '#0d6efd' }}> Resumen de Cuentas</h2>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
        
        {/* COLUMNA 1: Estado final de cada participante */}
        <div style={{ flex: '1', minWidth: '250px', backgroundColor: 'white', padding: '15px', borderRadius: '8px' }}>
          <h4>Saldos Individuales</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {Object.entries(saldosNetos).map(([nombre, balance]) => (
              <li key={nombre} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <span>{nombre}</span>
                <strong style={{ color: balance >= 0 ? '#198754' : '#dc3545' }}>
                  {balance > 0 ? '' : ''}{formatearDinero(balance)}
                </strong>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMNA 2: Las transferencias a realizar */}
        <div style={{ flex: '1', minWidth: '250px', backgroundColor: 'white', padding: '15px', borderRadius: '8px' }}>
          <h4>¿Quién le pasa a quién?</h4>
          {transferencias.length === 0 ? (
            <p style={{ color: '#198754', fontWeight: 'bold' }}>¡No hay deudas! </p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {transferencias.map((transf, index) => (
                <li key={index} style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px dashed #ccc' }}>
                  <strong>{transf.de}</strong> le debe transferir a <strong>{transf.para}</strong>
                  <br/>
                  <span style={{ color: '#0d6efd', fontWeight: 'bold', fontSize: '1.2em' }}>
                    {formatearDinero(transf.monto)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}