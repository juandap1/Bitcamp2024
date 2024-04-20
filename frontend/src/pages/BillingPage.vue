<template>
    <div class="main">
        <div class="heading">
            Billing
        </div>
        <div class="sub-heading">
            Payment Information
        </div>

        <div class="sub-heading">
            Bill:
        </div>

        <div class="q-pa-md" style="max-width: 350px">
            <q-list bordered separator>
                <DefaultOrder v-for="i in items" v-bind="i" :key="i"></DefaultOrder>
            </q-list>
        </div>
        <p>Subtotal: ${{ total }}</p>
        <p>Total: ${{ total*1.06 }}</p>

        <div class="q-pa-md q-gutter-sm">
            <q-btn :ripple="{ center: true }" outline push label="Pay Check" no-caps @click="payFull"/>
            <q-btn :ripple="{ center: true }" outline push label="Split Check" no-caps @click="splitCheck"/>
        </div>

        

        
    </div>
</template>
  <script>
  import { defineComponent } from "vue";
  import DefaultOrder from '../components/DefaultOrder.vue';
  
  export default defineComponent({
    name: "test-test",
    setup() {
        return {};
    },
    data() {
      return {
        items: [
            {
                name: "Calamari",
                price: 10
            },
            {
                name: "Pizza",
                price: 7
            },
            {
                name: "Cheeseburger",
                price: 12
            },
            {
                name: "Mozzarella Sticks",
                price: 8
            }
        ],
      };
    },
    methods: {
        payFull(){
            console.log('YOU ARE PAYING THE WHOLE CHECK!!');
            const total = this.total
            const confirmed = confirm('Are you sure you are ready to pay?');
            if(confirmed){
                this.$router.push('/confirmation');
            }
        },

        splitCheck(){
            console.log('YOU ARE SPLITTING THE CHECK!!!');
        },

    },
    computed:{
        total(){
            let total = 0;
            this.items.forEach(element => {
                total += element.price;
            });
            return total;
        }
    },
    mounted() {},
    components: {DefaultOrder},
  });

  </script>
<style scoped>
    .heading {
        font-size: 70px;
        color: var(--secondary);
        background-color: var(--tertiary);
        text-align: center;
    }

    .main{
        background-color: var(--primary);
        height: 100vh;
    }

    .sub-heading{
        font-size: 50px;
        color: darkslategray;
    }

    .q-btn{
        color: var(--secondary);
    }

</style>