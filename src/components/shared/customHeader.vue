<script setup lang="ts">
import { Avatar, HomeFilled, Suitcase, SwitchButton, UserFilled } from '@element-plus/icons-vue'
import profileStore from '@/components/auth/profile.store'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { ElMessage } from 'element-plus'
import type { IUser } from '@/components/auth/models/IUser'
import router from '@/router'

const user = computed(() => profileStore.getUser());


const signOut = () => {
  firebase.auth().signOut().then(() => {
  ElMessage({
    type: 'success',
    message: 'Sesion cerrada con exito'
  });

  localStorage.removeItem('user');
  profileStore.setUser({} as IUser);
  router.push({ name: 'login' });
  }).catch((error) => {
    // An error happened.
    console.error('Se produjo un error al cerrar sesión', error);
  });
};

const goToProfile = () => {
  router.push({ name: 'profile' });
};


</script>

<template>
  <header class="h-16 z-50 shadow fixed w-full bg-[#ffffff]">
    <nav class="flex  justify-between h-full items-center mx-auto w-[90%]">
      <div class="bg-blue-600 items-center justify-center flex h-10 rounded text-white shadow-fuchsia-400 w-10">
        <router-link to="/" class="text-2xl font-bold">SG</router-link>
      </div>

      <div class="w-1/2 flex justify-between items-center">
        <div class="flex flex-col items-center">
          <el-icon class="text-2xl" name="el-icon-s-home">
            <home-filled />
          </el-icon>
          <router-link to="/" class=" ">Inicio</router-link>
        </div>
        <div class="flex-col flex items-center">
          <el-icon><suitcase /></el-icon>
          <router-link to="/jobs" class=" ">Empleos</router-link>
        </div>
        <div v-if="!user.uid" class="flex-col flex items-center">
          <el-icon><user-filled /></el-icon>
          <router-link to="/login">iniciar sesion</router-link>
        </div>
        <el-menu v-else mode="horizontal" :ellipsis="false">
          <el-sub-menu index="1">
            <template #title>
              <div class="flex flex-col justify-center items-center">
                  <Avatar class="bg-slate-500 w-7 rounded-full p-1" />
                <h1 class="font-bold text-sm font-quicksand">
                  Yo
                </h1>
              </div>
            </template>
            <el-menu-item @click="goToProfile"  index="1-1">
              <el-icon>
                <Avatar />
              </el-icon>
              Perfil
            </el-menu-item>
            <el-menu-item @click="signOut" index="1-2">
                <el-icon>
                  <SwitchButton />
                </el-icon>
              Cerrar sesion
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>