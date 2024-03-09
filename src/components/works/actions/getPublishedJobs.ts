import { getUserDocSnap } from '@/components/auth/actions/getUser'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import worksStore from '@/components/works/works.store'
import type { IJob } from '@/components/works/models/IJob'
import { timestampToDatetime } from '@/composables/utils'


export default async function getPublishedJobs() {
  try{
    const db = getFirestore();
    const publishedJobsRef = collection(db, 'published_jobs');
    const querySnapshot = await getDocs(publishedJobsRef);

    const publishedJobs = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const { uid, post, company, type_work_place, work_location, job_type } = data;
      return {
        uid,
        post,
        company,
        type_work_place,
        work_location,
        job_type,
        created_at: timestampToDatetime(data.created_at),
        updated_at: timestampToDatetime(data.updated_at),
      } as IJob;
    });

    worksStore.setJobs(publishedJobs);
  }catch (error) {
    console.log(error);
  }
}