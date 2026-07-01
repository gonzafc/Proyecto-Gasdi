import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const guardarAmigoEnNube = async (nombre, idGrupo) => {
  try {
    // Apuntamos a la subcolección del grupo
    const docRef = await addDoc(collection(db, "grupos", idGrupo, "usuarios"), {
      nombre: nombre,
      fechaCreacion: new Date()
    });
    return docRef.id; 
  } catch (error) {
    console.error("Error al guardar en Firebase: ", error);
    throw error;
  }
};

export const obtenerAmigosDeNube = async (idGrupo) => {
  try {
    const querySnapshot = await getDocs(collection(db, "grupos", idGrupo, "usuarios"));        
    const amigosArray = [];                                                 
    querySnapshot.forEach((doc) => {
      amigosArray.push({
        id: doc.id,                                                         
        nombre: doc.data().nombre                                           
      });
    });
    return amigosArray;
  } catch (error) {
    console.error("Error al obtener amigos: ", error);
    throw error;
  }
}

export const guardarGastoEnNube = async (datosGasto, idGrupo) => {
  try {
    const docRef = await addDoc(collection(db, "grupos", idGrupo, "gastos"), {
      concepto: datosGasto.concepto,
      monto: datosGasto.monto,
      pagadorId: datosGasto.pagadorId,
      participantes_id: datosGasto.participantesIds, 
      fechaCreacion: new Date()
    });
    return docRef.id; 
  } catch (error) {
    console.error("Error al guardar el gasto: ", error);
    throw error;
  }
};

export const obtenerGastosDeNube = async (idGrupo) => {
  try {
    const querySnapshot = await getDocs(collection(db, "grupos", idGrupo, "gastos"));
    const gastosArray = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      gastosArray.push({
        id: doc.id,
        concepto: data.concepto,
        monto: data.monto,
        pagadorId: data.pagadorId,
        // Adaptamos la lectura al campo de Firebase
        participantesIds: data.participantes_id || data.participantesIds 
      });
    });
    return gastosArray;
  } catch (error) {
    console.error("Error al obtener gastos: ", error);
    throw error;
  }
};