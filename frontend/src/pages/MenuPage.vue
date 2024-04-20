<template>
  <div>
    <h1> Menu </h1>

    <h2>Appetizers</h2>
    <hr>
    <div class="item-container">
      <menu-item v-for="m in items" v-bind="m" :key="m" />
    </div>
      

    <h2>Entrees</h2>
    <hr>
    <div class="item-container">
      <menu-item v-for="m in Entrees" v-bind="m" :key="m" />
    </div>

    <h2>Desserts</h2>
    <hr>
    <div class="item-container">
      <menu-item v-for="m in Desserts" v-bind="m" :key="m" />
    </div>

    <h2>Drinks</h2>
    <hr>
    <div class="item-container">
      <menu-item v-for="m in Drinks" v-bind="m" :key="m" />
    </div>
    <hr>
    <button class="submit" onclick="checkout">Check Out</button>

  </div>


</template>
<script>
import { ref } from "vue";
import { defineComponent } from "vue";
import MenuItem from "../components/MenuItem.vue"

export default defineComponent({
  name: "test-test",
  
  setup() {
    return {
    };
  },
  data() {
    return {
      list-of-items: [],
      items: [
        {
          name: "Fried Mozzarella",
          img: "https://media.olivegarden.com/en_us/images/product/Fried-Mozzarella-gv-590X365.jpg",
          price: "$8.29"
        },
        {
          name:"Calamari",
          img:"https://media.olivegarden.com/en_us/images/product/calamari-dpv-590x365.jpg",
          price: "$11.79"
        },
        {
          name:"Lasagna Fritta",
          img:"https://media.olivegarden.com/en_us/images/product/Lasagna-Fritta-gv-590x365.jpg",
          price:"$10.99"
        },
        {
          name:"Breadsticks with Dipping sauces",
          img:"https://media.olivegarden.com/en_us/images/product/Dipping-Sauce-gv-590x365.jpg",
          price:"$4.49"
        }
      ],
      Entrees: [
        {
          name:"Chicken Alfredo",
          img:"https://media.olivegarden.com/en_us/images/product/classic-chicken-alfredo-dinner-dpv-590x365.jpg",
          price:"$19.49"
        },
        {
          name:"Chicken Parmigiana",
          img:"https://media.olivegarden.com/en_us/images/product/dinner-chicken-parm-dpv-590x365.jpg",
          price:"$19.49"
        },
        {
          name:"Chicken Tortelloni Alfredo",
          img:"https://media.olivegarden.com/en_us/images/product/asiago-tortelloni-alfredo-with-grilled-chicken-gv-590x365.png",
          price:"$21.49"
        },
        {
          name:"Herb-Grilled Salmon",
          img:"https://media.olivegarden.com/en_us/images/product/HerbGrilledSalmon_v1_gv.jpg",
          price:"$20.99"
        }
      ],
      Desserts:[
        {
          name:"Chocolate Lasagna",
          img:"https://media.olivegarden.com/en_us/images/marketing/Chocolate_Lasagna_590X365.jpg",
          price:"$9.29"
        },
        {
          name:"Tiramisu",
          img:"https://media.olivegarden.com/en_us/images/marketing/Tiramisu-gv-590x365.jpg",
          price:"$8.99"
        },
        {
          name:"Strawberry Cream Cake (V)",
          img:"https://media.olivegarden.com/en_us/images/marketing/Strawberry-Cream-Cake-Updated-gv-590x365.jpg",
          price:"$9.29"
        },
        {
          name:"Sicilian Cheesecake With Strawberry Topping (V)",
          img: "https://media.olivegarden.com/en_us/images/marketing/Strawberry-Cheesecake-gv-590x365.jpg",
          price: "$8.99"
        }
      ],
      Drinks: [
        {
          name:"2-liter Soda",
          img:"https://media.olivegarden.com/en_us/images/product/d-two-liter-sodas-dpv.jpg",
          price:"$4.49"
        },
        {
          name:"Raspberry Lemonade",
          img:"https://media.olivegarden.com/en_us/images/product/d-raspberry-lemonade-dpv.JPG",
          price:"$4.29"
        },
        {
          name:"Cappucino",
          img:"https://media.olivegarden.com/en_us/images/product/d-cappuccino-with-whipped-cream-dpv.jpg",
          price:"$4.99"
        },
        {
          name:"Sweet Pink Moscato Blend Confetti",
          img:"https://media.olivegarden.com/en_us/images/product/confetti-sweet-moscato-blend-wine-dpv-590x365.jpg",
          price:"$24.00"
        }
      ]
    };
  },
  methods: {
    checkout(){

    }
  }

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