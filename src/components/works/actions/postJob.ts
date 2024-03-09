import type { IJob } from '@/components/works/models/IJob'
import { collection, getFirestore, addDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { ElMessage } from 'element-plus'


export async function publishJob(jobData: IJob){
  try{
    const db = getFirestore()
    const jobsRef = collection(db, 'published_jobs');
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;
    jobData.user_uid = user.uid;

    await addDoc(jobsRef, jobData);

    ElMessage({
      message: 'Trabajo publicado correctamente',
      type: 'success',
      duration: 1000,
    })
  }catch (e){
    console.log(e)
    ElMessage({
      message: 'Error al publicar el trabajo',
      type: 'error',
      duration: 1000,
    })
  }
}