<template>
    <q-item>
        <q-item-section>
          <q-item-label>{{ name }}</q-item-label>
          <q-item-label caption>${{ price }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <div class="cnt-nmb">{{ count }}</div>
        </q-item-section>
        <q-select
        required
        v-model="single"
        multiple
        :options="people"
        label="splits"
        />
    </q-item>
</template>
  <script>
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "test-test",
    props: {
        name: String,
        price: Number,
        count: Number
    },
    setup() {
      return {};
    },
    data() {
      return {
        people: ["You", "Guest1","Guest2"]
      };
    },
    mounted() {},
    components: {},
  });
  </script>
  <style scoped>
  .cnt-nmb {
    padding: 2.5px;
    border-radius: 2.5px;
    background-color: #222;
    color: white;
    line-height: 1;
  }
  </style>