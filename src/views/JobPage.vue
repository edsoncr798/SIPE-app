<script setup lang="ts">

import getPublishedJobs from '@/components/works/actions/getPublishedJobs'

onUnmounted( async () => {
  await getPublishedJobs()
});


onUpdated( async () => {
  await getPublishedJobs()
});

</script>

<template>
  <div class="w-full md:pt-[90px] pb-4">
    <job-app />
  </div>
</template>

<style scoped>

</style>