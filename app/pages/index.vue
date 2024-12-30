<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import type { FormField, FormType } from '~~/shared/types';

const form = ref<FormType>({
  name: '',
  email: '',
  password: '',
  date_of_birth: '',
  services: '',
  services_other: '',
  terms_and_conditions: false
});
const otherValue = ref<string>();

async function submit() {
  const payload = {
    ...form.value,
  };
  await v$.value.$validate();

  if (!v$.value.$invalid) {
    await $fetch('/api/submit', {
      method: 'POST',
      body: payload
    });
    navigateTo('/submitted');
  }
}

const { execute, data } = useFetch<FormField[]>('/api/form-fields');

const { rules, createValidationRules } = useValidationRules();

function showHiddenField(field: FormField) {
  if (field.parent && field.validationRules.requiredIf) {
    return form.value[field.parent] === field.validationRules.requiredIf;
  } else {
    return false;
  }
}

const { isLoading, start, finish } = useLoadingIndicator();

const v$ = useVuelidate<FormType>(rules, form.value);

onMounted(async () => {
  start();
  await execute();
  if (data.value) createValidationRules(data.value, form.value);
  finish();
});
</script>

<template>
  <div v-if="!isLoading" class="flex flex-col items-center justify-center">
    <!-- Todo: Heading Goes Here-->
    Some Heading
    <div class="flex w-[65%] flex-col items-center justify-center">
      <form class="space-y-3" novalidate @submit.prevent="submit">
        <FormField
          v-for="field in data"
          :key="field.name"
          v-model="form[field.name]"
          v-model:other-value="otherValue"
          :field
          :visible="field.visible ? field.visible : showHiddenField(field)"
          :error="v$[field.name]?.$errors[0]?.$message"
        />
        <UiButton class="self-start" @click="submit">Submit</UiButton>
      </form>
    </div>
  </div>
</template>
