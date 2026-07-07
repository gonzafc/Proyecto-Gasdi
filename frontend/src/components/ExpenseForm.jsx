import { useState } from 'react';

// LÓGICA
export function ExpenseForm({ amigos, onAddGasto }) {
  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState('');                   
  const [pagadorId, setPagadorId] = useState('');
  const [participantesIds, setParticipantesIds] = useState([]);         

  const manejarCheckbox = (id) => {                 
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

    onAddGasto({
      concepto: concepto.trim(),
      monto: parseFloat(monto),
      pagadorId: pagadorId,
      participantesIds: participantesIds
    });

    setConcepto('');
    setMonto('');
    setPagadorId('');
    setParticipantesIds([]);
  };

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
        {/* 1. Conectamos Concepto */}
        <label htmlFor="input-concepto">Concepto (Ej: Asado, Bebidas): </label>
        <input 
          id="input-concepto"
          type="text" 
          value={concepto} 
          onChange={(e) => setConcepto(e.target.value)} 
          placeholder="¿Qué compraron?"
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        {/* 2. Conectamos Monto */}
        <label htmlFor="input-monto">Monto Total: $ </label>
        <input 
          id="input-monto"
          type="number" 
          step="0.01"
          value={monto} 
          onChange={(e) => setMonto(e.target.value)} 
          placeholder="0.00"
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        {/* 3. Conectamos Pagador */}
        <label htmlFor="select-pagador">¿Quién lo pagó? </label>
        <select id="select-pagador" value={pagadorId} onChange={(e) => setPagadorId(e.target.value)}>
          <option value="" disabled>Seleccioná un amigo...</option>
          {amigos.map(amigo => (
            <option key={amigo.id} value={amigo.id}>
              {amigo.nombre}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <p style={{ margin: '0 0 10px 0' }}><strong>¿Quiénes consumieron?</strong></p>
        {amigos.map(amigo => (
          <div key={amigo.id}>
            <label htmlFor={`checkbox-${amigo.id}`}>
              <input 
                id={`checkbox-${amigo.id}`}
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