<script setup lang="ts">

import AttendanceTable from '@/components/table/attendanceTable.vue'
import Index from '@/components/table/index.vue'
</script>

<template>
  <div class="flex w-full pb-4 md:pt-[90px]">
    <div class="flex gap-10 mx-auto w-[95%]">
      <index/>
      <q-r-component class="w-full lg:w-[20%]" />
    </div>
  </div>
</template>
