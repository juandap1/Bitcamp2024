<template>
  <div class="main-page shadow-6" v-if="store._id">
    <div class="p-title">PAYMENTS</div>
    <div class="mnth-exp">$314.15</div>
    <div class="m-exp-lbl">APRIL PAYMENTS</div>
    <div class="toolbar">
      <div class="qr-btn" @click="modal = true">
        <q-icon class="q-mr-xs" name="fas fa-qrcode" />
        My QR Code
      </div>
    </div>
    <div class="toolbar">
      <q-btn class="q-mx-md">
        <q-icon class="q-mr-sm" name="fas fa-paper-plane" size="xs" />
        Send
      </q-btn>
      <q-btn class="q-mx-md">
        <q-icon class="q-mr-sm" name="fas fa-money-check-alt" size="xs" />
        Request
      </q-btn>
    </div>
    <div v-for="d in sorted.order" class="full-width" :key="d">
      <div class="date-lbl">
        <div>{{ d }}</div>
        <div>{{ dayNet(d) }}</div>
      </div>
      <past-payment-item v-for="s in sorted[d]" v-bind="s" :key="s" />
    </div>
    <q-dialog v-model="modal" @before-show="getQr">
      <div class="qr-cont shadow-6">
        <div class="qr-wrap">
          <q-img :src="qrCode" />
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { ref, defineComponent, computed } from "vue";
import { useStateStore } from "src/stores/state";
import PastPaymentItem from "../components/PastPaymentItem.vue";
import QRCode from "qrcode";
import { api } from "../boot/axios";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const store = useStateStore();
    return {
      store,
      samples: computed(() => store.pastBills),
    };
  },
  data() {
    return {
      login: false,
      modal: false,
      qrCode: null,
    };
  },
  methods: {
    getQr() {
      QRCode.toDataURL(
        JSON.stringify({
          id: useStateStore()._id,
          name: `${useStateStore().firstName} ${useStateStore().lastName}`,
        })
      )
        .then((url) => {
          this.qrCode = url;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    loadBills() {
      api
        .get("/bills", {
          params: {
            userid: useStateStore()._id,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            useStateStore().pastBills = response.data;
          }
        });
    },
    newDay(d, d2) {
      let dt1 = new Date(d);
      let dt2 = new Date(d2);
      return (
        dt1.getMonth() !== dt2.getMonth() ||
        dt1.getDate() !== dt2.getDate() ||
        dt1.getFullYear() !== dt2.getFullYear()
      );
    },
    timestamp(d) {
      const dt = new Date(d);
      return `${dt.getFullYear()}.${dt.getMonth() + 1}.${dt.getDate()}`;
    },
    dayNet(d) {
      let bal = 0;
      this.sorted[d].forEach((x) => {
        if (x.type == "in") {
          bal += x.total;
        } else {
          bal -= x.total;
        }
      });
      return `${bal < 0 ? "-" : ""} $${Math.abs(bal)}`;
    },
  },
  mounted() {
    this.loadBills();
  },
  components: { PastPaymentItem },
  computed: {
    sorted() {
      if (this.samples == null) return [];
      let ret = this.samples.reduce((acc, item) => {
        const timestamp = this.timestamp(item.timestamp);
        if (acc["order"] == null) acc["order"] = [];
        if (!acc["order"].includes(timestamp)) acc["order"].push(timestamp);
        if (acc[timestamp] == null) acc[timestamp] = [];
        let inserted = false;
        for (let i = 0; i < acc[timestamp].length; i++) {
          if (new Date(acc[timestamp][i]) > new Date(item.timestamp)) {
            acc[timestamp].splice(i, item);
            inserted = true;
            break;
          }
        }
        if (!inserted) acc[timestamp].push(item);
        return acc;
      }, {});
      if (ret.order != null) {
        ret.order.sort((a, b) => {
          return (
            new Date(b.replace(".", "-")).getTime() -
            new Date(a.replace(".", ",")).getTime()
          );
        });
      }
      return ret;
    },
  },
});
</script>
<style scoped>
.main-page {
  background-color: white;
  width: 80vw;
  min-height: 80vh;
  margin: 50px auto;
  border-radius: 25px;
  text-align: center;
  padding: 15px 0px;
  display: flex;
  flex-flow: column;
  align-items: center;
  overflow: hidden;
}

.p-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 25px;
}

.toolbar {
  margin: 15px 0px;
}

.qr-btn {
  border: 2px solid black;
  border-radius: 10px;
  padding: 5px 25px;
  font-weight: bold;
  cursor: pointer;
}

.mnth-exp {
  font-size: 60px;
  font-weight: bold;
  color: var(--tertiary);
}

.m-exp-lbl {
  font-weight: bold;
}

.date-lbl {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #eee;
  padding: 0px 15px;
  font-weight: bold;
  color: #888;
}

.qr-cont {
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  width: 400px;
  text-align: center;
}

.qr-wrap {
  border: 2px solid black;
  padding: 5px;
  border-radius: 7.5px;
}
</style>
