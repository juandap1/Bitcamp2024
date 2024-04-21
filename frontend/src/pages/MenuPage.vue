<template>
  <div>
    <h1> Menu </h1>

    <h2>Appetizers</h2>
    <hr>
    <div class="item-container">
      <menu-item v-for="m in items" v-bind="m" :key="m" @add="add(m)" @remove="remove(m)" />
    </div>
    <hr>
    <button class="submit" @click="checkout">Check Out</button>

  </div>


</template>
<script>
import { defineComponent } from "vue";
import MenuItem from "../components/MenuItem.vue"
import { useStateStore } from "../stores/state";

export default defineComponent({
  name: "MenuPage",
  setup() {
    return {};
  },
  data() {
    return {
      foodList: {},
      items: [],
    };
  },
  methods: {
    add(item) {
      if (this.foodList[item.name] == null) this.foodList[item.name] = {
        ...item,
        count: 0
      }
      this.foodList[item.name].count ++;
    },
    remove(item) {
      if (this.foodList[item.name].count === 1) delete this.foodList[item.name]
      else if(this.foodList[item.name].count > 1){
        this.foodList[item.name].count --;
      }
    },
    checkout(){
      useStateStore().foodList = this.foodList;
      this.$router.push("/billing")
    }
  },
  mounted() {},
  components: {MenuItem},
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
.item-container{
  justify-content: space-around;
  display: flex;
}
hr{
  color: var(--tertiary)
}
items{
  color: black;
}
</style>