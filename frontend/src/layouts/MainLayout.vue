<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="navbar">
      <q-toolbar>

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <a class="login-btn" v-if="!store.loggedIn">Log In</a>
        <div v-else></div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { useStateStore } from "src/stores/state";

export default defineComponent({
  name: "test-test",
  setup() {
    const store = useStateStore();
    return {
      store
    };
  },
  data() {
    return {};
  },
  mounted() {},
  components: {},
});
</script>
<style scoped>
.navbar {
  background-color:  rgb(0, 0, 81);
}

.login-btn {
  font-weight: bold;
  cursor: pointer;
  padding: 5px 15px;
  border-radius: 5px;
}

.login-btn:hover {
  background-color: rgb(255,255,255,0.1);
}
</style>
