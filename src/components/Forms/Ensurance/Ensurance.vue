<template>
  <v-main :style="{ padding: 0 + 'px' }">
    <v-container>
      <v-row>
        <v-col sm="auto">
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

              <v-btn class="mr-4" @click="submit" outlined color="indigo">
                Guardar
              </v-btn>
            </form>
          </v-sheet>
        </v-col>

        <v-col cols="12" sm="6">
          <v-sheet min-height="70vh" rounded="lg">
            <Table />
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
    <!-- <v-snackbar
      v-model="snackbar"
      :right="true"
      :top="true"
      color="error"
      dark
      transition="scale-transition"
    >
      <v-icon>mdi-check-bold</v-icon>
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar> -->
    <Notifications />
  </v-main>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import Requests from "@/scripts/Request.js";
import Constants from "@/scripts/Constants";
import Loading from "@/components/Commons/Loading";
import Table from "@/components/Commons/Datatables";
import Notifications from "@/components/Commons/Notifications";
import { mapMutations } from "vuex";

export default {
  mixins: [validationMixin],
  components: { Loading, Table, Notifications },
  validations: {
    nameInsurance: { required },
    entityCode: { required },
  },

  data() {
    return {
      nameInsurance: "",
      entityCode: "",
      request: new Requests(),
      endpoint: new Constants.EndPoints(),
      messages: new Constants.Messages(),
      // isFormValid: new Boolean(),
      showLoading: false,
      snackbar: false,
      // text: "Datos guardados correctamente.",
      insuranceList: {},
    };
  },
  mounted() {
    //this.getInsuranceList();
  },
  computed: {
    nameInsuranceErrors() {
      const errors = [];
      if (!this.$v.nameInsurance.$dirty) {
        return errors;
      }
      !this.$v.nameInsurance.required && errors.push("Nombre EPS es requerido");
      return errors;
    },
    entityCodeErrors() {
      const errors = [];
      if (!this.$v.entityCode.$dirty) {
        return errors;
      }
      !this.$v.entityCode.required &&
        errors.push("Codigo Entidad es requerido");
      return errors;
    },
  },

  methods: {
    ...mapMutations(["showSnackbar", "closeSnackbar"]),
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.showLoading = true;
      let data = {
        nameInsurance: this.nameInsurance,
        entityCode: this.entityCode,
      };

      //this.$store.commit("handleConfirm", true);
      let dataJSON = JSON.stringify(data);
      let url = this.endpoint.getORcreateInsurance;
      let responseAsJson = await this.request.post(url, dataJSON);
      this.showLoading = false;
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
    // async getInsuranceList() {
    //   // let url = this.endpoint.getORcreateInsurance;
    //   // this.insuranceList = await this.request.get(url);
    //   // console.log(this.insuranceList);
    // },
  },
};
</script>
