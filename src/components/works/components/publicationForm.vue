<script setup lang="ts">
import { Avatar } from '@element-plus/icons-vue'

const isPhone = ref(false)
const isModalPost = ref(false)

const openModalPost = () => {
  isModalPost.value = !isModalPost.value;
};


</script>

<template>
  <modal-create-post v-if="isModalPost" :dialogVisible="isModalPost" @close="isModalPost = false" />

  <div class="w-full">
    <el-card>
      <div class="flex items-center gap-4 ">
        <el-image v-if="isPhone"  src="https://via.placeholder.com/150" class="w-14 rounded-full " alt="placeholder" />
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
