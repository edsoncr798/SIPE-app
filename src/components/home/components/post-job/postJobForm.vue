<script setup lang="ts">

</script>

<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Post a Job</span>
      </div>
      <el-form ref="form" :model="model" :rules="loginRules" class="mt-10 flex">
        <el-form-item label="" prop="email">
          <el-input  clearable placeholder="Email" size="large" type="text"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>

</style>