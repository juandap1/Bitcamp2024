<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="navbar">
      <q-toolbar>

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <a class="login-btn" v-if="!store.loggedIn" @click="login = true">Log In</a>
        <div v-else class="acnt">
          <div class="usr-icon">
            <img :src="`http://localhost:3000/avatar/${store._id}`" />
          </div>
          <div>
            <div class="acnt-welc">Welcome</div>
            <div class="acnt-name">{{ store.firstName }}</div>
          </div>
          <div class="prof-down">
            <q-icon name="fas fa-chevron-down" />
          </div>
      </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-dialog v-model="login">
      <login-dialog @active="login = false" />
    </q-dialog>
  </q-layout>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { useStateStore } from "src/stores/state";
import LoginDialog from '../components/LoginDialog.vue';

export default defineComponent({
  name: "test-test",
  setup() {
    const store = useStateStore();
    return {
      store
    };
  },
  data() {
    return {
      login: false
    };
  },
  mounted() {},
  components: {LoginDialog},
});
</script>
<style scoped>
.navbar {
  background-color:  rgb(0, 0, 81);
}

.login-btn {
  font-weight: bold;
  cursor: pointer;
  padding: 7.5px 25px;
  border-radius: 5px;
  margin: 0px 10px;
}

.login-btn:hover {
  background-color: rgb(255,255,255,0.2);
}

.usr-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(255,255,255,0.2);
}

.usr-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.acnt {
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 1;
  padding: 5px 10px;
  border-radius: 2.5px;
  cursor: pointer;
  transition: all 0.3s;
}

.acnt:hover {
  background-color: rgb(255,255,255,0.2);
}

.acnt:hover .prof-down {
  background-color: rgb(255,255,255,0.15);
}

.acnt-welc {
  font-size: 13px;
  font-weight: bold;
  color: #ccc;
}

.acnt-name {
  font-size: 16px;
  font-weight: 500;
}

.prof-down {
  margin-left: 5px;
  padding: 10px;
  border-radius: 50%;
  background-color: rgb(255,255,255,0.1);
}
</style>
