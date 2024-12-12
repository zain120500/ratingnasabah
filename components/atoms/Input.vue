<template>
  <input :class="error && 'input-error'" v-model="data" v-bind="$attrs">
</template>
<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps<{ modelValue: string }>();
const emit: any = defineEmits(['update:modelValue'])

const data = useModel(props, 'modelValue', emit)

const error = ref(false)
const isValid = () => {
  error.value = !error.value
}
defineExpose({
  isValid
})
</script>

