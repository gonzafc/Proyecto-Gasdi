import { useState } from 'react';

export function ExpenseForm({ amigos, onAddGasto }) {
  // 1. EL ESTADO DEL FORMULARIO
  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState('');
  const [pagadorId, setPagadorId] = useState('');
  
  // Guardamos un array con los IDs de los amigos que tildamos en los checkboxes
  const [participantesIds, setParticipantesIds] = useState([]);

  // 2. LÓGICA DE LOS CHECKBOXES
  // Esta función agrega o saca un ID del array dependiendo de si el usuario tilda o destilda
  const manejarCheckbox = (id) => {
    if (participantesIds.includes(id)) {
      // Si ya estaba, lo filtramos (lo sacamos)
      setParticipantesIds(participantesIds.filter(participanteId => participanteId !== id));
    } else {
      // Si no estaba, lo agregamos al final del array
      setParticipantesIds([...participantesIds, id]);
    }
  };

  // 3. ENVÍO DEL FORMULARIO
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones de seguridad para evitar gastos rotos
    if (!concepto.trim() || !monto || !pagadorId || participantesIds.length === 0) {
      alert('Por favor, completá todos los campos y seleccioná al menos un participante.');
      return;
    }

    // Le enviamos el objeto armado al componente padre (App.jsx)
    // Nos aseguramos de convertir el monto a decimal y el ID a número entero
    onAddGasto({
      concepto: concepto.trim(),
      monto: parseFloat(monto),
      pagadorId: Number(pagadorId),
      participantesIds: participantesIds
    });

    // Reiniciamos el formulario para el siguiente ticket
    setConcepto('');
    setMonto('');
    setPagadorId('');
    setParticipantesIds([]);
  };

  // Renderizado condicional de seguridad: 
  // No podemos cargar un gasto si todavía no hay amigos en el grupo.
  if (amigos.length === 0) {
    return (
      <div style={{ padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <p><em>Agregá al menos un amigo para poder registrar gastos.</em></p>
      </div>
    );
  }

  // 4. LA INTERFAZ VISUAL (JSX)
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