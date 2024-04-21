<template>
  <div class="qr-dialog">
    <template v-if="!scanning && user == null">
      <div class="qr-btn">
        <q-btn @click="startScan">
          <q-icon class="q-mr-xs" name="fas fa-qrcode" />
          Scan Friend QR Code
        </q-btn>
      </div>
      <q-btn class="bg-dark text-white q-ma-sm" v-close-popup>Done</q-btn>
    </template>
    <template v-else-if="scanning && user == null">
      <div class="r-wrapper">
        <div id="reader"></div>
      </div>
      <q-btn class="bg-dark text-white q-ma-sm" v-close-popup>Cancel</q-btn>
    </template>
    <template v-else>
      <img class="avatar" :src="`http://localhost:3000/avatar/${user.id}`" />
      <div class="desc">
        Add <b>{{ user.name }}</b> to the bill?
      </div>
      <div>
        <q-btn class="bg-dark text-white q-ma-sm" @click="accept">Yes</q-btn>
        <q-btn class="q-ma-sm" outlined @click="cancel">No</q-btn>
      </div>
    </template>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { Html5Qrcode } from "html5-qrcode";
import { useStateStore } from "../stores/state";

export default defineComponent({
  name: "QRSCanner",
  setup() {
    return {};
  },
  data() {
    return {
      scanning: false,
      html5QrCode: null,
      user: null,
    };
  },
  methods: {
    startScan() {
      this.scanning = true;
      this.$nextTick(() => {
        const qrConfig = { fps: 10, qrbox: { width: 300, height: 300 } };
        this.html5QrCode = new Html5Qrcode("reader", {});
        this.html5QrCode.start(
          { facingMode: "user" },
          qrConfig,
          this.onScanSuccess
        );
      });
    },
    onScanSuccess(decodedText, decodedResult) {
      // handle the scanned code as you like, for example:
      this.user = JSON.parse(decodedText);
      if (this.user.id == useStateStore()._id) {
        this.user = null;
        return;
      }
      this.html5QrCode.stop().then((res) => {
        this.html5QrCode.clear();
      });
    },
    cancel() {
      this.user = null;
      this.scanning = false;
    },
    accept() {
      this.$emit("user", this.user);
      this.user = null;
    },
  },
  mounted() {},
  components: {},
});
</script>
<style scoped>
.qr-dialog {
  display: flex;
  align-items: center;
  flex-flow: column;
  min-width: 600px;
  background-color: white;
  border-radius: 15px;
  padding: 20px;
}

.d-header {
  font-size: 24px;
  font-weight: bold;
  align-self: flex-start;
}

.r-wrapper {
  padding: 10px;
  border-radius: 15px;
  border: 2px solid black;
}

#reader {
  width: 450px;
  height: 450px;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: rgb(0, 0, 0, 0.2);
}

.qr-btn {
  display: flex;
  height: 200px;
  width: 300px;
  justify-content: center;
  align-items: center;
}

.desc {
  font-size: 18px;
}
</style>
