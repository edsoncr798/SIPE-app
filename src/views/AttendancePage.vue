<script setup lang="ts">
import type { IAttendance } from '@/components/attendance/models/IAttendance'
import { ElMessage } from 'element-plus'
import registerRules from '@/components/register/rules/registerRules'
import registerAttendance from '@/components/attendance/actions/registerAttendance'

const isLoading = ref(false)
const form = ref()

const initialData = ref({
  first_name: '',
  last_name: '',
  document_number: '',
  timeOut: new Date()
} as IAttendance)

const saveAttendance = async () => {
  form.value.validate(async (valid: boolean) => {
    if (!valid) {
      ElMessage.warning('Por favor, rellenar los campos correctamente')
      return;
    }
    isLoading.value = true;
    const status = await registerAttendance(initialData.value);
    isLoading.value = false;
    if(!status) {
      ElMessage.warning('Error al registrar la asistencia');
      return;
    }
    ElMessage.success('Asistencia Registrada correctamente correctamente');
  })
}
</script>

<template>
  <div class="w-full flex h-screen px-5">
    <el-form
      preventDefault
      :model="initialData"
      :rules="registerRules"
      ref="form"
      class="flex w-[400px] flex-col justify-between px-4 items-center m-auto bg-white rounded-lg shadow-lg"
    >
      <h1 class="text-center text-2xl font-bold p-5 text-[#409eff]">Registro de Asistencia</h1>
      <el-form-item prop="first_name" class="custom-margin w-full">
        <el-input v-model="initialData.first_name" placeholder="Nombre"></el-input>
      </el-form-item>

      <el-form-item prop="last_name" class="custom-margin w-full">
        <el-input v-model="initialData.last_name" placeholder="Apellido"></el-input>
      </el-form-item>

      <el-form-item prop="document_number" class="custom-margin w-full">
        <el-input v-model="initialData.document_number" placeholder="DNI"></el-input>
      </el-form-item>

      <el-form-item prop="timeOut" class="custom-margin w-full">
        <el-date-picker v-model="initialData.timeOut" type="datetime" placeholder="Select date and time" />
      </el-form-item>

      <el-form-item class="custom-margin w-full">
        <el-button type="primary" class="w-full" :loading="isLoading" @click="saveAttendance">
          Enviar Asistencia
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
