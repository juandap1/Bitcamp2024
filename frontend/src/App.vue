<template>
  <div v-if="!loading">
    <router-view />
  </div>
  <div v-else class="loading-screen">
    <div>
      <div class="loading-txt">Authenticating...</div>
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useStateStore } from "src/stores/state";
import { api } from "./boot/axios";
import { socket } from "src/boot/websocket-client";
export default defineComponent({
  name: "App",
  setup() {
    const store = useStateStore();
    return {
      store,
    };
  },
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    const cookieCheck = useStateStore().getCookie("bitcampusr");
    if (cookieCheck != null) {
      api.get(`/remember/${cookieCheck}`, {}).then((response) => {
        if (response.status == 200) {
          useStateStore().$patch(response.data);
          socket.auth = {
            userid: response.data._id,
          };
          socket.connect();
        }
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      });
    } else {
      this.loading = false;
    }
  },
  components: {},
});
</script>
<style scoped>
.loading-screen {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  width: 200px;
  padding: 15px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--tertiary);
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
  margin: auto;
}
@keyframes l3 {
  to {
    transform: rotate(1turn);
  }
}

.loading-txt {
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 25px;
  text-align: center;
  color: var(--secondary);
}
</style>
