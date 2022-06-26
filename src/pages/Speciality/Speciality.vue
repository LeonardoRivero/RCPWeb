<template>
  <form>
    <v-row no-gutters>
      <v-col :key="1" cols="12" sm="3">
        <v-card elevation="18" class="mx-auto" max-width="344" outlined>
          <v-card-title>
            <v-toolbar-title>Agregar Especialidad</v-toolbar-title>
          </v-card-title>
          <v-list-item three-line>
            <v-list-item-content>
              <v-text-field v-model="description" :error-messages="specialityErrors" label="Especialidad" required
                @input="$v.description.$touch()" @blur="$v.description.$touch()">
              </v-text-field>
              <v-btn @click="submit" outlined color="indigo">
                Guardar
              </v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-select v-model="select" :items="specialities" item-text="description" item-value="id"
          label="Seleccione Especialidad">
        </v-select>
      </v-col>
      <v-checkbox v-model="checkbox1" :label="'Agregar'"></v-checkbox>

    </v-row>
  </form>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapMutations } from "vuex";
import Requests from "@/scripts/Request.js";
import Constants from "@/scripts/Constants";

export default {
  name: "Speciality",
  mixins: [validationMixin],

  validations: {
    description: { required },
  },
  data() {
    return {
      select: { description: 'Seleccione Especialidad', id: 0 },
      description: "",
      checkbox1: false,
      specialities: [],
      request: new Requests(),
      endpoint: new Constants.EndPoints(),
      messages: new Constants.Messages(),
    };
  },

  computed: {
    specialityErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.required &&
        errors.push("Especialidad es requerida.");
      return errors;
    },
  },
  mounted() {
    this.getSpecialities()
  },
  methods: {
    ...mapMutations(["showSnackbar", "closeSnackbar", "showLoading"]),
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.showLoading({ visible: true });
      let data = {
        description: this.description,
      };
      let dataJSON = JSON.stringify(data);
      let url = this.endpoint.getORcreateSpeciality;
      let responseAsJson = await this.request.post(url, dataJSON);
      console.log(responseAsJson);
      this.showLoading({ visible: false });
      if (responseAsJson === undefined) {
        this.showSnackbar({
          text: this.messages.errorMessage,
          icon: "mdi-close-thick",
          color: "error",
        });
        return;
      }
      this.specialities = responseAsJson;
      this.showSnackbar({
        text: this.messages.successMessage,
        icon: "mdi-check-bold",
        color: "success",
      });
    },
    async getSpecialities() {
      let url = this.endpoint.getORcreateSpeciality;
      this.specialities = await this.request.get(url);
      console.log(this.specialities);
    }
  },
};
</script>