<script setup lang="ts">
import QrcodeVue from 'qrcode.vue';

const qrValue = ref('')

const generateQR = () => {
  // Generar el valor del QR con el enlace al formulario
  qrValue.value = `${window.location.origin}/Attendance`
}
</script>

<template>
  <div class="p-8 qr-generator h-[450px] bg-gray-50 flex flex-col justify-center items-center">
    <h1>Generar Código QR</h1>
    <el-button @click="generateQR">Generar QR</el-button>

    <div v-if="qrValue" class="qr-code w-full flex flex-col items-center justify-center">
      <h2>Código QR generado:</h2>
      <qrcode-vue :value="qrValue" :size="200"></qrcode-vue>
      <p>Compártelo con el empleado para registrar su asistencia.</p>
    </div>
  </div>
</template>

<style scoped>
.qr-generator {
  text-align: center;
  margin: 20px;
}

.qr-code {
  margin-top: 20px;
}

input {
  padding: 10px;
  margin-right: 10px;
}
</style>
