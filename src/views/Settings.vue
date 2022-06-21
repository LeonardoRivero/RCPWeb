<template>
  <div>
    <v-tabs v-model="tabs" fixed-tabs>
      <v-tabs-slider></v-tabs-slider>
      <v-tab v-for="(item, index) in items" :key="index" class="primary--text">
        <v-icon>{{ item.icon }}</v-icon>
        <v-card-text>{{ item.title }}</v-card-text>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabs">
      <v-tab-item :key="1">
        <Ensurance />
      </v-tab-item>
      <v-tab-item :key="3">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos tenetur
        dicta maiores fugit voluptatem quaerat odio a enim ex consequatur
        tempore illum excepturi, sint ullam illo. Adipisci magni dicta mollitia.
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Ensurance from "@/components/Forms/Ensurance/Add";
export default {
  name: "Settings",
  components: { Ensurance },
  data() {
    return {
      tabs: null,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      items: [
        { title: "E.P.S", icon: "mdi-hospital-building" },
        { title: "Codigo Diagnostico", icon: "mdi-numeric" },
        { title: "Especialidades", icon: "mdi-account-box" },
      ],
    };
  },
};
</script>
