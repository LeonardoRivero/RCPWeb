<template>
  <v-snackbar
    :timeout="snackbar.timeout"
    right
    top
    dark
    :color="snackbar.color"
    v-model="snackbar.visible"
    transition="scale-transition"
  >
    <v-icon>{{ snackbar.icon }}</v-icon>
    {{ snackbar.text }}
    <template v-slot:action="{ attrs }">
      <v-btn text color="white" v-bind="attrs" @click.native="closeSnackbar"
        >Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  computed: {
    snackbar() {
      return this.$store.state.snackbar;
    },
  },
  methods: {
    ...mapMutations(["closeSnackbar"]),
  },
};
</script>