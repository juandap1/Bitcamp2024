<template>
    <div class="login-dialog">
        <template v-if="!regMode">
            <div class="icon">
                <img src="logo.png" />
            </div>
            <div class="welcome">Welcome back</div>
            <div class="intro">Please enter your details to sign in</div>
            <div class="q-my-md">
                <q-input class="l-inp" type="text" v-model="email" outlined dense label="Enter your email or username..." />
                <q-input  class="l-inp" type="password" v-model="psw" outlined dense label="Enter password..." />
            </div>
            <button class="btn" @click="login">Login</button>
            <div class="reg-txt">
                Don't have an account yet? <span class="reg-redir" @click="regMode = true">Sign Up</span>
            </div>
            <div class="close-btn" v-close-popup>
                <q-icon name="fas fa-times" />
            </div>
        </template>
        <template v-else>
            <div class="icon">
                <img src="logo.png" />
            </div>
            <div class="welcome">Welcome</div>
            <div class="intro">Please enter your details to create an account!</div>
            <div class="q-my-md">
                <q-input class="l-inp" type="email" v-model="email" outlined dense label="Enter your email..." />
                <q-input class="l-inp" type="text" v-model="username" outlined dense label="Enter your username..." />
                <q-input class="l-inp" type="text" v-model="firstName" outlined dense label="Enter your first name..." />
                <q-input class="l-inp" type="text" v-model="lastName" outlined dense label="Enter your last name..." />
                <q-input  class="l-inp" type="password" v-model="psw" outlined dense label="Enter password..." />
                <q-input  class="l-inp" type="password" v-model="confirm" outlined dense label="Confirm password..." />
            </div>
            <button class="btn" @click="register">Register</button>
            <div class="reg-txt">
                Already have an account? <span class="reg-redir" @click="regMode = false">Login</span>
            </div>
            <div class="close-btn" v-close-popup>
                <q-icon name="fas fa-times" />
            </div>
        </template>
    </div>
  </template>
  <script>
  import { defineComponent } from "vue";
  import { api } from "src/boot/axios";
import { useStateStore } from "src/stores/state";
  
  export default defineComponent({
    name: "Login-Dialog",
    setup() {
      return {};
    },
    data() {
      return {
        regMode: false,
        email: "",
        username: "",
        firstName: "",
        lastName: "",
        psw: "",
        confirm: ""
      };
    },
    methods: {
        reset() {
            this.email = "";
            this.username = "";
            this.lastName = "";
            this.firstName = "";
            this.psw = "";
            this.confirm = "";
        },
        register() {
            if (this.confirm === this.psw){
                api.post('/register', {
                    email: this.email,
                    username: this.username,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    psw: this.psw,
                }).then(function (response) {
                    if (response.status == 200) {
                        this.$q.notify({
                            message: 'Successfully Created Account!',
                            color: 'dark'
                        })
                        this.regMode = false;
                    }
                    this.reset();
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        },
        login() {
            api.get("/login", {
                params: {
                    email: this.email,
                    psw: this.psw,
                },
            }).then((response) => {
                if (response.status == 200) {
                    useStateStore().$patch(response.data);
                    this.$q.notify({
                        message: 'Successfully Logged In!',
                        color: 'dark'
                    })
                    this.$emit('active');
                }
                this.reset();
            });
        }
    },
    mounted() {
    },
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