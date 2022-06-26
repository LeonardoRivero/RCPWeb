<template>
  <v-stepper v-model="e6" vertical>
    <v-stepper-step :complete="e6 > 1" step="1">
      Selecione o agregue una especialidad
      <v-card elevation="18" class="mx-auto" max-width="344" outlined>
      </v-card>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-col cols="12" sm="12">
        <v-layout wrap>
          <v-flex xs12 sm4 class="pa-1">
            <v-text-field v-model="description" :error-messages="specialityErrors" label="Especialidad" required
              @input="$v.description.$touch()" @blur="$v.description.$touch()">
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm4 class="pa-1">
            <v-btn @click="submit" outlined color="indigo">
              Agregar
            </v-btn>
          </v-flex>
          <v-flex xs12 sm4 class="pa-1">
            <v-select v-model="select" :items="specialities" item-text="description" item-value="id"
              label="Seleccione Especialidad">
            </v-select>
          </v-flex>
        </v-layout>
      </v-col>
      <v-btn color="primary" @click="e6 = 2">
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 2" step="2">
      Configure analytics for this app
    </v-stepper-step>

    <v-stepper-content step="2">

      <v-btn color="primary" @click="e6 = 3">
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" step="3">
      Select an ad format and name ad unit
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <v-btn color="primary" @click="e6 = 4">
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step step="4">
      View setup instructions
    </v-stepper-step>
    <v-stepper-content step="4">
      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <v-btn color="primary" @click="e6 = 1">
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapMutations } from "vuex";
import Requests from "@/scripts/Request.js";
import Constants from "@/scripts/Constants";

export default {
  mixins: [validationMixin],

  validations: {
    description: { required },
  },
  data() {
    return {
      description: "",
      select: { description: 'Seleccione Especialidad', id: 0 },
      description: "",
      checkbox1: false,
      specialities: [],
      e6: 1,
      request: new Requests(),
      endpoint: new Constants.EndPoints(),
      messages: new Constants.Messages(),
    }
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
}
</script>