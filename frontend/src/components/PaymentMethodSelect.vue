<template>
  <div>
    <payment-method-item
      selected
      v-bind="options[selected]"
      noedit
      @click="modal = true"
    />
    <q-dialog v-model="modal">
      <div class="card-dialog">
        <div class="row">
          <div class="col-6 q-pa-lg">
            <div class="p-header">
              <q-icon
                class="q-mr-xs"
                name="fas fa-credit-card"
                color="blue-grey-5"
              />
              Edit Payment Methods
            </div>
            <div class="text-blue-grey-5">
              <b>Manage your credit cards and payment options.</b>
            </div>
            <button class="btn">Add payment method</button>
          </div>
          <div class="col-6 q-pa-lg">
            <payment-method-item
              v-for="(p, i) in options"
              v-bind="p"
              :isDefault="i == 0"
              :selected="i == selected"
              :key="p"
              @click="selected = i"
              @default="setDefault(i)"
            />
          </div>
        </div>
        <div class="footer">
          <q-btn class="done-btn" v-close-popup>Done</q-btn>
        </div>
      </div>
    </q-dialog>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useStateStore } from "../stores/state";
import PaymentMethodItem from "./PaymentMethodItem.vue";

export default defineComponent({
  name: "PaymentMethodSelect",
  setup() {
    const store = useStateStore();
    return {
      options: store.paymentMethods,
    };
  },
  data() {
    return {
      modal: true,
      selected: 0,
    };
  },
  methods: {
    setDefault(ind) {
      const temp = useStateStore().paymentMethods.splice(ind, 1);
      if (this.selected == ind) this.selected = 0;
      else if (this.selected == 0) this.selected = 1;
      useStateStore().paymentMethods.unshift(temp[0]);
    },
  },
  mounted() {},
  components: { PaymentMethodItem },
});
</script>
<style scoped>
.p-m-cont {
  padding: 5px 10px;
  border-radius: 7.5px;
  border: 2px solid black;
  display: flex;
  align-items: center;
  line-height: 1.2;
  cursor: pointer;
  gap: 10px;
}

.p-m-cont img {
  width: 75px;
  height: 75px;
  object-fit: contain;
}

.card-type {
  font-weight: bold;
  font-size: 18px;
}

.card-exp {
  color: #888;
  font-weight: bold;
}

.card-dialog {
  min-width: 1000px;
  max-width: calc(100vw - 50px);
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  height: 500px;
}

.p-header {
  font-weight: bold;
  font-size: 22px;
}

.btn {
  margin: 20px 10px;
  border-radius: 5px;
  background-color: rgb(62, 62, 255);
  border: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 7.5px 50px;
  cursor: pointer;
}

.footer {
  text-align: center;
}

.done-btn {
  background-color: black;
  width: 200px;
  color: white;
}
</style>
