<script setup lang="ts">
import type { IUser } from '@/components/auth/models/IUser'
import router from '@/router'
import registerRules from '@/components/register/rules/registerRules'
import { ElMessage } from 'element-plus'
import registerUser from '@/components/register/actions/registerUser'

const isLoading = ref(false);
const form = ref();

const initialData = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
} as IUser);


const saveInitialData = async () => {
  form.value.validate(async (valid: boolean) => {
    if (!valid) {
      ElMessage.warning('Por favor, rellenar los campos correctamente');
      return;
    }
    isLoading.value = true;
    const status = await registerUser(initialData.value);
    isLoading.value = false;
    if (!status) {
      ElMessage.warning('Error al registrar usuario');
      return;
    }
    await router.push({ name: 'login' });
  });
}

</script>

<template>
  <div class="w-full flex h-screen">
    <el-form
      preventDefault
      :model="initialData"
      :rules="registerRules"
      ref="form"
      class="flex  w-[400px] flex-col justify-between items-center m-auto  bg-white rounded-lg shadow-lg"
    >

        <h1 class="text-center text-2xl font-bold p-5 text-[#409eff]">Sign In</h1>
        <el-form-item prop="first_name" class="custom-margin w-full">
          <el-input v-model="initialData.first_name"  placeholder="Nombre"></el-input>
        </el-form-item>

        <el-form-item prop="last_name" class="custom-margin w-full">
          <el-input v-model="initialData.last_name" placeholder="Apellido"></el-input>
        </el-form-item>

        <el-form-item prop="email" class="custom-margin w-full">
          <el-input v-model="initialData.email"  placeholder="Correo"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="custom-margin w-full">
          <el-input v-model="initialData.password" show-password  type="password" placeholder="Contraseña"></el-input>
        </el-form-item>

        <el-form-item class="custom-margin w-full">
          <el-button
            type="primary"
            class="w-full"
            :loading="isLoading"
            @click="saveInitialData"
          >
            Sign in
          </el-button>
        </el-form-item>

    </el-form>
  </div>
</template>

<style >
.el-form-item.custom-margin{
  padding: 10px !important;
}

</style>