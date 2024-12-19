<script setup lang="ts">
import attendanceStore from '@/components/attendance/attendance.store'

const totalAttendance = computed(() => attendanceStore.getAttendanceLength());
const onlineDrivers = computed(() => attendanceStore.getAttendanceActive());

</script>

<template>
  <article class="flex py-5 flex-col gap-5">
    <div class="flex justify-between items-center">

      <div>
        <slot></slot>
      </div>

      <ul class="font-roboto">
        <li class="text-end">
          Total Personal: <strong>{{ totalAttendance }}</strong>
        </li>
        <li class="text-end">Actual en linea: <strong> {{ onlineDrivers }} </strong></li>
      </ul>
    </div>

    <div class="flex justify-between items-center">
      <el-row class="flex justify-between gap-10">
        <el-text class="el-text--large">Personal</el-text>
      </el-row>
    </div>
  </article>
</template>

<style scoped>
.el-text--large {
  font-size: 1.5rem;
  font-weight: 600;
  color: #000;
  cursor: default;
}

.el-text--large:hover {
  color: black;
}
</style>