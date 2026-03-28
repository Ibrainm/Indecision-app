<script lang="ts" setup>
import { useCounter } from '../composables/useCounter';

// import { computed, ref } from 'vue';
  // const props = defineProps({
  //   value: {type: Number, required: true}
  // });

  // const props = defineProps<{value: number}>();

  interface Props {
    value?: number;
  }

  const props = defineProps<Props>();
  const { counter, squareCounter } = useCounter(10);

</script>

<template>
  <section>
    <h3>Counter: {{ counter }} </h3>
    <h3>Square: {{ squareCounter }}  </h3>
  </section>

  <div>
    <button @click="counter++"> +1</button>
    <button @click="counter--">-1</button>
  </div>
</template>
