<script lang="ts" setup>
const { data } = await useFetch('/api/submission');

</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen border">
    You have successfully submitted the form.
    <pre>{{ data }}</pre>
  </div>
</template>
