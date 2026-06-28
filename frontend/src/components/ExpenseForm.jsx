import { useState } from 'react';
    // LÓGICA
export function ExpenseForm({ amigos, onAddGasto }) {
  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState('');                   //se guardan los valores de los inputs
  const [pagadorId, setPagadorId] = useState('');
  
  const [participantesIds, setParticipantesIds] = useState([]);         //array de IDs de los amigos que participan en el gasto

  const manejarCheckbox = (id) => {                 //se meten o se sacan ids del array, dependiendo si se marca o no la checkbox
    if (participantesIds.includes(id)) {
      setParticipantesIds(participantesIds.filter(participanteId => participanteId !== id));
    } else {
      setParticipantesIds([...participantesIds, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!concepto.trim() || !monto || !pagadorId || participantesIds.length === 0) {
      alert('Por favor, completá todos los campos y seleccioná al menos un participante.');
      return;
    }

    // se envía el objeto armado al App.jsx y se convierte el monto a decimal y el id a entero
    onAddGasto({
      concepto: concepto.trim(),
      monto: parseFloat(monto),
      pagadorId: pagadorId,
      participantesIds: participantesIds
    });

    // se reestablecen los valores de los inputs a vacío para poder cargar otro gasto
    setConcepto('');
    setMonto('');
    setPagadorId('');
    setParticipantesIds([]);
  };

    // si no hay amigos, no se pueden cargar gastoss
  if (amigos.length === 0) {
    return (
      <div style={{ padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <p><em>Agregá al menos un amigo para poder registrar gastos.</em></p>
      </div>
    );
  }

  // VISUAL
  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      <h3>Registrar Nuevo Gasto</h3>

      <div style={{ marginBottom: '10px' }}>
        <label>Concepto (Ej: Asado, Bebidas): </label>
        <input 
          type="text" 
          value={concepto} 
          onChange={(e) => setConcepto(e.target.value)} 
          placeholder="¿Qué compraron?"
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Monto Total: $ </label>
        <input 
          type="number" 
          step="0.01"
          value={monto} 
          onChange={(e) => setMonto(e.target.value)} 
          placeholder="0.00"
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>¿Quién lo pagó? </label>
        <select value={pagadorId} onChange={(e) => setPagadorId(e.target.value)}>
          <option value="" disabled>Seleccioná un amigo...</option>
          {amigos.map(amigo => (
            <option key={amigo.id} value={amigo.id}>
              {amigo.nombre}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label><strong>¿Quiénes consumieron?</strong></label>
        {amigos.map(amigo => (
          <div key={amigo.id}>
            <label>
              <input 
                type="checkbox" 
                checked={participantesIds.includes(amigo.id)}
                onChange={() => manejarCheckbox(amigo.id)}
              />
              {amigo.nombre}
            </label>
          </div>
        ))}
      </div>

      <button type="submit" style={{ cursor: 'pointer', padding: '5px 15px' }}>Guardar Gasto</button>
    </form>
  );
}