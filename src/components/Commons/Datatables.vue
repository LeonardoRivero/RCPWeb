<template>
  <v-card>
    <v-card-title>
      <v-toolbar-title>Entidad</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="dataInsurance"
      sort-by="nameInsurance"
      class="elevation-1"
      :search="search"
      show-select
      :single-select="true"
    >
      <template v-slot:top>
        <!-- <v-toolbar flat> -->
        <!-- <v-toolbar-title>Entidades Prestadoras de Salud</v-toolbar-title> -->
        <v-dialog v-model="dialog" width="auto">
          <v-card width="auto">
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.nameInsurance"
                      label="Nombre E.P:S"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.entityCode"
                      label="Codigo Entidad"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancelar
              </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Guardar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- </v-toolbar> -->
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      </template>
      <template v-slot:no-data> No hay datos para mostrar </template>
      <template v-slot:no-results>
        No hay datos no coinciden con la busqueda
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import Constants from "@/scripts/Constants";
import Requests from "@/scripts/Request.js";
import { mapMutations } from "vuex";

export default {
  components: {},
  data: () => ({
    search: "",
    dialog: false,
    selected: [],
    totaldataInsurance: 0,
    dataInsurance: [],
    loading: true,
    options: {},
    formTitle: "Editar Entidad",
    headers: [
      {
        text: "Nombre Entidad",
        align: "start",
        value: "nameInsurance",
      },
      { text: "Codigo Entidad", value: "entityCode" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    endpoint: new Constants.EndPoints(),
    messages: new Constants.Messages(),
    request: new Requests(),
    editedIndex: -1,
    editedItem: {
      nameInsurance: "",
      entityCode: 0,
      id: 0,
    },
    defaultItem: {
      nameInsurance: "",
      entityCode: 0,
      id: 0,
    },
  }),
  watch: {
    dialog(val) {
      val || this.close();
    },
    selected(val) {
      console.log(val);
    },
  },
  mounted() {
    this.initialize();
  },
  methods: {
    ...mapMutations(["showSnackbar", "closeSnackbar"]),
    async initialize() {
      this.loading = true;
      let url = this.endpoint.getORcreateInsurance;
      this.dataInsurance = await this.request.get(url);
      this.totaldataInsurance = this.dataInsurance.length;
      this.loading = false;
    },

    editItem(item) {
      this.editedIndex = this.dataInsurance.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        let url = this.endpoint.updateInsurance(this.editedItem.id);
        let dataJSON = JSON.stringify(this.editedItem);
        let responseAsJson = await this.request.put(url, dataJSON);
        if (responseAsJson === undefined) {
          this.showSnackbar({
            text: this.messages.errorMessage,
            icon: "mdi-close-thick",
            color: "error",
          });
          return;
        }
        this.showSnackbar({
          text: this.messages.successMessage,
          icon: "mdi-check-bold",
          color: "success",
        });
        Object.assign(this.dataInsurance[this.editedIndex], this.editedItem);
      } else {
        this.dataInsurance.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>