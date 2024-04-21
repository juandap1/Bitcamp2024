<template>
    <div class="food-item">
      <img :src="img" />
      <div class="food-name">{{ name }}</div>
      <div class="food-desc">Ingredients, more info, nutrition, etc...</div>

      <div class="food-footer">
        <div class="price">${{ price }}</div>
        <div v-if="count == 0 && !approved" class="order-btn" @click="incrementCount">
          Order Now
        </div>
        <div v-else-if="approved"  class="order-btn good">
          Good Choice!
        </div>
        <div v-else class="order-btn def">
          <q-icon class="inc-btn" @click="decrementCount" name="fas fa-minus" /> <span class="q-mx-sm">{{ count }}</span> <q-icon class="inc-btn" name="fas fa-plus" @click="incrementCount" />
        </div>
      </div>
    </div>
  </template>
  <script>
  import { defineComponent } from "vue";
import { useStateStore } from "../stores/state";

  
  export default defineComponent({
    name: "menu-item",
    props :{
        id: String,
        name: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    setup() {
      const store = useStateStore();
      return {
        store,
      };
    },
    data() {
      return {
        approved: false
      };
    },
    methods: {
    incrementCount () {
      const check = useStateStore().session.items.find((x) => x.id === this.id);
      if (check != null) {
        check.count++;
      } else {
        this.approved = true;
        setTimeout(() => {this.approved = false}, 1000);
        useStateStore().session.items.push({
          id: this.id,
          img: this.img,
          price: this.price,
          name: this.name,
          count: 1,
        })
      }
    },
    decrementCount (){
      if(this.count > 0){
        const check = useStateStore().session.items.findIndex((x) => x.id === this.id);
        if (!check == -1) return;
        if (this.count === 1) useStateStore().session.items.splice(check, 1);
        else {
          useStateStore().session.items[check].count--;
        }
      }
    }
  },
    mounted() {},
    components: {},
    computed: {
      count() {
        const check = useStateStore().session.items.find((x) => x.id === this.id);
        if (check == null) return 0
        return check.count;
      }
    }
  });
  </script>
<style scoped>
.food-item {
  display: flex;
  flex-flow: column;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid black;
  width: 200px;
}

.food-item img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin: 10px 15px;
}

.food-name {
  font-size: 18px;
  font-weight: 500;
  line-height: 1;
}

.food-desc {
  font-weight: bold;
  color: #444;
  line-height: 1;
  margin: 5px 0px;
  flex: 1 1 auto;
}

.food-footer {
  display: flex;
  justify-content: space-between;
}

.price {
  font-weight: bold;
  font-size: 18px;
}

.order-btn {
  padding: 2px 10px;
  border-radius: 50px;
  border: 2px solid black;
  white-space: nowrap;
  font-weight: bold;
  cursor: pointer;
}

.order-btn.def {
  cursor: default;
}

.order-btn.good {
  background-color: rgb(0,255,0);
}

.inc-btn {
  border-radius: 50%;
  cursor: pointer;
}
</style>