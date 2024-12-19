import { ElMessage } from 'element-plus'
import { addDoc, collection, doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
import type { IAttendance } from '@/components/attendance/models/IAttendance'
import setLocalSrtorageAttendance from '@/components/attendance/actions/setLocalSrtorageAttendance'

async function registerAttendance(userData: IAttendance) {

  try {
    const db = getFirestore();
     const userProfileCollection = collection(db, 'attendances');
    const docRef = await addDoc(userProfileCollection, {
      first_name: userData.first_name,
      last_name: userData.last_name,
      document_number: userData.document_number,
      timeOut: new Date(),
      updated_at: new Date(),
    });

    const uid = docRef.id;
    await updateDoc(doc(userProfileCollection, uid), { uid });


    const userProfileData = {
      ...userData,
      uid,
    };

    setLocalSrtorageAttendance(userProfileData);
    ElMessage.success('Registro exitoso');
    return true;
  } catch (error : any) {
    console.log(error);
    switch (error.code) {
      case 'auth/email-already-in-use':
        ElMessage.error('El correo ya está en uso');
        break;
      case 'auth/invalid-email':
        ElMessage.error('El correo es inválido');
        break;
      case 'auth/weak-password':
        ElMessage.error('La contraseña es débil');
        break;
      case 'auth/operation-not-allowed':
        ElMessage.error('Operación no permitida');
        break;
      default:
        ElMessage.error('Error al registrar');
        break;
    }
    return false;
  }

}

export default registerAttendance;