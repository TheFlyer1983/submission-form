<script lang="ts" setup>
const { data } = await useFetch('/api/submission');

</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen border space-y-4">
    <p class=" text-xl font-semibold">You have successfully submitted the form.</p>
    
    <pre>{{ data }}</pre>
  </div>
</template>
