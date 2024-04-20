<template>
    <div class="food-item">
          <img :src="img">
          <div class="price-label">{{ price }}</div>
          <br>
          <div class="name-label">{{ name }}</div>
          <button class="MinusButton" @click="decrementCount">-</button>
          <label class="items" id="mozzarella-count">{{ count }}</label>
          <button class="PlusButton" @click="incrementCount">+</button> 
    </div>
  </template>
  <script>
  import { defineComponent } from "vue";

  
  export default defineComponent({
    name: "menu-item",
    props :{
        name: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        }
    },
    setup() {
      return {};
    },
    data() {
      return {
        count : 0
      };
    },
    methods: {
    incrementCount () {
      this.count++;
      this.$emit('add')
    },
    decrementCount (){
      if(this.count > 0){
        this.count --;
        this.$emit('remove')
      }
    }
  },
    mounted() {},
    components: {},
  });
  </script>
<style scoped>
img{
  border-radius: 50%;
  width: 200px;
  height: 200px;
  margin-left: 25px;
}
.name-label{
    word-wrap: break-word;
    margin-left: 45px;
    width: 150px;
}
.price-label{
    text-align: center;
    position:absolute;
    background-color: var(--tertiary);
    border-radius: 50%;
    padding: 5px;
}
.food-item{
word-wrap: break-word;
  text-align: center;
  font-family: Georgia;
}
</style>