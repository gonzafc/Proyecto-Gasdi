import { useState } from 'react';
  // lógica
export function AddFriendForm({ onAddFriend }) {
  const [nombre, setNombre] = useState('');   // el usuario pone un input para el nombre

  const handleSubmit = (e) => {  // el usuario apreta "agregar"
    e.preventDefault(); // evita que la página web entera se recargue (comportamiento por defecto del HTML).
    if (nombre.trim() === '') return;  // para asegurarse que no haya nombres vacios o con espacios en blanco.
    
    onAddFriend(nombre);     // Le enviamos el nombre al componente padre (App.jsx)

    setNombre('');     // se resetea el input para que pueda agregar otro amigo
  };

  // vista
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>Agregar Participante</h3>
      
      <div className="input-group">
        <label htmlFor="nombreAmigo">Nombre del amigo:</label>
        <input 
          type="text" 
          id="nombreAmigo"
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
        />
      </div>

      <button type="submit">Agregar</button>
    </form>
  );
}