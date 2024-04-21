<template>
  <div class="main">
    <div class="heading">Pay Now</div>
    <div class="main-inner">
      <div class="row">
        <div class="col-6">
          <div class="q-px-md q-py-lg">
            <div class="s-lbl">Order</div>
            <q-list bordered separator v-if="store.session != null">
              <DefaultOrder
                v-for="i in store.session.items"
                v-bind="i"
                :key="i"
              ></DefaultOrder>
            </q-list>
          </div>
        </div>
        <div class="col-6">
          <div class="q-mx-md">
            <div class="s-lbl">Payment Method</div>
            <payment-method-select />
          </div>
          <div class="summary">
            <div class="s-lbl">Summary</div>
            <div class="s-bd">
              <div>Subtotal</div>
              <div>${{ total }}</div>
            </div>
            <div class="s-bd">
              <div>Tax</div>
              <div>${{ total * 0.06 }}</div>
            </div>
            <hr />
            <div class="s-bd lg">
              <div>Total</div>
              <div>${{ total * 0.06 }}</div>
            </div>
            <hr />
            <div class="q-py-md q-px-xl q-gutter-sm">
              <q-btn
                class="bg-dark text-white full-width"
                :ripple="{ center: true }"
                push
                label="Pay Full"
                no-caps
                @click="payFull"
              />
              <q-btn
                class="full-width"
                :ripple="{ center: true }"
                outline
                push
                label="Split Check"
                no-caps
                @click="splitCheck"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import DefaultOrder from "../components/DefaultOrder.vue";
import { useStateStore } from "src/stores/state";
import PaymentMethodSelect from "../components/PaymentMethodSelect.vue";

export default defineComponent({
  name: "test-test",
  setup() {
    const store = useStateStore();
    return {
      store,
    };
  },
  data() {
    return {};
  },
  methods: {
    payFull() {
      console.log("YOU ARE PAYING THE WHOLE CHECK!!");
      const total = this.total;
      const confirmed = confirm("Are you sure you are ready to pay?");
      if (confirmed) {
        this.$router.push("/confirmation");
      }
    },

    splitCheck() {
      console.log("YOU ARE SPLITTING THE CHECK!!!");
    },
  },
  computed: {
    total() {
      let total = 0;

      return total;
    },
  },
  mounted() {},
  components: { DefaultOrder, PaymentMethodSelect },
});
</script>
<style scoped>
.heading {
  font-size: 40px;
  color: var(--secondary);
  background-color: var(--tertiary);
  text-align: center;
  margin-bottom: 25px;
  font-weight: 500;
}

.main {
  background-color: var(--primary);
  height: calc(100vh - 50px);
}

.q-btn {
  color: var(--secondary);
}

.main-inner {
  max-width: 1000px;
  margin: auto;
}

.summary {
  margin: 16px;
  padding: 10px;
  border-radius: 10px;
  background-color: rgb(0, 0, 0, 0.05);
}

.s-lbl {
  font-size: 22px;
}

.s-bd {
  display: flex;
  justify-content: space-between;
  padding: 2px 0px;
}

.s-bd.lg {
  font-size: 18px;
}

hr {
  border-top: 1px solid #aaa;
  border-radius: 5px;
}
</style>
