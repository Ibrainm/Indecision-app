import { computed, defineComponent, ref } from "vue";
import { useCounter } from "../../composables/useCounter";

export default defineComponent({

  props: {
    value: {type: Number, required: true}
  },

  setup(props) {
    const {counter, squareCounter} = useCounter(props.value);

    return {
      counter,
      squareCounter,
    };
  },
});