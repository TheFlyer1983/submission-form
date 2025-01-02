<script lang="ts" setup>
const { data } = await useFetch('/api/submission');

</script>

<template>
  <div
    class="flex h-screen flex-col items-center justify-center space-y-4 border"
  >
    <p class="text-xl font-semibold">{{ $t('success') }}</p>

    <pre>{{ data }}</pre>
  </div>
</template>
