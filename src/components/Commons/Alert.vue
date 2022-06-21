<template >
  <v-dialog v-model="dialog" hide-overlay persistent width="300">
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
export default {
  name: "Loading",
  props: {
    show: Boolean,
  },

  data() {
    return {
      dialog: this.show,
    };
  },

  // watch: {
  //   dialog(val) {
  //     if (!val) return;

  //     setTimeout(() => (this.dialog = !this.show), 4000);
  //   },
  // },
};
</script>