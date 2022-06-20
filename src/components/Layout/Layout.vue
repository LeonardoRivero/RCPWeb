<template>
  <v-app>
    <Header />
    <Sidebar />
    <v-main>
      <router-view />
      <!-- <Footer /> -->
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer/Footer";

export default {
  name: "Layout",
  components: { Footer, Header, Sidebar },
};
</script>

