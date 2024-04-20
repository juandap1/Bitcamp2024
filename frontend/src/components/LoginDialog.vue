<template>
    <div class="login-dialog">
        <div class="icon">
            <img src="logo.png" />
        </div>
        <div class="welcome">Welcome back</div>
        <div class="intro">Please enter your details to sign in</div>
        <q-input class="l-inp" type="text" v-model="email" outlined dense label="Enter your email or username..." />
        <q-input  class="l-inp" type="password" v-model="psw" outlined dense label="Enter password..." />
    </div>
  </template>
  <script>
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "Login-Dialog",
    setup() {
      return {};
    },
    data() {
      return {
        email: "",
        psw: ""
      };
    },
    mounted() {},
    components: {},
  });
  </script>
  <style scoped>
  .login-dialog {
    width: 500px;
    max-width: calc(100vw - 50px);
    background-color: white;
    padding: 20px;
    text-align: center;
  }

  .welcome {
    font-size: 20px;
    font-weight: bold;
  }

  .intro {
    font-weight: bold;
    font-size: 15px;
    color: #777;
  }

  .l-inp {
    margin: 10px 0px;
  }

  .icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin: auto;
  }

  .icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  </style>