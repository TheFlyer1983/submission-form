<script lang="ts" setup>
import type { FormField } from '~~/shared/types';

const modelValue = defineModel<string | boolean>();

defineProps<{
  field: FormField;
  error?: string;
  visible: boolean;
}>();

const { data, execute } = useFetch('/api/services');

onMounted(async () => {
  await execute();
});
</script>

<template>
  <div>
    <div
      v-if="
        ['text', 'password', 'date'].includes(field.type) &&
        typeof modelValue === 'string' &&
        visible
      "
    >
      <label>
        {{ field.label }}:
        <span v-if="field.required" class="text-red-600">*</span>
      </label>
      <UiInput v-model="modelValue" :type="field.type" />
    </div>
    <div
      v-else-if="
        ['select'].includes(field.type) &&
        typeof modelValue === 'string' &&
        visible
      "
      class="space-y-3"
    >
      <div>
        <label> {{ field.label }}: <span v-if="field.required">*</span> </label>
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
    </div>
    <div
      v-else-if="
        ['checkbox'].includes(field.type) &&
        typeof modelValue === 'boolean' &&
        visible
      "
    >
      <UiCheckbox v-model:checked="modelValue" />
      <label class="ml-2">{{ field.label }}</label>
    </div>
    <div class="text-red-500">{{ error }}</div>
  </div>
</template>
