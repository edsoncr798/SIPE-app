import type { IJob } from '@/components/works/models/IJob'


const state = reactive({
  jobs: [] as IJob[],
})


const getters = {
  getJobs: () => state.jobs,
}

const mutations = {
  setJobs: (jobs: IJob[]) => {
    state.jobs = jobs
  },
}

export default {
  ...getters,
  ...mutations,
}