<script setup lang="ts">
import { Avatar, Picture } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const isPhone = ref(false)
const description = ref('')
const props = defineProps({
  dialogVisible:{
    type: Boolean,
    default: false,
    required: true,
  }
});

const emit = defineEmits(['close']);
const isOpenModal = computed({
  get: () => props.dialogVisible,
  set: () => {
    emit('close');
  },
});


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
        <el-image v-if="isPhone"  src="https://via.placeholder.com/150" class="w-14 rounded-full " alt="placeholder" />
        <Avatar v-else class="w-14 rounded-full bg-slate-500 p-2"/>
        <div>
          <h1>Nombre del usuario</h1>
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
        <el-button class="custom-btn">
          <Picture class="w-6" />
        </el-button>
      </el-tooltip>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitPost = false">
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