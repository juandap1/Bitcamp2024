<template>
  <div class="pg-cont">
    <div class="qr-cont shadow-6">
      <img
        class="logo"
        src="https://1000logos.net/wp-content/uploads/2023/09/Olive-Garden-Logo.jpg"
      />
      <div class="qr-wrap">
        <q-img :src="qrCode" />
      </div>
      <q-btn v-if="id != ''" class="q-mt-md" @click="$router.push(redir)">
        Click Instead
      </q-btn>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";
import { api } from "../boot/axios";

export default defineComponent({
  name: "MerchantQRPage",
  setup() {
    return {};
  },
  data() {
    return {
      qrCode: null,
      id: "",
    };
  },
  methods: {
    loadQr() {
      QRCode.toDataURL(`${window.location.origin}/#${this.redir}`)
        .then((url) => {
          this.qrCode = url;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    createSession() {
      api
        .post("/session/create", {
          mId: this.$route.params.id,
        })
        .then((response) => {
          if (response.status == 200) {
            this.id = response.data;
            this.loadQr();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.createSession();
  },
  components: {},
  computed: {
    redir() {
      return `/menu/${this.$route.params.id}?session=${this.id}`;
    },
  },
});
</script>
<style scoped>
.pg-cont {
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.qr-cont {
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  width: 400px;
  text-align: center;
}

.logo {
  height: 70px;
}

.qr-wrap {
  border: 2px solid black;
  padding: 5px;
  border-radius: 7.5px;
}
</style>
