<template>
  <div class="main">
    <div class="heading">Pay Now</div>
    <div class="main-inner">
      <div class="row">
        <div class="col-6">
          <div class="q-px-md">
            <div class="s-lbl">Order</div>
            <q-list bordered separator v-if="store.session != null">
              <template v-if="!splitMode">
                <DefaultOrder
                  v-for="i in store.session.items"
                  v-bind="i"
                  :key="i"
                ></DefaultOrder>
              </template>
              <template v-else>
                <default-split
                  v-for="(p, i) in store.session.items"
                  v-bind="p"
                  :key="p"
                  :index="i"
                  :people="users"
                />
              </template>
            </q-list>
          </div>
        </div>
        <div class="col-6">
          <div class="q-mx-md">
            <div class="s-lbl">Payment Method</div>
            <payment-method-select />
          </div>
          <div class="summary">
            <template v-if="splitMode">
              <div class="s-lbl">Splitting Among {{ users.length }} People</div>
              <q-item dense v-for="u in users" :key="u">
                <q-item-section side>
                  <img
                    class="u-ava"
                    :src="`http://localhost:3000/avatar/${u.id}`"
                  />
                </q-item-section>
                <q-item-section>
                  <div class="usr-name">{{ u.name }}</div>
                  <div class="usr-owes">Subtotal: ${{ 0 }}</div>
                </q-item-section>
              </q-item>
              <div class="q-py-md">
                <q-btn
                  class="q-mx-sm bg-black text-white"
                  @click="modal = true"
                >
                  Add User
                </q-btn>
                <q-btn class="q-mx-sm" outline @click="splitMode = false">
                  Cancel Split
                </q-btn>
              </div>
            </template>
            <div class="sum-header">
              <div class="s-lbl">Summary</div>
              <q-select
                v-if="splitMode"
                v-model="current"
                :options="users"
                map-options
                emit-value
                option-value="id"
                option-label="name"
                filled
                dense
              />
            </div>
            <template v-if="splitMode && subtotalDict[current]">
              <div
                class="s-bd"
                v-for="u in subtotalDict[current].items"
                :key="u"
              >
                <div>{{ u.name }}</div>
                <div>${{ u.price }}</div>
              </div>
            </template>
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
            <div class="q-py-md q-px-xl q-gutter-sm" v-if="!splitMode">
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
            <div class="q-py-md q-px-xl q-gutter-sm" v-else>
              <q-btn
                class="bg-dark text-white full-width"
                :ripple="{ center: true }"
                push
                label="Submit Payment"
                no-caps
              >
                <q-popup-proxy class="bg-transparent">
                  <div class="bg-dark q-py-md q-px-xl">
                    <q-btn class="bg-white text-black" @click="paySub">
                      Confirm Payment of ${{ total }}?
                    </q-btn>
                  </div>
                </q-popup-proxy>
              </q-btn>
            </div>
            <q-dialog v-model="modal">
              <q-r-scanner @user="addUser" />
            </q-dialog>
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
import QRScanner from "../components/QRScanner.vue";
import DefaultSplit from "../components/DefaultSplit.vue";
import { api } from "../boot/axios";

export default defineComponent({
  name: "BillingPage",
  setup() {
    const store = useStateStore();
    return {
      store,
    };
  },
  data() {
    return {
      current: useStateStore()._id,
      splitMode: false,
      modal: false,
      users: [
        {
          id: useStateStore()._id,
          name: `${useStateStore().firstName} ${useStateStore().lastName}`,
        },
      ],
    };
  },
  methods: {
    addUser(u) {
      if (this.users.findIndex((x) => x.id === u.id) === -1) this.users.push(u);
    },
    payFull() {
      const newPayment = {
        uid: useStateStore()._id,
        merchantId: "662460e3de20366bf9a210ca",
        type: "out",
        timestamp: new Date(),
        total: this.total,
      };
      api
        .post("/bills/insert", {
          payments: JSON.stringify([newPayment]),
        })
        .then((response) => {
          useStateStore().session.items = [];
          this.$router.push("/confirmation");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    splitCheck() {
      this.splitMode = true;
    },
    paySub() {
      if (this.subtotalDict.hasOwnProperty(undefined)) {
        this.$q.notify({
          message: "Choose who pays for every item before paying!",
          color: "dark",
        });
        return;
      }
      let payments = [];
      for (let o in this.subtotalDict) {
        payments.push({
          uid: o,
          merchantId: "662460e3de20366bf9a210ca",
          type: "out",
          timestamp: new Date(),
          total: this.subtotalDict[o].subtotal * 1.06,
        });
      }
      api
        .post("/bills/insert", {
          payments: JSON.stringify(payments),
        })
        .then((response) => {
          useStateStore().session.items = [];
          this.$router.push("/confirmation");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  computed: {
    subtotal() {
      let total = 0;
      if (this.splitMode) {
        if (this.subtotalDict[this.current] != null) {
          return (
            Math.round(this.subtotalDict[this.current].subtotal * 100) / 100
          );
        }
      } else {
        if (useStateStore().session?.items != null) {
          useStateStore().session.items.forEach((x) => {
            total += x.price * x.count;
          });
        }
      }
      return Math.round(total * 100) / 100;
    },
    total() {
      return Math.round(this.subtotal * 1.06 * 100) / 100;
    },
    subtotalDict() {
      return this.store.session.items.reduce((acc, item) => {
        if (acc[item.charge] == null)
          acc[item.charge] = { subtotal: 0, items: [] };
        acc[item.charge].subtotal += item.price;
        acc[item.charge].items.push(item);
        return acc;
      }, {});
    },
  },
  mounted() {},
  components: { DefaultOrder, PaymentMethodSelect, QRScanner, DefaultSplit },
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

.sum-header {
  display: flex;
  justify-content: space-between;
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

.u-ava {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #444;
}

.usr-name {
  font-weight: bold;
  font-size: 16px;
}

.usr-owes {
  font-weight: bold;
  color: #777;
  line-height: 1;
}
</style>
