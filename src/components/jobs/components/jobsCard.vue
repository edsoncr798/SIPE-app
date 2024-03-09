<script setup lang="ts">
import { OfficeBuilding } from '@element-plus/icons-vue'
import type { IJob } from '@/components/works/models/IJob'
import type { PropType } from 'vue'
import { getUserPhoneNumber } from '@/components/works/actions/getUserPhoneNumber'

const props = defineProps({
  publishedJobsItem: {
    type: Object as PropType<IJob>,
    required: true
  }
});

const validTypeWorkPlaceEqualsRemote = computed(() => {
  return props.publishedJobsItem.type_work_place === 'Remoto'
    ?
      `En ${props.publishedJobsItem.type_work_place}`
    :
      props.publishedJobsItem.type_work_place
})

const phoneNumber = ref('')

onMounted(async () => {
  phoneNumber.value = await getUserPhoneNumber(props.publishedJobsItem.uid)
});



</script>

<template>
  <el-card class="box-card p-5" v-if="publishedJobsItem">
    <div class="flex justify-between ">
      <div class="flex">
        <div class="flex items-center">
          <div class="w-10 h-10 flex justify-center items-center">
            <el-icon style="font-size: 35px; color: #10a1f3"><OfficeBuilding/></el-icon>
          </div>
          <div class="ml-4">
            <h2 class="text-lg font-bold">{{ publishedJobsItem.post }}</h2>
            <p class="text-sm">{{ publishedJobsItem.company }}</p>
            <ul class="flex gap-2">
              <li class="text-xs">{{ publishedJobsItem.work_location }}</li>
              <li class="text-xs">({{ validTypeWorkPlaceEqualsRemote }})</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <el-button type="primary" size="small">Apply</el-button>
        <el-button  size="small">Guardar</el-button>
      </div>
    </div>
  </el-card>
</template>

<style scoped>

</style>