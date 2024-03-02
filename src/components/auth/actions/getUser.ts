import { collection, doc, getDoc, getFirestore, query, where, getDocs } from 'firebase/firestore'
import type { IUser } from '@/components/auth/models/IUser'
import setLocaStoragesAuth from './setLocalStoragesAuth'
import { ElMessage } from 'element-plus'


export async function getUserDoc() {
  try {
    const uid = JSON.parse(localStorage.getItem('user') || '{}').uid;
    if (!uid) return null;
    const db = getFirestore();
    const usersRef = collection(db, 'user_profiles');
    return doc(usersRef, uid);
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function getUserDocSnap() {
  try {
    const userDoc = await getUserDoc();
    if (!userDoc) return null;
    return await getDoc(userDoc);
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function findEmailByUsername(user_name: string) {
  try {
    const db = getFirestore();
    const usersRef = collection(db, 'user_profiles');
    const q = query(usersRef, where('user_name', '==', user_name));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty){
      return querySnapshot.docs[0].data().email;
    } else {
      ElMessage.error('User not found');
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}



export default async function () {
  try {
    const userDocSnap = await getUserDocSnap();
    if (!userDocSnap) return null;
    const user = userDocSnap.data() as IUser;
    if (!userDocSnap.exists()) return null;
    setLocaStoragesAuth(user);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}