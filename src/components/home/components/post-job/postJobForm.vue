<script setup lang="ts">
import { ref } from 'vue'
import { EJobType, ETypeWorkPlace, type IJob } from '@/components/works/models/IJob'
import { ElMessage } from 'element-plus'
import { publishJob } from '@/components/works/actions/postJob'

const emits = defineEmits(['createJob']);
const modelJob = ref<IJob>({} as IJob);
const typeWorkPlaces = ref<ETypeWorkPlace[]>([ETypeWorkPlace.remote, ETypeWorkPlace.office, ETypeWorkPlace.hybrid]);
const typeJobs = ref<EJobType[]>([EJobType.fullTime, EJobType.partTime, EJobType.internship, EJobType.freelance, EJobType.temporary, EJobType.other]);
const isLoadingButton = ref(false);

const isValidForm = computed(() => {
  return (
    modelJob.value.post &&
    modelJob.value.company &&
    modelJob.value.type_work_place &&
    modelJob.value.work_location &&
    modelJob.value.job_type
  );
});

const postJob = async () => {
  if (!isValidForm.value) {
    ElMessage({
      message: 'Por favor, ingresa todos los campos',
      type: 'warning',
    });
    return;
  }
  isLoadingButton.value = true;

  const timestamp = new Date()
  modelJob.value.created_at = timestamp;
  modelJob.value.updated_at = timestamp;

  await publishJob(modelJob.value);
  isLoadingButton.value = false;
  // clear form after submit
  emits('createJob');
  modelJob.value = {} as IJob;
};
</script>

<template>
  <div class="min-w-max">
    <el-card class="box-card p-5 ">
      <div class="text-center ">
        <strong>Publicar empleo</strong>
      </div>
      <el-form ref="form" label-position="top"  :model="modelJob" class="mt-10 flex flex-col">
        <el-form-item label="Cargo">
          <el-input v-model="modelJob.post" clearable placeholder="Añade el puesto que nesecitas cubrir" size="large" type="text"></el-input>
        </el-form-item>
        <el-form-item label="Empresa" prop="description">
          <el-input v-model="modelJob.company" clearable size="large" type="text"></el-input>
        </el-form-item>
        <el-form-item label="Modo de trabajo">
          <el-select v-model="modelJob.type_work_place" placeholder="Presencial" size="large">
            <el-option v-for="item in typeWorkPlaces" :key="item" :label="item" :value="item"  />
          </el-select>
        </el-form-item>
        <el-form-item label="Ubicacion del empleo" prop="salary">
          <el-input v-model="modelJob.work_location" clearable  size="large" type="text"></el-input>
        </el-form-item>
        <el-form-item label="Tipo de empleo" prop="vacancy">
          <el-select v-model="modelJob.job_type" clearable placeholder="Tiempo completo" size="large" type="text">
            <el-option v-for="item in typeJobs" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-button :loading="isLoadingButton" type="primary" @click="postJob">Publicar</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
</style>
