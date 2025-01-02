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

async function submit() {
  await v$.value.$validate();
  
  if (!v$.value.$invalid) {
    await $fetch('/api/submit', {
      method: 'POST',
      body: form.value
    });
    navigateTo('/submitted');
  }
}
const data = ref<FormField[]>();
const { setLocale, locale } = useI18n();

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

watch(
  locale,
  async () => {
    start();
    const response = await $fetch<FormField[]>('/api/form-fields', {
      query: { locale: locale.value }
    });
    data.value = response;
    if (data.value) createValidationRules(data.value, form.value);
    finish();
  },
  { immediate: true }
);
</script>

<template>
  <div
    v-if="!isLoading"
    class="mt-4 flex flex-col items-center justify-center space-y-4"
  >
    <div class="flex space-x-4">
      <UiButton @click="setLocale('en')">{{ $t('english') }}</UiButton>
      <UiButton @click="setLocale('fr')">{{ $t('french') }}</UiButton>
    </div>

    <!-- Todo: Heading Goes Here-->
    <p class="text-4xl font-bold">{{ $t('header') }}</p>
    <div class="flex w-[65%] flex-col items-center justify-center">
      <form class="space-y-3" novalidate @submit.prevent="submit">
        <FormField
          v-for="field in data"
          :key="field.name"
          v-model="form[field.name]"
          :field
          :visible="field.visible ? field.visible : showHiddenField(field)"
          :error="v$[field.name]?.$errors[0]?.$message"
          :locale
        />
        <UiButton class="self-start" @click="submit">
          {{ $t('submit') }}
        </UiButton>
      </form>
    </div>
  </div>
</template>
