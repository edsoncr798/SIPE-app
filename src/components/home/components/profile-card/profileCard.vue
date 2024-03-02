<script setup lang="ts">
import { Avatar } from '@element-plus/icons-vue'

const hasBackground = ref(false);
const hasPhoto = ref(false);

</script>

<template>
  <div class="profile-card min-w-max">
    <el-card>
      <div class="">
        <div class="relative flex justify-center mb-10">
          <el-image v-if="hasBackground" src="https://via.placeholder.com/150" class="w-1/2" alt="photo" />
          <el-image v-else src="https://via.placeholder.com/150" class="object-contain w-full h-[50px]" alt="none" />
          <div class="absolute top-2 w-[65px] h-[65px] ">
            <el-image v-if="hasPhoto" src="https://via.placeholder.com/150" class="border w-full h-full rounded-full" alt="photo" />
            <Avatar v-else class="border w-full h-full bg-slate-50 p-2 rounded-full" />
          </div>
        </div>
        <ul class="flex flex-col items-start  gap-4 p-4">
          <li>
            <h1>Nombre del usuario</h1>
          </li>
          <li>
            <p>Descripcion del usuario</p>
          </li>
          <li>
            <p>ciudad</p>
          </li>
          <li>
            <el-button type="primary" round size="small" class="w-full">
              Seguir
            </el-button>
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