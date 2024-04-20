<template>
    <q-item>
        <q-item-section>
        <q-item-label>{{ name }}</q-item-label>
        <q-item-label caption>${{ price }}</q-item-label>
        </q-item-section>
    </q-item>
</template>
  <script>
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "test-test",
    props: {
        name: String,
        price: Number
    },
    setup() {
      return {};
    },
    data() {
      return {};
    },
    mounted() {},
    components: {},
  });
  </script>