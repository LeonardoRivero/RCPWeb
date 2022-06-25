<template>
  <v-app>
    <v-main>
      <snackbar-store />
      <loading-store />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import snackbarStore from "@/components/SnackbarStore";
import loadingStore from "@/components/Commons/Loading";
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {},
  components: {
    snackbarStore,
    loadingStore,
  },
};
</script>
