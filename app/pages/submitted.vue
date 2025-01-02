<script lang="ts" setup>
const { data } = await useFetch('/api/submission');

const showSubmittedData = ref(false);
</script>

<template>
  <div
    class="flex h-screen flex-col items-center justify-center space-y-4 border"
  >
    <p class="text-xl font-semibold">{{ $t('success') }}</p>

    <UiButton
      @click="showSubmittedData = !showSubmittedData"
    >
      {{ $t(showSubmittedData ? 'hideSubmitted' : 'showSubmitted') }}
    </UiButton>

    <pre v-if="showSubmittedData">{{ data }}</pre>
  </div>
</template>
