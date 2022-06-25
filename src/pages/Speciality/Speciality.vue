<template>
  <form>
    <v-text-field
      v-model="description"
      :error-messages="specialityErrors"
      label="Especialidad"
      required
      @input="$v.description.$touch()"
      @blur="$v.description.$touch()"
    ></v-text-field>
    <v-btn class="mr-4" @click="submit" outlined color="indigo">
      Guardar
    </v-btn>
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
      description: "",
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
      this.showLoading({ visible: false });
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
    },
  },
};
</script>