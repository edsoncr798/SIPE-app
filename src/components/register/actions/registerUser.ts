import type { IUser } from '@/components/auth/models/IUser'
import { ElMessage } from 'element-plus'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import {  collection, doc, getFirestore, setDoc } from 'firebase/firestore'
async function registerUser(model: IUser) {
  const auth = getAuth();
  const { email, password } = model;
  let response;
  try {
    response = await createUserWithEmailAndPassword(auth, email, password || '');
    const db = getFirestore();
    const userProfileCollection = collection(db, 'user_profiles');

    const userProfileData = {
      uid: response.user.uid,
      email,
      first_name: model.first_name,
      last_name: model.last_name,
      photo: '',
      phone: '',
      background_photo: '',
      country: '',
      career: '',
      city: '',
      language: '',
      work_experience: '',
      education: '',
      skills: '',
      summary: '',
      created_at: new Date(),
      updated_at: new Date(),
    };
    const userDoc = doc(userProfileCollection, response.user.uid);
    await setDoc(userDoc, userProfileData);
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

export default registerUser;