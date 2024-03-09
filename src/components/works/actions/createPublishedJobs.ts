import { firestore } from '@/modules/firebaseConfig'
import type { IJob } from '@/components/works/models/IJob'
import { EJobType, ETypeWorkPlace } from '@/components/works/models/IJob'


export default async function createPublishedJobs( user_uid: string) {
  try{
    console.log('createPublishedJobs');
    const publishedJobsRef = firestore.collection('published_jobs').doc(user_uid);
    const publishedJobs = await publishedJobsRef.get();

    if (publishedJobs.exists) return true;

    const publishedJobsObj: IJob = {
      user_uid: user_uid,
      post:'',
      company:'',
      type_work_place: ETypeWorkPlace.office,
      work_location:'',
      job_type: EJobType.partTime,
      created_at: new Date(),
      updated_at: new Date(),
    };

    await firestore.collection('published_jobs').doc(user_uid).set(publishedJobsObj);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}