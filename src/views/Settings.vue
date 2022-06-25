<template>
  <div>
    <v-tabs v-model="tabs" fixed-tabs show-arrows>
      <v-tabs-slider></v-tabs-slider>
      <v-tab v-for="(item, index) in items" :key="index" class="primary--text">
        <v-icon>{{ item.icon }}</v-icon>
        <v-card-text>{{ item.title }}</v-card-text>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabs">
      <v-tab-item :key="0">
        <Ensurance />
      </v-tab-item>
      <v-tab-item :key="1">
        <DxMainCode />
      </v-tab-item>
      <v-tab-item :key="2">
        <Speciality />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Ensurance from "@/components/Forms/Ensurance/Ensurance";
import DxMainCode from "@/pages/DXMainCode/DxMainCode";
import Speciality from "@/pages/Speciality/Speciality";
export default {
  name: "Settings",
  components: { Ensurance, DxMainCode, Speciality },
  data() {
    return {
      tabs: null,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      items: [
        { title: "Entidad", icon: "mdi-hospital-building" },
        { title: "Codigos DX", icon: "mdi-numeric" },
        { title: "Especialidad", icon: "mdi-account-box" },
      ],
    };
  },
};
</script>
