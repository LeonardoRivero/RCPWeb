<template>
  <v-snackbar
    right
    top
    dark
    :color="getSnackbar.color"
    v-model="getSnackbar.visible"
    transition="scale-transition"
  >
    <v-icon>{{ getSnackbar.icon }}</v-icon>
    {{ getSnackbar.text }}
    <template v-slot:action="{ attrs }">
      <v-btn text color="white" v-bind="attrs" @click.native="closeSnackbar"
        >Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapMutations, mapGetters, mapState } from "vuex";
export default {
  computed: {
    // snackbar() {
    //   return this.$store.state.snackbar;
    // },
    ...mapGetters("notifications", ["getSnackbar"]),
  },
  methods: {
    ...mapMutations("notifications", ["closeSnackbar"]),
  },
};
</script>