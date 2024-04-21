<template>
    <div class="payment-item">
        <div class="recipient-inf">
            <div class="logo-icon shadow-6">
                <img :src="merchant?.avatar" />
                <div class="type-ind">
                    <q-icon :name="icons[type]" />
                </div>
            </div>
            <div style="align-self: center;">
                <div class="recipient">{{ merchant?.name }}</div>
                <div class="r-dets">Direct Payment</div>
            </div>
        </div>
        <div class="exch-val">{{type === 'in' ? '' : '-'}}${{ total }}</div>
    </div>
  </template>
  <script>
  import { defineComponent } from "vue";
import { useStateStore } from "../stores/state";
  
  export default defineComponent({
    name: "past-payment-item",
    props: {
        merchantId: String,
        total: Number,
        type: String,
        breakdown: Array,
        timestamp: String,
    },
    setup() {
      return {
        icons: {
            in: "fas fa-arrow-left",
            out: "fas fa-arrow-right",
            split: "img:split.svg"
        }
      };
    },
    data() {
      return {};
    },
    mounted() {},
    components: {},
    computed: {
        merchant() {
            const loaded = useStateStore().loadedMerchants[this.merchantId];
            if (loaded != null) return loaded
            useStateStore().loadMerchant(this.merchantId);
            return null
        }
    }
  });
  </script>
  <style scoped>
    .recipient-inf {
        display: flex;
        gap: 10px;
        text-align: left;
        line-height: 1;
    }

    .payment-item {
        display: flex;
        width: 100%;
        padding: 10px 20px;
        gap: 10px;
        justify-content: space-between;
        border-bottom: 2px solid #ccc;
        cursor: pointer;
        transition: all 0.3s;
    }

    .payment-item:hover {
        background-color: rgb(0,0,0,0.1)
    }

    .logo-icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 4px solid white;
        position: relative;
    }

    .logo-icon img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }

    .recipient {
        font-weight: bold;
        font-size: 20px;
        color: #222;
    }

    .exch-val {
        font-weight: bold;
        font-size: 16px;
    }

    .r-dets {
        font-weight: bold;
        color: #aaa;
    }

    .type-ind {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: -5px;
        right: -5px;
        width: 18px;
        height: 18px;
        border-radius: 2.5px;
        background-color: var(--tertiary);
        font-size: 11px;
        color: white;
    }
  </style>