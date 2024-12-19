import type { ILogin, IUser } from '@/components/auth/models/IUser'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import setLocalStoragesAuth from '@/components/auth/actions/setLocalStoragesAuth'
import { ElMessage } from 'element-plus'

export default async function auth_login(model: ILogin) {
  try {
    const auth = getAuth();
    const { email, password } = model;
    const response = await signInWithEmailAndPassword(auth, email, password);
    // console.log("response: ", response);
    const db = getFirestore();
    const usersRef = collection(db, 'userAdmin');
    const userDoc = doc(usersRef, response.user.uid);
    const userDocSnap = await getDoc(userDoc);

    let user = userDocSnap.data() as IUser;
    if (!userDocSnap.exists()) {
      user = {
        email: '',
        uid: response.user.uid,
        first_name: '',
        last_name: '',
        created_at: new Date(),
        updated_at: new Date(),
      };
      await setDoc(userDoc, user);
    }
    setLocalStoragesAuth(user);
    return user;
  } catch (error: any) {
    console.log(error);
    switch (error.code) {
      case 'auth/user-not-found':
        ElMessage.error('Usuario no encontrado');
        break;
      case 'auth/wrong-password':
        ElMessage.error('Contraseña incorrecta');
        break;
      default:
        ElMessage.error('Error al iniciar sesión');
        break;
    }
    return false;
  }
}