<script setup lang="ts">
import profileStore from '@/components/auth/profile.store'
import type { IUser } from '@/components/auth/models/IUser'
import { Avatar, ChatLineRound, School } from '@element-plus/icons-vue'
import { checkImageSize } from '@/composables/utils'
import { ElMessage } from 'element-plus'
import { updateProfileImage } from '@/components/auth/actions/updateProfile'


const getUserData = computed(() => profileStore.getUser());
const getFullName = computed(() => profileStore.getFullName());
const { goToWhatsapp } = profileStore;
const isProfileForm = ref(false);
const imageProfileRef = ref();
const modelUser = ref<IUser>({} as IUser);



const setImage = async () => {
  const file = imageProfileRef.value.files[0];

  if (!file)return;
  if (!checkImageSize(file)){
    imageProfileRef.value.value = '';
    return ElMessage({
      message: 'La imagen debe ser menor a 2MB',
      type: 'warning',
      duration: 2000,
    })
  }
  await updateProfileImage(file, getUserData.value.uid);
};

onMounted(() => {
  modelUser.value = getUserData.value;
});


console.log('user:', getUserData.value.first_name)

const openProfileForm = () => {
  isProfileForm.value = !isProfileForm.value;
};

</script>
<template>

  <update-profile-form
    v-if="isProfileForm"
    :dialogVisible="isProfileForm"
    @close ="isProfileForm = false"
  />

  <div class="mx-auto w-[95%] flex flex-col gap-2 md:flex-row">
    <div class="w-full md:w-[70%]">
      <el-card>
        <div>
          <div class="relative bg-red-500 flex justify-start">
            <el-image v-if="getUserData.background_photo" src="https://via.placeholder.com/150" class="w-full h-[300px]" alt="photo" />
            <el-empty v-else class="bg-slate-300 text-white w-full h-[250px] " description="no background" />
            <div class="absolute left-6 -bottom-14 md:-bottom-16 w-[80px] md:w-[150px] rounded-full" @click="imageProfileRef.click()">
              <input ref="imageProfileRef" accept=".png, .jpg, .jpeg" class="hidden" type="file" @change="setImage" />
              <el-image v-if="getUserData.photo" :src="getUserData.photo" class="object-cover rounded-full  shadow w-full h-full " alt="photo" />
              <Avatar v-else class="border w-full h-full bg-slate-50 p-2 shadow rounded-full" />
            </div>
         </div>
          <div class="flex mt-16 justify-between px-8">
            <ul class="flex flex-col items-start gap-4 pb-4">
              <li>
                <h1>{{ getFullName }}</h1>
              </li>
              <li>
                <p v-if="getUserData.summary"> {{ getUserData.summary }}</p>
                <label v-else for="">Resumen</label>
              </li>
              <li>
                <p v-if="getUserData.country">{{ getUserData.country }}</p>
                <label v-else>Pais</label>
              </li>
              <li>
                <el-button type="primary" round size="small" class="w-full">
                  Seguir
                </el-button>
              </li>
            </ul>

            <ul>
              <li>
                <el-icon><School /></el-icon>
                <p>{{ getUserData.education }}</p>
              </li>
            </ul>
          </div>
        </div>
      </el-card>
    </div>

    <div class="w-full md:w-[30%] md:block min-w-max">
      <el-card class="p-4">
        <ul class="flex flex-col items-start  gap-4 p-4">
          <li class="flex flex-col">
            <strong>Idioma</strong>
            <label> {{ getUserData.language }} </label>
          </li>
          <li>
            <div>
              <el-tooltip
                class="box-item"
                effect="dark"
                content="whatsapp"
                placement="top-start"
              >
                <el-button @click="goToWhatsapp" class="custom-btn-app">
                  <ChatLineRound  class="text-white w-6" />
                </el-button>
              </el-tooltip>
            </div>
          </li>
        </ul>
        <div class="w-full flex justify-center">
          <el-button @click="openProfileForm" type="primary" round size="large" class="w-full ">
            Editar Perfil
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>

.el-button.custom-btn-app{
  width: 40px !important;
  height: 40px !important;
  border-radius: 10px !important;
  border: none !important;
  box-shadow:  0 0 2px rgba(0, 0, 0, 0.3) !important;
  background-color: #48e731 !important;
}

.el-button.custom-btn-app:hover{
  box-shadow:  0 0 10px rgba(0, 0, 0, 0.3) !important;
}

</style>