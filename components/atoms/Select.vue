<template>
  <div>
    {{ props.value }}
    <label :for="props.inputId">{{ label }}<span v-if="props.required" class="text-sm text-red-500">*</span></label>
    <select :value="props.value" :id="props.inputId" class="select select-bordered select-sm w-full" v-bind="$attrs"
      @selected="$emit(`updata:value`, $event.target.value)" :class="error && 'select-error'">
      <option :value="null" disabled selected>-- {{ placeholder }} --</option>
      <option v-for="option in options" :value="option.value">{{ option.label }}</option>
    </select>

  </div>
</template>

<script setup lang="ts">
const props = defineProps(
  {
    label: String,
    value: [String, Number],
    options: Array,
    required: Boolean,
    inputId: String,
    placeholder: String,

  }
)
const error = ref(false)
const isValid = () => {
  error.value = true
}
</script>
