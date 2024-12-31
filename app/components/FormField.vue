<script lang="ts" setup>
import type { FormField } from '~~/shared/types';

const modelValue = defineModel<string | boolean>();

const props = defineProps<{
  field: FormField;
  error?: string;
  visible: boolean;
  locale: string;
}>();

const options = ref<{ label: string; value: string }[]>();

watch(
  () => props.locale,
  async () => {
    if (props.field.type === 'select') {
      const data = await $fetch<{label: string, value: string}[]>('/api/services', { query: { locale: props.locale } });
      options.value = structuredClone(data);
    }
  },
  { immediate: true }
);

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
            <UiSelectValue
              :placeholder="
                locale === 'fr'
                  ? 'Veuillez sélectionner un service'
                  : 'Please select a service'
              "
            />
          </UiSelectTrigger>
          <UiSelectContent>
            <UiSelectGroup>
              <UiSelectItem
                v-for="item in options"
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
