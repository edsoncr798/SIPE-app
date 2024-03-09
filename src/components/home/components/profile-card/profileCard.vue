<script setup lang="ts">
import { Avatar } from '@element-plus/icons-vue'
import profileStore from '@/components/auth/profile.store'

const getFullName = computed(() => profileStore.getFullName())
const profile = computed(() => profileStore.getUser())

</script>

<template>
  <div class="profile-card min-w-max">
    <el-card>
      <div class="">
        <div class="relative flex justify-center mb-10">
          <el-image v-if="profile.background_photo" :src="profile.background_photo" class="w-1/2" alt="photo" />
          <el-image v-else src="https://via.placeholder.com/150" class="object-contain w-full h-[50px]" alt="none" />
          <div class="absolute top-2 w-[65px] h-[65px] ">
            <el-image v-if="profile.photo" :src="profile.photo" class="border w-full h-full rounded-full" alt="photo" />
            <Avatar v-else class="border w-full h-full bg-slate-50 p-2 rounded-full" />
          </div>
        </div>
        <ul class="flex items-center flex-col  gap-4 p-4">
          <li>
            <h1>{{ getFullName }}</h1>
          </li>
          <li>
            <p class="text-sm">{{ profile.career }}</p>
          </li>
          <li>
            <p>{{ profile.city }} - {{profile.country }}</p>
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<style>
ul{
  list-style: none;
  padding: 0;
  margin: 0;
}

.profile-card .el-card__body{
  padding: 0 !important;
}

</style>