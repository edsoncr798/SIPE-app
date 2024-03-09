<script setup lang="ts">
import { Avatar } from '@element-plus/icons-vue'
import profileStore from '@/components/auth/profile.store'


const profileUser = computed(() => profileStore.getUser())
const isModalPost = ref(false)

const openModalPost = () => {
  isModalPost.value = !isModalPost.value;
};


</script>

<template>
  <modal-create-post v-if="isModalPost" :dialogVisible="isModalPost" @close="isModalPost = false" />

  <div class="w-full">
    <el-card class="p-4">
      <div class="flex items-center gap-4 ">
        <el-image v-if="profileUser.photo"  :src="profileUser.photo" class="w-14 rounded-full " alt="placeholder" />
        <Avatar v-else class="w-14 rounded-full bg-slate-300 p-2"/>
        <el-button @click="openModalPost" round size="large" class="w-full">
          Crear publicacion
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped>


</style>
