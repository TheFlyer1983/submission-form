<script lang="ts" setup>
const modelValue = defineModel<string | boolean>();
const otherValue = defineModel<string>('otherValue');

const props = defineProps<{
  label: string;
  type: string;
  required: boolean;
  error?: string;
}>();

const { data } = await useLazyFetch('/api/services');
</script>

<template>
  <div>
    <div
      v-if="
        ['text', 'password', 'date'].includes(props.type) &&
        typeof modelValue === 'string'
      "
    >
      <label
        >{{ label }}: <span v-if="required" class="text-red-600">*</span></label
      >
      <UiInput v-model="modelValue" :type />
    </div>
    <div
      v-else-if="
        ['select'].includes(props.type) && typeof modelValue === 'string'
      "
      class="space-y-3"
    >
      <div>
        <label> {{ label }}: <span v-if="required">*</span> </label>
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
    <div
      v-else-if="
        ['checkbox'].includes(props.type) && typeof modelValue === 'boolean'
      "
    >
      <UiCheckbox v-model:checked="modelValue" />
      <label class="ml-2">{{ label }}</label>
    </div>
    <div class= text-red-500">{{ error }}</div>
  </div>
</template>
