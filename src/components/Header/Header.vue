<template>
  <v-menu min-width="180" offset-y bottom left nudge-bottom="10">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mr-0" icon v-bind="attrs" v-on="on">
        <v-icon style="font-size: 28px" :color="config.light.iconColor">
          mdi-account
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <div class="text-h5 grey--text text--darken-3 px-4 pt-4">
        Milena Rojas
      </div>
      <div class="subtitle-2 primary--text font-weight-regular px-4">
        MilenaRojas.com
      </div>
      <v-list-item-group color="primary">
        <v-list-item v-for="(item, i) in account" :key="i">
          <v-list-item-icon class="mr-4">
            <v-icon :color="item.color" v-text="item.icon"> </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              :color="config.light.textColor"
              v-text="item.text"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
import config from "@/config";
export default {
  name: "Header",
  data: () => ({
    config,
    searchCollapse: true,
    account: [
      { text: "Perfil", icon: "mdi-account", color: "textColor" },
      { text: "Tareas", icon: "mdi-thumb-up", color: "textColor" },
      { text: "Mensajes", icon: "mdi-flag", color: "textColor" },
    ],
  }),
};
</script>

<style src="./Header.scss" lang="scss"></style>
