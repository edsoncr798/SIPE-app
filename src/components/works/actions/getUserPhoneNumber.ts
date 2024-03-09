import { doc, getDoc, getFirestore } from 'firebase/firestore'


export  async function getUserPhoneNumber(user_id: string ){
  try{

    const db = getFirestore();
    const docRef = doc(db, "user_profiles", user_id);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      const userData = docSnap.data()
      return userData?.phone
    }else {
      console.log("No such document!")
      return null
    }
  }catch (error){
    console.log(error)
  }
}