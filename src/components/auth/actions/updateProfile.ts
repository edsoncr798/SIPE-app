import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { updateDoc } from 'firebase/firestore';
import setLocaStoragesAuth from '@/components/auth/actions/setLocalStoragesAuth'
import type { IUser } from '@/components/auth/models/IUser'
import { getUserDocSnap } from '@/components/auth/actions/getUser'
import { comprimirImagenCircular } from '@/composables/utils'
import { ElMessage } from 'element-plus'



const uploadImageToFirebaseStorage = async (imageFile: any, uid: string) => {

  return new Promise<string | null>((resolve, reject) => {
    const storage = getStorage();
    const storageRef = ref(storage, `user_profiles/${uid}/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log('error:', error);
        reject(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL as string);
        });
      },
    );
  });
};


const updateProfile = async (userData: IUser) => {
  try {
    const userDoc = await getUserDocSnap();
    if (!userDoc) return;

    // if (imageFile) {
    //   const imageResult = await comprimirImagenCircular(imageFile, 70);
    //   const result = await uploadImageToFirebaseStorage(imageResult, userData.uid);
    //   if (result) userData.photo = result;
    // }

    await updateDoc(userDoc.ref, {
      ...userData,
      updated_at: new Date(),
    });
    setLocaStoragesAuth(userData);

    ElMessage({
        message: 'Perfil actualizado correctamente',
        duration: 1000,
        type: 'success'
    })
  } catch (e) {
    console.log('error:', e);
    ElMessage({
        message: 'Error al actualizar el perfil',
        duration: 1000,
        type: 'error',
      })
  }
};


export const updateProfileImage = async (imageFile: File | null, uid: string) => {
  try {
    if (!imageFile) return;
    const imageResult = await comprimirImagenCircular(imageFile, 70);
    const result = await uploadImageToFirebaseStorage(imageResult, uid);
    if (result) {
      const userDoc = await getUserDocSnap();
      if (!userDoc) return;

      const userData = userDoc.data() as IUser;
      userData.photo = result;

      await updateDoc(userDoc.ref, {
        ...userData,
        updated_at: new Date(),
      });

      const localStorageData = JSON.parse(localStorage.getItem('user') || '{}');

      localStorageData.photo = result;
      localStorage.setItem('user', JSON.stringify(localStorageData));

      setLocaStoragesAuth(userData);
      ElMessage({
        message: 'Foto de perfil actualizada correctamente',
        duration: 1000,
        type: 'success'
      })
    }
  } catch (e) {
    console.log('error:', e);
    ElMessage({
      message: 'Error al actualizar la foto de perfil',
      duration: 1000,
      type: 'error',
    })
  }
}


export default updateProfile