<script lang="ts" setup>
const modelValue = defineModel<string>();

const props = defineProps<{
  label: string;
  type: string;
}>();

const { data } = await useLazyFetch('/api/services');
const otherValue = ref<string>();
</script>

<template>
  <div v-if="['text', 'password'].includes(props.type)">
    <label>{{ label }}:</label>
    <UiInput v-model="modelValue" :type />
  </div>
  <div v-else-if="['select'].includes(props.type)" class="space-y-3">
    <div>
      <label>{{ label }}:</label>
      <UiSelect v-model="modelValue">
        <UiSelectTrigger>
          <UiSelectValue placeholder="Please select a service" />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectGroup>
            <UiSelectItem
              v-for="item in data"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </UiSelectItem>
          </UiSelectGroup>
        </UiSelectContent>
      </UiSelect>
    </div>
    <div v-if="modelValue === 'other'">
      <label>Other:</label>
      <UiInput v-model="otherValue" />
    </div>
  </div>
</template>
