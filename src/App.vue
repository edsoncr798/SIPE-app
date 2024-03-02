<script setup lang="ts">
import { RouterView } from 'vue-router'
import profileStore from '@/components/auth/profile.store'
import type { IUser } from '@/components/auth/models/IUser'

onMounted(() => {

  const user = localStorage.getItem('user');
  profileStore.setUser( user ? JSON.parse(user) : {} as IUser );

});
</script>

<template>
  <custom-header />
  <RouterView class="h-screen pt-16 bg-[#f4f2ee]" />
<!--  <custom-footer />-->
</template>

