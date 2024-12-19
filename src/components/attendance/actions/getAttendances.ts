import { firestore } from "@/modules/firebaseConfig";
import type { IAttendance } from '@/components/attendance/models/IAttendance'
import attendanceStore from '@/components/attendance/attendance.store'

export default async function getAttendances(textSearch: string, isDni: boolean) {
  try {
    let usersProfilesColl = firestore.collection('attendances').limit(20);
    if (textSearch.length > 0) {
      if (isDni) {
        // mostrar solo los que tengan dni
        usersProfilesColl = usersProfilesColl.where('document_number', '==', textSearch);
      } else {
        // mostrar solo los que tengan celular
        usersProfilesColl = usersProfilesColl.where('timeOut', '==', textSearch);
      }
    }

    const attendancesUser: IAttendance[] = [];
    const querySnapshot = await usersProfilesColl.get();
    querySnapshot.forEach((doc) => {
      const driverData = doc.data() as IAttendance;
      attendancesUser.push(driverData);
    });
    attendanceStore.setAttendance(attendancesUser);
    return attendancesUser;
  } catch (error) {
    console.log(error);
  }
}
