<template>
  <div class="main">
    <div class="heading">Split Bill</div>
    <div class="main-inner">
      <div class="row">
        <div class="col-6">
          <div class="q-px-md">
            <div class="s-lbl">Order</div>
            <q-list bordered separator v-if="store.session != null">
              <DefaultSplit
                v-for="i in store.session.items"
                v-bind="i"
                :key="i"
              ></DefaultSplit>
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
              <div>${{ subtotal }}</div>
            </div>
            <div class="s-bd">
              <div>Tax</div>
              <div>${{ Math.round(subtotal * 0.06 * 100) / 100 }}</div>
            </div>
            <hr />
            <div class="s-bd lg">
              <div>Total</div>
              <div>${{ total }}</div>
            </div>
            <hr />
            <div class="q-py-md q-px-xl q-gutter-sm">
              <q-btn
                class="bg-dark text-white full-width"
                :ripple="{ center: true }"
                push
                label="Pay Full"
                no-caps
              >
                <q-popup-proxy class="bg-transparent">
                  <div class="bg-dark q-py-md q-px-xl">
                    <q-btn class="bg-white text-black" @click="payFull">
                      Confirm Payment of ${{ total }}?
                    </q-btn>
                  </div>
                </q-popup-proxy>
              </q-btn>
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

        <q-btn
          class="full-width"
          :ripple="{ center: true }"
          outline
          push
          no-caps
          label="Done"
          @click="doneSplit"
        >
        </q-btn>
        <q-popup-proxy class="bg-transparent">
          <div class="bg-dark q-py-md q-px-xl">
            <q-btn class="bg-white text-black" @click="payFull">
              Confirm Payment of ${{ total }}?
            </q-btn>
          </div>
        </q-popup-proxy>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import DefaultSplit from "../components/DefaultSplit.vue";
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
    doneSplit() {},
  },
  computed: {
    subtotal() {
      let total = 0;
      if (useStateStore().session?.items != null) {
        useStateStore().session.items.forEach((x) => {
          total += x.price * x.count;
        });
      }
      return total;
    },
    total() {
      return Math.round(this.subtotal * 1.06 * 100) / 100;
    },
  },
  mounted() {},
  components: {},
});
</script>
