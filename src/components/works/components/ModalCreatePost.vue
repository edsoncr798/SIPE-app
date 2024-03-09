<script setup lang="ts">
import { Avatar, Picture } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import profileStore from '@/components/auth/profile.store'

const description = ref('')
const imagePicture = ref()
const userData = computed( () => profileStore.getUser())
const getFullName = computed(() => profileStore.getFullName())
const emit = defineEmits(['close']);

const props = defineProps({
  dialogVisible:{
    type: Boolean,
    default: false,
    required: true,
  }
});
const isOpenModal = computed({
  get: () => props.dialogVisible,
  set: () => {
    emit('close');
  },
});

const setPicture = (e: any) => {
  ElMessage.success('Imagen subida');
};


const submitPost = () => {
  ElMessage.success('Publicacion exitosa');
};


</script>

<template>
  <el-dialog
    v-model="isOpenModal"
  >
    <template #header>
      <div class="flex items-center gap-4 ">
        <el-image v-if="userData.photo"  :src="userData.photo" class="w-14 rounded-full " alt="placeholder" />
        <Avatar v-else class="w-14 rounded-full bg-slate-500 p-2"/>
        <div>
          <h1>{{ getFullName }}</h1>
        </div>
      </div>
    </template>

    <div class="mb-20">
      <el-input
        v-model="description"
        placeholder="¿Sobre que quieres hablar?"
        type="textarea"
      >
      </el-input>
    </div>
    <div>
       <el-tooltip
        class="box-item"
        effect="dark"
        content="subir imagen"
        placement="top-start"
      >
        <el-button class="custom-btn" @click="imagePicture.click()">
          <input ref="imageProfileRef" accept=".png, .jpg, .jpeg" class="hidden" type="file" @change="setPicture" />
          <Picture class="w-6" />
        </el-button>
       </el-tooltip>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitPost">
          Publicar
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style>
.el-textarea__inner{
  height: 150px !important;
}

.el-button.custom-btn{
  width: 40px !important;
  height: 40px !important;
  border-radius: 50% !important;
  border: none !important;
  box-shadow:  0 0 2px rgba(0, 0, 0, 0.3) !important;
  background-color: #f3f3f3 !important;
}

.el-button.custom-btn:hover{
  box-shadow:  0 0 10px rgba(0, 0, 0, 0.3) !important;
}

</style>