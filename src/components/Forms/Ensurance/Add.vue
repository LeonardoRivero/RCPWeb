<template>
  <v-main :style="{ padding: 0 + 'px' }">
    <v-container>
      <v-row>
        <v-col cols="12" sm="3">
          <v-sheet rounded="lg" min-height="268">
            <form>
              <v-text-field
                v-model="nameInsurance"
                :error-messages="nameInsuranceErrors"
                label="Nombre EPS"
                required
                @input="$v.nameInsurance.$touch()"
                @blur="$v.nameInsurance.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="entityCode"
                :error-messages="entityCodeErrors"
                label="Codigo EPS"
                required
                @input="$v.entityCode.$touch()"
                @blur="$v.entityCode.$touch()"
              ></v-text-field>

              <v-btn class="mr-4" @click="submit"> submit </v-btn>
              <v-btn @click="clear"> clear </v-btn>
            </form>
          </v-sheet>
        </v-col>

        <v-col cols="12" sm="6">
          <v-sheet min-height="70vh" rounded="lg">
            <!--  -->
          </v-sheet>
        </v-col>

        <v-col cols="12" sm="3">
          <v-sheet rounded="lg" min-height="268">
            <!--  -->
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <Loading v-if="showLoading" :show="showLoading" />
  </v-main>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import Requests from "@/scripts/Request.js";
import EndPoints from "@/scripts/Constants.js";
import Loading from "@/components/Commons/Alert";

export default {
  mixins: [validationMixin],
  components: { Loading },
  validations: {
    nameInsurance: { required },
    entityCode: { required },
  },

  data() {
    return {
      nameInsurance: "",
      entityCode: "",
      request: new Requests(),
      endpoint: new EndPoints(),
      isFormValid: new Boolean(),
      showLoading: false,
    };
  },

  computed: {
    nameInsuranceErrors() {
      const errors = [];
      console.log(this.$v.nameInsurance);
      if (!this.$v.nameInsurance.$dirty) {
        this.isFormValid = true;
        return errors;
      }
      !this.$v.nameInsurance.required && errors.push("Nombre EPS es requerido");
      this.isFormValid = false;
      return errors;
    },
    entityCodeErrors() {
      const errors = [];
      console.log(this.$v.entityCode);
      if (!this.$v.entityCode.$dirty) {
        this.isFormValid = true;
        return errors;
      }
      !this.$v.entityCode.required &&
        errors.push("Codigo Entidad es requerido");
      this.isFormValid = false;
      return errors;
    },
  },

  methods: {
    async submit() {
      let r = this.$v.$touch();
      console.log("entr", this.$v.$touch());
      if (this.isFormValid) {
        let data = {
          nameInsurance: this.nameInsurance,
          entityCode: this.entityCode,
        };
        let dataJSON = JSON.stringify(data);
        let url = this.endpoint.createInsurance;

        // let responseAsJson = await this.request.post(url, dataJSON);
        // console.log(responseAsJson);
      }
      console.log("first");
      this.showLoading = true;
      setTimeout(() => (this.showLoading = false), 4000);

      // if (responseAsJson != undefined) {
      //   let result = await showMessage(
      //     "success",
      //     "Paciente Creado Correctamente"
      //   );
      //   if (result.value == true) {
      //     window.location.replace("/patient/list/");
      //   }
      // }
    },
    clear() {
      this.$v.$reset();
      this.name = "";
    },
  },
};
</script>
