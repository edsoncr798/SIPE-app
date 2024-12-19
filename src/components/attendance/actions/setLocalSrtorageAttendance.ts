import attendanceStore from '@/components/attendance/attendance.store'


export default function(attendance: any) {
  console.log('guardando datos', attendance);
  localStorage.setItem('attendance', JSON.stringify(attendance));
  attendanceStore.setAttendance(attendance);
}