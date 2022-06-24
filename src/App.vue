<template>
  <v-app>
    <v-main>
      <snackbar-store />
      <!-- <v-snackbar
        :text="text"
        :timeout="timeout"
        :top="true"
        :right="true"
        dark
        transition="scale-transition"
        v-model="snackbar"
      >
        {{ text }}
        <v-btn text dark @click.native="snackbar = false"> Close </v-btn>
      </v-snackbar> -->
      <!-- <router-view v-on:showSnackbar="showSnackbar"></router-view> -->
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import snackbarStore from "@/components/SnackbarStore";
export default {
  name: "App",
  data() {
    return {
      // snackbar: false,
      // text: "",
      // timeout: null,
      // y: null,
      // x: null,
      // mode: null,
    };
  },
  methods: {
    // showSnackbar(text, timeout = 4000, yPos = "top", xPos, mode) {
    //   this.text = text;
    //   this.timeout = timeout;
    //   this.y = yPos;
    //   this.x = xPos;
    //   this.mode = mode;
    //   this.snackbar = true;
    // },
  },
  components: {
    snackbarStore,
  },
};
</script>
