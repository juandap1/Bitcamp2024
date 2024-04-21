<template>
  <div class="menu-pg" v-if="merchant != null" :style="cssProps">
    <h1>The Comfort You Crave</h1>
    <div class="tabs-cont" v-if="merchant.categories">
      <div class="tabs-main">
        <div
          :class="'tab' + (activeSect == i ? ' active' : '')"
          v-for="(c, i) in merchant.categories"
          :key="c"
          @click="activeSect = i"
        >
          {{ c.name }}
          <div class="activeInd"></div>
        </div>
      </div>
      <div class="checkout" @click="checkout">
        <q-icon name="fas fa-shopping-cart" /> Checkout
        <span class="item-cnt">{{ itemCount }}</span>
      </div>
    </div>
    <div class="item-container">
      <menu-item
        v-for="m in merchant.categories[activeSect].items"
        v-bind="m"
        :key="m"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import MenuItem from "../components/MenuItem.vue";
import { useStateStore } from "../stores/state";

export default defineComponent({
  name: "MenuPage",
  setup() {
    const store = useStateStore();
    return {
      store,
    };
  },
  data() {
    return {
      activeSect: 0,
      loading: true,
    };
  },
  methods: {
    checkout() {
      this.$router.push("/billing");
    },
    add(e) {
      const check = useStateStore().session.items.find((x) => x.id === e.id);
      if (check != null) {
        check.count++;
      } else {
        useStateStore().session.items.push({
          ...e,
          count: 1,
        });
      }
    },
    remove(e) {
      if (e.count > 0) {
        const check = useStateStore().session.items.findIndex(
          (x) => x.id === e.id
        );
        if (!check == -1) return;
        if (e.count === 1) useStateStore().session.items.splice(check, 1);
        else {
          useStateStore().session.items[check].count--;
        }
      }
    },
  },
  mounted() {},
  components: { MenuItem },
  computed: {
    merchant() {
      const id = "662460e3de20366bf9a210ca";
      const loaded = useStateStore().loadedMerchants[id];
      if (loaded != null) {
        useStateStore().defaultOverrides = loaded.colors;
        useStateStore().defaultOverrides.logo = loaded.avatar;
        useStateStore().defaultOverrides.brand = loaded.name;
        return loaded;
      }
      useStateStore().loadMerchant(id);
      return null;
    },
    cssProps() {
      if (!this.merchant || !this.merchant.colors) return "";
      return {
        "--bg": this.merchant.colors.bg,
        "--txt": this.merchant.colors.text,
        "--acc": this.merchant.colors.accent,
      };
    },
    itemCount() {
      if (useStateStore().session == null) return 0;
      return useStateStore().session.items.reduce((acc, item) => {
        acc += item.count;
        return acc;
      }, 0);
    },
  },
});
</script>
<style scoped>
.menu-pg {
  padding: 20px;
  height: calc(100vh - 50px);
  background-color: var(--bg);
}

h1 {
  font-size: 50px;
  color: var(--txt);
}

.tabs-cont {
  display: flex;
  padding: 5px 0px;
  border-bottom: 2px solid #333;
}

.tabs-main {
  flex: 1 1 auto;
  display: flex;
}

.tab {
  padding: 5px 20px;
  font-weight: bold;
  color: #555;
  position: relative;
  cursor: pointer;
}

.tab:hover {
  color: black;
}

.activeInd {
  position: absolute;
  width: 0px;
  height: 2px;
  background-color: var(--acc);
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s;
}

.tab:hover:not(.active) .activeInd {
  width: 10px;
}

.active .activeInd {
  width: 20px;
}

.tab.active {
  color: black;
}

.item-container {
  justify-content: space-around;
  display: flex;
  padding: 20px 0px;
}

.checkout {
  border-radius: 5px;
  padding: 5px 10px;
  border: 2px solid black;
  cursor: pointer;
  font-weight: bold;
}

.item-cnt {
  background-color: var(--acc);
  border-radius: 50px;
  padding: 0px 7.5px;
  margin-left: 5px;
}

.members {
  border-radius: 5px;
  padding: 5px 10px;
  background-color: var(--txt);
  color: white;
  position: fixed;
  right: 50px;
  top: 100px;
  width: 150px;
}

.member-icon {
  display: inline-block;
  width: 10px;
  vertical-align: top;
}

.members img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #444;
}
</style>
