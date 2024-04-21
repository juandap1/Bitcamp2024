import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useStateStore = defineStore("state", {
  state: () => ({
    _id: "",
    firstName: "",
    lastName: "",
    loadedMerchants: {},
    defaultOverrides: null,
    session: {
      id: 13131,
      merchantId: "662460e3de20366bf9a210ca",
      items: [],
      users: [],
    },
    paymentMethods: [
      {
        cardNum: 3141,
        exp: "04/20",
        type: "Mastercard",
      },
      {
        cardNum: 4202,
        exp: "04/20",
        type: "Visa",
      },
      {
        identifier: "mhb9**@v*****n.net",
        type: "PayPal",
      },
      {
        identifier: "1234567890",
        type: "Bank",
        name: "Capitol One",
      },
    ],
    pastBills: [],
  }),
  getters: {
    loggedIn: (state) => {
      return state._id != "";
    },
  },
  actions: {
    deleteCookie(cname) {
      document.cookie =
        cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      this.$reset();
    },
    getCookie(cName) {
      const name = cName + "=";
      const cDecoded = decodeURIComponent(document.cookie); //to be careful
      const cArr = cDecoded.split("; ");
      let res;
      cArr.forEach((val) => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
      });
      return res;
    },
    setCookie(cName, cValue, expDays) {
      let date = new Date();
      date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
      const expires = "expires=" + date.toUTCString();
      document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
    },
    loadMerchant(id) {
      if (this.loadedMerchants[id] === 1) return;
      this.loadedMerchants[id] = 1;
      api
        .get("/merchant", {
          params: {
            id,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.loadedMerchants[id] = response.data;
          }
        });
    },
  },
});
