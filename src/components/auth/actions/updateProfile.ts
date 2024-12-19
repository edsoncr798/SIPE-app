import { updateDoc } from 'firebase/firestore'
import setLocaStoragesAuth from '@/components/auth/actions/setLocalStoragesAuth'
import type { IUser } from '@/components/auth/models/IUser'
import { getUserDocSnap } from '@/components/auth/actions/getUser'
import { ElMessage } from 'element-plus'

const updateProfile = async (userData: IUser) => {
  try {
    const userDoc = await getUserDocSnap()
    if (!userDoc) return

    // if (imageFile) {
    //   const imageResult = await comprimirImagenCircular(imageFile, 70);
    //   const result = await uploadImageToFirebaseStorage(imageResult, userData.uid);
    //   if (result) userData.photo = result;
    // }

    await updateDoc(userDoc.ref, {
      ...userData,
      updated_at: new Date()
    })
    setLocaStoragesAuth(userData)

    ElMessage({
      message: 'Perfil actualizado correctamente',
      duration: 1000,
      type: 'success'
    })
  } catch (e) {
    console.log('error:', e)
    ElMessage({
      message: 'Error al actualizar el perfil',
      duration: 1000,
      type: 'error'
    })
  }
}

export default updateProfile
