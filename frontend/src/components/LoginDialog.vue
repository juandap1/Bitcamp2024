<template>
    <div class="login-dialog">
        <div class="icon">
            <img src="logo.png" />
        </div>
        <div class="welcome">Welcome back</div>
        <div class="intro">Please enter your details to sign in</div>
        <div class="q-my-md">
            <q-input class="l-inp" type="text" v-model="email" outlined dense label="Enter your email or username..." />
            <q-input  class="l-inp" type="password" v-model="psw" outlined dense label="Enter password..." />
        </div>
        <button class="btn">Login</button>
        <div class="reg-txt">
            Don't have an account yet? <span class="reg-redir">Sign Up</span>
        </div>
        <div class="close-btn" v-close-popup>
            <q-icon name="fas fa-times" />
        </div>
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
    position: relative;
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
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    margin: auto;
  }

  .icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .btn {
    background-color: var(--secondary);
    color: white;
    font-weight: bold;
    width: 50%;
    padding: 5px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: scale 0.3s;
  }

  .btn:hover, .close-btn:hover {
    scale: 1.03;
  }

  .close-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    border-radius: 50%;
    background-color: rgb(0,0,0,0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    cursor: pointer;
    font-size: 24px;
    color: #444;
    transition: scale 0.3s;
  }

  .reg-txt {
    margin-top: 20px;
    color: #555;
    font-weight: 500;
  }

  .reg-redir {
    font-weight: bold;
    color: black;
    cursor: pointer;
    font-size: 15px;
  }

  .reg-redir:hover {
    color: #555;
  }
  </style>