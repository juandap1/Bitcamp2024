<template>
  <div :class="'p-m' + (selected ? ' selected' : '')">
    <img :src="img" />
    <div class="fill">
      <div class="card-type">{{ lbl }}</div>
      <div class="card-exp">{{ det }}</div>
    </div>
    <template v-if="!noedit">
      <div v-if="isDefault" class="def-badge">Default</div>
      <div v-else class="def-btn" @click.stop="$emit('default')">
        Set as Default
      </div>
      <q-icon class="remove" name="fas fa-trash-alt" size="20px" />
    </template>
    <div v-else class="expand-btn">
      <q-icon name="fas fa-chevron-down" />
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PaymentMethodItem",
  props: {
    cardNum: Number,
    exp: String,
    type: String,
    selected: Boolean,
    isDefault: Boolean,
    identifier: String,
    name: String,
    noedit: Boolean,
  },
  setup() {
    return {};
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  components: {},
  computed: {
    lbl() {
      if (this.type == "Mastercard" || this.type == "Visa") {
        return `${this.type} ending ${this.cardNum}`;
      }
      return this.name ? this.name : this.type;
    },
    det() {
      if (this.type == "Mastercard" || this.type == "Visa") {
        return `Exp. date ${this.exp}`;
      }
      return (this.type == "Bank" ? "Acnt. Number: " : "") + this.identifier;
    },
    img() {
      if (this.type == "Mastercard") {
        return "https://logohistory.net/wp-content/uploads/2023/05/Mastercard-Logo.png";
      } else if (this.type == "Visa") {
        return "https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/visa-512.png";
      } else if (this.type == "PayPal") {
        return "https://cdn-icons-png.flaticon.com/512/174/174861.png";
      } else {
        return "https://www.pngall.com/wp-content/uploads/15/Capital-One-Logo-PNG-Image.png";
      }
    },
  },
});
</script>
<style scoped>
.p-m {
  padding: 5px 10px;
  border-radius: 7.5px;
  display: flex;
  align-items: center;
  line-height: 1.2;
  cursor: pointer;
  gap: 10px;
  border: 2px solid #ccc;
  margin-bottom: 5px;
}

.p-m.selected {
  border: 2px solid black;
}

.p-m img {
  width: 75px;
  height: 75px;
  object-fit: contain;
}

.card-type {
  font-weight: bold;
  font-size: 18px;
}

.card-exp {
  color: #888;
  font-weight: bold;
}

.fill {
  flex: 1 1 auto;
}

.def-badge {
  font-weight: bold;
  color: white;
  background-color: black;
  border-radius: 5px;
  padding: 2px 10px;
}

.remove {
  color: rgb(80, 74, 112);
  cursor: pointer;
}

.remove:hover {
  color: rgb(109, 102, 153);
}

.def-btn {
  font-weight: bold;
  color: rgb(41, 127, 255);
  cursor: pointer;
  white-space: nowrap;
}

.def-btn:hover {
  color: rgb(79, 149, 255);
}

.expand-btn {
  width: 30px;
  height: 30px;
  font-size: 20px;
}
</style>
