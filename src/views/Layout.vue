<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <Sidebar />
    </v-navigation-drawer>
    <v-app-bar app color="#093c6e" class="main-header" fixed dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"> </v-app-bar-nav-icon>
      <v-toolbar-title>Registro Clinico de Pacientes</v-toolbar-title>
      <v-spacer></v-spacer>
      <Search />
      <Header />
    </v-app-bar>
    <v-container>
      <router-view />
    </v-container>
    <v-footer>
      <Footer />
    </v-footer>
  </v-app>
</template>

<script>
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer/Footer";
import Search from "@/components/Search/Search";
import "@/components/Layout/Layout.scss";
import Patient from "@/views/Patient";

export default {
  name: "Layout",
  components: { Footer, Header, Sidebar, Search, Patient },
  data: () => ({ drawer: null }),
};
</script>

