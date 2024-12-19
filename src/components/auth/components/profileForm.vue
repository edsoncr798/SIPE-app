<script setup lang="ts">
import profileStore from '@/components/auth/profile.store'
import type { IUser } from '@/components/auth/models/IUser'
import { Avatar, ChatLineRound, School } from '@element-plus/icons-vue'
import { checkImageSize } from '@/composables/utils'
import { ElMessage } from 'element-plus'
import { updateProfileImage } from '@/components/auth/actions/updateProfile'


const getUserData = computed(() => profileStore.getUser());
const getFullName = computed(() => profileStore.getFullName());
const isProfileForm = ref(false);
const imageProfileRef = ref();
const modelUser = ref<IUser>({} as IUser);


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
         </div>
          <div class="flex mt-16 justify-between px-8">
            <ul class="flex flex-col items-start gap-4 pb-4">
              <li>
                <h1>{{ getFullName }}</h1>
              </li>
            </ul>
          </div>
        </div>
      </el-card>
    </div>

    <div class="w-full md:w-[30%] md:block min-w-max">
      <el-card class="p-4">
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