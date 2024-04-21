<template>
  <q-item>
    <q-item-section>
      <q-item-label>{{ name }}</q-item-label>
      <q-item-label caption>${{ price }} x {{ count }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-select
        style="min-width: 100px"
        required
        v-model="store.session.items[index].charge"
        :options="people"
        label="Charge to..."
        dense
        option-label="name"
        option-value="id"
        map-options
        emit-value
      />
    </q-item-section>
  </q-item>
</template>
<script>
import { defineComponent } from "vue";
import { useStateStore } from "../stores/state";

export default defineComponent({
  name: "test-test",
  props: {
    name: String,
    price: Number,
    count: Number,
    people: Array,
    index: Number,
  },
  setup() {
    const store = useStateStore();
    return {
      store,
    };
  },
  data() {
    return {};
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
