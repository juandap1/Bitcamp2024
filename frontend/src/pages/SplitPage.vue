<template>
    <div class="main">
    <div class="heading">Pay Now</div>
    <div class="main-inner">
      <div class="row">
        <div class="col-6">
          <div class="q-px-md">
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
      </div>
    </div>
  </div>
</template>
  <script>
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "test-test",
    setup() {
      return {};
    },
    data() {
      return {};
    },
    mounted() {},
    components: {},
  });
  </script>