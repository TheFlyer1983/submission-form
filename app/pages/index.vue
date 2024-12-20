<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { minLength, required, email } from '@vuelidate/validators';

type formType = Record<string, string | boolean>;
const form = ref<formType>({
  name: '',
  email: '',
  password: '',
  date_of_birth: '',
  services: '',
  other: '',
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
  console.log(v$.value)

  console.log(payload);
  // navigateTo('/submitted');
}

const { data } = await useFetch('/api/form-fields');

const rules = computed(() => ({
  name: {
    required,
    minLength: minLength(2)
  },
  email: {
    required,
    email
  }
}));

const v$ = useVuelidate();
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Todo: Heading Goes Here-->
    Some Heading
    <div class="flex w-[65%] flex-col items-center justify-center border">
      <form class="space-y-3" @submit.prevent="submit">
        <FormField
          v-for="field in data"
          :key="field.name"
          v-model="form[field.name]"
          v-model:other-value="otherValue"
          :label="field.label"
          :type="field.type"
          :required="field.required"
        />
      </form>
      <UiButton class="self-start" @click="submit">Submit</UiButton>
    </div>
  </div>
</template>
