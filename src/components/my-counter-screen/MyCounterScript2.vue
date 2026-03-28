<script lang="ts" src="./MyCounterScript2">

</script>

<template>
  <section>
    <h3>Counter: {{ counter }}</h3>
    <h3>Square: {{ squareCounter }}</h3>
  </section>

  <div>
    <button @click="counter++" class="btn mr-2">+1</button>
    <button @click="counter--" class="btn ">-1</button>
  </div>
</template>

<style scoped>
@reference "../../style.css";
/* @reference "tailwindcss"; */

.btn {
  @apply p-5 bg-blue-500 hover:bg-blue-700 rounded;
}
</style>