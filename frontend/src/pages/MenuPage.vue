<template>
  <div>
    <h1> Menu </h1>

    <h2>Appetizers</h2>
    <hr>
    <form>
      <img src="https://media.olivegarden.com/en_us/images/product/Fried-Mozzarella-gv-590X365.jpg">
      <input type="button" class="MinusButton">
      <input type="button" class="PlusButton">
    </form>

    <h2>Entrees</h2>
    <hr>

    <h2>Desserts</h2>
    <hr>

    <h2>Drinks</h2>
    <hr>

  </div>


</template>
<script>
import { ref } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "test-test",
  props :{

  },
  setup() {
    // const url = ref('')
    return {
      // url, 
      // refresh(){
      //   url.value = " " + Math.random()
      // }
    };
  },
  data() {
    return {
    };
  },
  mounted() {},
  components: {},
});
</script>
<style scoped>
h1{
  text-align: center;
  font-style: italic;
  font-size: 50px
}
h2{
  font-size: 30px;
  font-style: italic;
  text-align: left;
  text-indent: 30px;
}
hr{
  color: var(--tertiary)
}
items{
  color: black;
}
</style>