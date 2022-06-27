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
        <CUPs />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Ensurance from "@/components/Ensurance/Ensurance";
import CUPs from "@/components/CUPS/CUP";
export default {
  name: "Settings",
  components: { Ensurance, CUPs },
  data() {
    return {
      tabs: null,
      items: [
        { title: "Entidad", icon: "mdi-hospital-building" },
        { title: "CUPs", icon: "mdi-numeric" },
      ],
    };
  },
};
</script>
