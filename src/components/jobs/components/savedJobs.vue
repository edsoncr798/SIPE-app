<script setup lang="ts">

</script>

<template>
<div class="w-[50%]">
  <el-card class="box-card p-4">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-bold">Saved Jobs</h2>
      <el-button type="primary" size="small">Apply All</el-button>
    </div>
    <div class="flex flex-col gap-4">
      <jobs-card />
    </div>
  </el-card>
</div>
</template>

<style scoped>

</style>