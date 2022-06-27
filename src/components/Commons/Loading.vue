<template >
  <v-dialog v-model="loading.visible" hide-overlay persistent width="300">
    <v-card color="primary" dark>
      <v-card-text>
        Espere por favor ...
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  // name: "Loading",
  // props: {
  //   show: Boolean,
  //   default: false,
  // },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    ...mapMutations(["showLoading"]),
  },
};
</script>