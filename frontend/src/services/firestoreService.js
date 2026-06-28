import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const guardarAmigoEnNube = async (nombre) => {
  try {
    const docRef = await addDoc(collection(db, "usuarios"), {
      nombre: nombre,
      fechaCreacion: new Date()
    });
    console.log("¡Amigo guardado con ID: ", docRef.id);
    return docRef.id; 
  } catch (error) {
    console.error("Error al guardar en Firebase: ", error);
    throw error;
  }
};

export const obtenerAmigosDeNube = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "usuarios"));        //se lee la colección "usuarios" de Firebase
    const amigosArray = [];                                                 //se sacan los amigos de la colección y se guardan en un array para poder usarlos en el frontend
    querySnapshot.forEach((doc) => {
      amigosArray.push({
        id: doc.id,                                                         // El ID alfanumérico de Firebase
        nombre: doc.data().nombre                                           // El nombre que guardamos
      });
    });
    
    return amigosArray;
  } catch (error) {
    console.error("Error al obtener amigos: ", error);
    throw error;
  }
}
export const guardarGastoEnNube = async (datosGasto) => {
  try {
    const docRef = await addDoc(collection(db, "gastos"), {
      concepto: datosGasto.concepto,
      monto: datosGasto.monto,
      pagadorId: datosGasto.pagadorId,
      participantesIds: datosGasto.participantesIds,
      fechaCreacion: new Date()
    });
    console.log("¡Gasto guardado con ID: ", docRef.id);
    return docRef.id; 
  } catch (error) {
    console.error("Error al guardar el gasto: ", error);
    throw error;
  }
};

export const obtenerGastosDeNube = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "gastos"));
    const gastosArray = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      gastosArray.push({
        id: doc.id,
        concepto: data.concepto,
        monto: data.monto,
        pagadorId: data.pagadorId,
        participantesIds: data.participantesIds
      });
    });
    
    return gastosArray;
  } catch (error) {
    console.error("Error al obtener gastos: ", error);
    throw error;
  }
};