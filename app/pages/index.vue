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
    other:
      form.value.service === 'other' ? otherValue.value : form.value.service
  };
  await v$.value.$validate();

  console.log(payload);
  if (!v$.value.$invalid) {
    navigateTo('/submitted');
  }
}

const { data } = await useFetch<FormField[]>('/api/form-fields');

const { rules } = useValidationRules(form.value);

function showHiddenField(field: FormField) {
  if (field.parent && field.requiredIf) {
    return form.value[field.parent] === field.requiredIf;
  } else {
    return false;
  }
}

const v$ = useVuelidate<FormType>(rules, form.value);
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Todo: Heading Goes Here-->
    Some Heading
    <div class="flex w-[65%] flex-col items-center justify-center border">
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
      </form>
      <UiButton class="self-start" @click="submit">Submit</UiButton>
    </div>
  </div>
</template>
