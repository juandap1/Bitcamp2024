<template>
  <div class="center-div">
    <div class="inner">
      <animated-confirmation />
      <h6>Purchase Confirmed</h6>
      <q-btn class="q-mt-md" @click="$router.push('/')">Return Home</q-btn>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import AnimatedConfirmation from "../components/AnimatedConfirmation.vue";

export default defineComponent({
  name: "test-test",
  setup() {
    return {};
  },
  data() {
    return {};
  },
  mounted() {},
  components: { AnimatedConfirmation },
});
</script>
<style scoped>
.center-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px);
}

.inner {
  text-align: center;
}

.inner h6 {
  margin: 0;
  margin-top: 15px;
  font-size: 36px;
  font-weight: bold;
}
</style>
