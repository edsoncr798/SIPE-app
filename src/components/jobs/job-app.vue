<script setup lang="ts">
import worksStore from '@/components/works/works.store'
import getPublishedJobs from '@/components/works/actions/getPublishedJobs'

const publishedJobs = computed(() => worksStore.getJobs());

onMounted(async () => {
  await getPublishedJobs()
});

</script>

<template>
<div class="mx-auto w-[95%] flex gap-2">
  <saved-jobs />
  <div class="w-1/2 h-[calc(100vh-100px)] overflow-auto">
    <jobs-card v-for="(job, i) in publishedJobs" :key="i" :publishedJobsItem="job" />
  </div>
</div>
</template>

<style scoped>

</style>