import type { IAttendance } from '@/components/attendance/models/IAttendance'


const state = reactive({
  attendances: [] as IAttendance[],
})


  const getters = {
    getAttendance:() => state.attendances,

    getAttendanceLength: () => {
      if (!state.attendances) return 0;
    return state.attendances.length;
    },

    getAttendanceActive: () => {
      if (!state.attendances) return 0;
    return state.attendances.filter((item: IAttendance) => item.timeOut !== null).length;
    }


  }



  const mutations = {

  setAttendance: (attendances: IAttendance[]) => {
    state.attendances = attendances;
  }

  }

  export default {
    ...getters,
    ...mutations
  }

