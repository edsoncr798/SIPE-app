<script setup lang="ts">

import type { IAttendance } from '@/components/attendance/models/IAttendance'

const props = defineProps({
  attendanceUsers: {
    type: Object as PropType<IAttendance[]>,
    required: true
  },
  loading: {
    type: Boolean,
    required: true
  }
});
const attendanceUid = ref('');

</script>

<template>
  <el-table
    v-loading="loading"
    :data="props.attendanceUsers"
    class="shadow-lg"
    max-height="720px"
    style="width: 100%; overflow: auto"
    @cellMouseEnter="(event:IAttendance)=>{
      attendanceUid = event.uid
    }"
  >

    <el-table-column prop="first_name" label="Nombres">
      <template #default="{ row }">
        <span>{{ row.first_name }} {{ row.last_name }}</span>
      </template>
    </el-table-column>


    <el-table-column prop="document_number" label="Documento">
      <template #default="{ row }">
        <span>{{ row.document_number }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="timeOut" label="Fecha de Asistencia">
      <template #default="{ row }">
        <span>{{ row.timeOut }}</span>
      </template>
    </el-table-column>


  </el-table>

</template>

<style scoped>

</style>