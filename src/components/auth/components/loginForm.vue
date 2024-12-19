<script setup lang="ts">
import loginRules from '@/components/auth/rules/loginRules'
import type { ILogin } from '@/components/auth/models/IUser'
import userLogin from '@/assets/jpg/user_login.jpg'
import { ElMessage } from 'element-plus'
import auth_login from '@/components/auth/actions/auth_login'
import profileStore from '@/components/auth/profile.store'


const router = useRouter();
const form = ref();
const isLoading = ref(false);
const fullName = computed(() =>profileStore.getFullName());

const model = reactive<ILogin>( {
  email: '',
  password: ''
});

// function to validate if is email or username

const sendLogin = async () => {
  form.value.validate(async (valid: boolean) =>{
    if(!valid){
      ElMessage.warning('Por favor, rellenar los campos correctamente');
      return;
    }
    isLoading.value = true;
    const status = await auth_login(model);

    isLoading.value = false;
    if(!status){
      ElMessage.warning('Email o contraseña incorrecta');
      return;
    }
    await router.push({name: 'home'});
    ElMessage.success('Bienvenido ' + fullName.value);
  })
};

</script>

<template>
  <div class="flex w-full h-screen">
    <el-form
      :model="model"
      :rules="loginRules"
      ref="form"
      class="flex justify-between m-auto w-[600px] bg-white p-4 rounded-lg shadow-lg"
    >
      <div class="w-1/2 flex bg-blue-600 rounded-l-xl ">
        <el-image :src="userLogin" class="border rounded m-auto" />
      </div>
      <div class="w-1/2 flex flex-col items-center">
        <h1 class="text-center text-2xl font-bold p-5 text-[#409eff]">Log in</h1>
        <el-form-item prop="email" class="custom-margin w-full">
          <el-input v-model="model.email"  placeholder="correo electronico"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="custom-margin w-full">
          <el-input v-model="model.password" show-password  type="password" placeholder="contraseña"></el-input>
        </el-form-item>

        <el-form-item class="custom-margin w-full">
          <el-button  size="large" type="primary" :loading="isLoading" round class="w-full" @click="sendLogin">Login</el-button>
        </el-form-item>

        <el-form-item class="custom-margin w-full">
          <div class="flex items-center gap-2">
            <p class="text-[11px] font-light">¿No tiene una cuenta? </p>
            <router-link class="text-blue-300 underline hover:text-blue-700 text-[12px]" to="/register"> Registrarse</router-link>
          </div>
        </el-form-item>
      </div>
    </el-form>

  </div>
</template>

<style>
.el-form-item.custom-margin{
  padding-bottom: 10px !important;
}
</style>