<script lang="ts" setup>
const form = ref<Record<string, any>>({
  name: ''
});

function submit() {
  console.log(form.value);
}

const { data, error } = useFetch('/api/form-fields');
</script>

<template>
  <div class="flex justify-center">
    <div class="flex w-[80%] flex-col items-center justify-center border">
      <form class="space-y-3" @submit.prevent="submit">
        <FormField
          v-for="field in data"
          :key="field.name"
          v-model="form[field.name]"
          :label="field.label"
          :type="field.type"
        />
      </form>
      <UiButton class="self-start" @click="submit">Submit</UiButton>
    </div>
  </div>
</template>
