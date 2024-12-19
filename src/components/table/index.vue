<script setup lang="ts">

import getAttendances from '@/components/attendance/actions/getAttendances'
import attendanceStore from '@/components/attendance/attendance.store'
import SearchHeader from '@/components/table/searchHeader.vue'

const loading = ref(false);

const attendanceUsers = computed(() => attendanceStore.getAttendance());

const setSearch = async ({ text, isDni }: any) => {
  loading.value = true;
  const response = await getAttendances(text, isDni);
  loading.value = false;
  return response;
};


onMounted(async () =>{
  loading.value = true;
  await setSearch({text:'', isDni:false});
  loading.value = false;
})

</script>

<template>
  <table-header>
    <search-header :loading="loading" :search="setSearch"/>
  </table-header>
  <attendance-table :loading="loading" :attendanceUsers="attendanceUsers"/>
</template>

<style scoped>

</style>