<script setup lang="ts">
import type { IUser } from '@/components/auth/models/IUser'
import { ElMessage } from 'element-plus'
import updateProfile from '@/components/auth/actions/updateProfile'
import profileStore from '@/components/auth/profile.store'
import { getMediaFile } from '@/composables/utils'

const emits = defineEmits(['updateProfile', 'close']);

const modelUser = ref<IUser>({} as IUser);
const isLoadingButton = ref(false);

const isValidForm = computed(() => {
  return (
    modelUser.value.first_name &&
    modelUser.value.last_name &&
    modelUser.value.email &&
    modelUser.value.city &&
    modelUser.value.country &&
    modelUser.value.education &&
    modelUser.value.work_experience &&
    modelUser.value.skills &&
    modelUser.value.phone &&
    modelUser.value.language &&
    modelUser.value.career
  );
});

const saveProfileData = async () => {

  if (!isValidForm.value) {
    ElMessage.warning({
      message: 'Por favor, ingresa todos los campos',
      type: 'warning'
    })
    return;
  }
  isLoadingButton.value = true;
  await updateProfile(modelUser.value);
  isLoadingButton.value = false;
  emits('close')
  emits('updateProfile');
};

const setInitialUserData = async () => {
  const user = profileStore.getUser()
  if (!user) return;

  modelUser.value = {
    uid: user.uid,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    career: user.career,
    photo: getMediaFile(user.photo),
    phone: user.phone,
    language: user.language,
    background_photo: getMediaFile(user.background_photo),
    country: user.country,
    city: user.city,
    work_experience: user.work_experience,
    education: user.education,
    skills: user.skills,
    summary: user.summary,
    updated_at: new Date(),
  }
}

onMounted(async () => {
  await setInitialUserData()
});

const  props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
    required: true,
  }
});

const isOpenModal = computed({
  get: () => props.dialogVisible,
  set: () => {
    emits('close');
  },
});

</script>

<template>
  <el-dialog
    v-model="isOpenModal"
  >
    <el-form ref="form"  class="mt-10 flex flex-col">
      <el-form-item label="">
        <el-input v-model="modelUser.first_name" clearable placeholder="Nombre" size="large" type="text"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="modelUser.last_name" clearable placeholder="Apellido" size="large" type="text"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input readonly v-model="modelUser.email" clearable placeholder="Email" size="large" type="text"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="modelUser.phone" clearable placeholder="Telefono" size="large" type="text"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input  v-model="modelUser.country" clearable placeholder="Pais" size="large" type="text"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input  v-model="modelUser.city" clearable placeholder="Ciudad" size="large" type="text"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input  v-model="modelUser.language" clearable placeholder="Idioma" size="large" type="text"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="modelUser.career" clearable placeholder="Profesion o Carrera" size="large" type="text"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input  v-model="modelUser.education" clearable placeholder="Educacion" size="large" type="text"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input  v-model="modelUser.skills" clearable placeholder="Habilidades" size="large" type="text"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input  v-model="modelUser.work_experience" clearable placeholder="Experiencia" size="large" type="text"></el-input>
      </el-form-item>
      <el-button :loading="isLoadingButton" :disabled="!isValidForm || isLoadingButton" type="primary" @click="saveProfileData">Guardar</el-button>
     </el-form>
  </el-dialog>
</template>

<style scoped>

</style>