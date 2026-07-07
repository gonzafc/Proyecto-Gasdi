export function FriendList({ amigos, onRemoveFriend }) {
  return (
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
                type="button"
                onClick={() => onRemoveFriend(amigo.id)}
                style={{ color: '#dc3545', cursor: 'pointer', border: 'none', background: 'none', fontWeight: 'bold' }}
              >
                X Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}