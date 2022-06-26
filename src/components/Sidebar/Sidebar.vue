<template>
  <div>
    <h3>R.C.P</h3>
    <v-divider></v-divider>
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>Username</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item-group>
      <v-list-item v-for="(item, index) in items" :key="index" link :to="item.link">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      items: [
        { title: "Inicio", icon: "mdi-home", link: "/patientcreate" },
        { title: "Pacientes", icon: "mdi-human-wheelchair", link: "/test" },
        { title: "Citas", icon: "mdi-calendar-clock", link: "/create" },
        { title: "Configuracion", icon: "mdi-cog", link: "/settings" },
      ],
    };
  },
  computed: {
    ...mapState({
      drawer: (state) => state.drawer,
    }),
  },
};
</script>
<!-- gineco mujer embaradzada
peditaria bebe
cardiologia corazon
ortopedia injury
reumatologia manos multiples
odontologia mdi tooth
inmunologia jeringa
oftamologia ojo
internista mdi medical bag -->