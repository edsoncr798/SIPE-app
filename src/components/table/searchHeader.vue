<script lang="ts" setup>
const option = ref('Todos');
const form = ref({
  textFilter: '',
});

const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
});

// const validateTextFilter = () => {
//   if (form.value.textFilter.length == 0 && option.value != 'Todos') {
//     return Promise.reject('Por favor, debe ingresar un valor');
//   } else {
//     if (option.value == 'DNI') {
//       if (form.value.textFilter.length != 8) {
//         return Promise.reject('El DNI debe tener 8 digitos');
//       }
//       return Promise.resolve();
//     }
//     if (option.value == 'Telefono') {
//       if (form.value.textFilter.length != 9) {
//         return Promise.reject('El Telefono debe tener 9 digitos');
//       }
//     }
//   }
//
//   return Promise.resolve();
// };
</script>

<template>
  <el-form :model="form">
    <div class="flex gap-2">
      <el-select v-model="option" size="large" class="w-[135px] font-bold">
        <el-option v-for="item in ['Todos', 'DNI', 'Telefono']" :key="item" :label="item" :value="item" />
      </el-select>
      <el-form-item>
        <el-input class="el-autocomplete" v-model="form.textFilter" size="large" clearable />
      </el-form-item>
      <el-button
        :loading="props.loading"
        @click="
          $emit('search', { text: form.textFilter, isDni: option == 'DNI' });
          form.textFilter = '';
        "
        type="primary"
        size="large"
      >Filtrar
      </el-button>
    </div>
  </el-form>
</template>

<style>
.el-autocomplete {
  width: 200px;
  height: 40px;
}

.my-autocomplete li {
  line-height: normal;
  padding: 7px;
}

.my-autocomplete li .name {
  text-overflow: ellipsis;
  overflow: hidden;
}

.my-autocomplete li .addr {
  font-size: 12px;
  color: #b4b4b4;
}

.my-autocomplete li .highlighted .addr {
  color: #ddd;
}
</style>
