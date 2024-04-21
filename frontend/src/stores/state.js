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
    pastBills: [
      {
        id: 1,
        merchantId: "662468dfde20366bf9a210cb",
        total: 117.28,
        type: "out",
        breakdown: [],
        timestamp: "2024-04-21T00:15:54.130Z",
      },
      {
        id: 2,
        merchantId: "662460e3de20366bf9a210ca",
        total: 34.29,
        preSpl: 138.15,
        type: "split",
        breakdown: [],
        timestamp: "2024-04-21T00:16:54.130Z",
      },
      {
        id: 3,
        merchantId: "662460e3de20366bf9a210ca",
        total: 42.0,
        type: "in",
        breakdown: [],
        timestamp: "2024-04-19T00:17:06.756Z",
      },
    ],
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
