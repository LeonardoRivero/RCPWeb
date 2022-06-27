<template>
  <v-row :justify="'space-between'">
    <v-col :key="1" cols="12" sm="8">
      <v-stepper v-model="e6" vertical>
        <v-stepper-step :complete="e6 >= 1" step="1">
          Selecione o agregue una especialidad
          <v-card elevation="18" class="mx-auto" max-width="344" outlined>
          </v-card>
        </v-stepper-step>
        <v-stepper-content step="1">
          <v-flex xs12 sm7>
            <v-select
              v-model="speciality"
              :items="specialities"
              item-text="description"
              item-value="id"
              label="Seleccione Especialidad"
              return-object
              @change="setSpecialityId"
            >
              <template v-slot:append-outer>
                <v-btn
                  color="primary"
                  fab
                  x-small
                  dark
                  class="mx-2"
                  @click="showSpeciality"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>

                <v-btn
                  color="success"
                  fab
                  x-small
                  dark
                  class="mx-2"
                  :disabled="specialityId == 0"
                  @click="editSpeciality"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
            </v-select>
            <v-btn
              color="primary"
              @click="e6 = 2"
              :disabled="specialityId == 0"
            >
              Continue
            </v-btn>
          </v-flex>
          <!-- <v-flex xs12 sm4 class="pa-1">
                <v-text-field
                  v-model="description"
                  :error-messages="specialityErrors"
                  label="Especialidad"
                  required
                  @input="$v.description.$touch()"
                  @blur="$v.description.$touch()"
                >
                </v-text-field>
                <v-btn small @click="submitSpeciality" outlined color="indigo">
                  Guardar
                </v-btn>
                </v-flex> -->
          <!-- </v-col> -->
        </v-stepper-content>

        <v-stepper-step :complete="e6 >= 2" step="2">
          Ingrese Codigo Principal y Codigo Relacionado
        </v-stepper-step>
        <v-stepper-content step="2">
          <v-layout>
            <v-flex xs12 sm6 class="pa-1">
              <v-select
                v-model="dxMainCode"
                :items="dxMainCodes"
                item-text="CUT"
                item-value="id"
                label="Seleccione Codigo Principal"
                return-object
                @change="setDxMainCodeId"
              >
                <template v-slot:append-outer>
                  <v-btn color="primary" fab x-small dark class="mx-2">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>

                  <v-btn color="success" fab x-small dark class="mx-2">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
              </v-select>
              <v-text-field
                v-model="relationCode"
                :error-messages="relationCodeErrors"
                label="Codigo Relacionado"
                required
                @input="$v.relationCode.$touch()"
                @blur="$v.relationCode.$touch()"
              >
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm4 class="pa-1">
              <v-text-field
                v-model="cup"
                :error-messages="cupErrors"
                label="Codigo Principal"
                required
                @input="$v.cup.$touch()"
                @blur="$v.cup.$touch()"
              >
              </v-text-field>
              <v-btn small @click="submitCup" outlined color="indigo">
                Guardar
              </v-btn>
            </v-flex>
          </v-layout>

          <v-btn text @click="e6 = 1"> Atras </v-btn>
          <v-btn color="primary"> Guardar </v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-col>
    <v-col cols="12" sm="4">
      <Speciality />
    </v-col>
  </v-row>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapMutations, mapState } from "vuex";
import Requests from "@/scripts/Request.js";
import Constants from "@/scripts/Constants";
import Speciality from "@/pages/Speciality/Speciality";
import FloatButton from "@/components/Commons/FloatsButton";

export default {
  mixins: [validationMixin],
  components: { Speciality, FloatButton },

  validations: {
    description: { required },
    relationCode: { required },
    cup: { required },
  },
  data() {
    return {
      speciality: { description: "Seleccione Especialidad", id: 0 },
      toggleSpeciality: false,
      dxMainCode: "",
      cup: "",
      dxMainCodes: [],
      description: "",
      specialityId: 0,
      dxMainCodeId: "",
      specialities: [],
      relationCode: "",
      e6: 1,
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
    cupErrors() {
      const errors = [];
      if (!this.$v.cup.$dirty) return errors;
      !this.$v.cup.required && errors.push("Codigo Principal es requerido.");
      return errors;
    },
    relationCodeErrors() {
      const errors = [];
      if (!this.$v.relationCode.$dirty) return errors;
      !this.$v.relationCode.required &&
        errors.push("Codigo Relacionado es requerido.");
      return errors;
    },
  },
  mounted() {
    this.getSpecialities();
    // this.$store.dispatch("increment");
  },
  methods: {
    ...mapMutations([
      "showSnackbar",
      "closeSnackbar",
      "showLoading",
      "addSpeciality",
    ]),
    async submitSpeciality() {
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
    async submitCup() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.showLoading({ visible: true });
      let data = {
        CUT: this.cup,
        especiality: this.specialityId,
      };
      let dataJSON = JSON.stringify(data);
      let url = this.endpoint.getORcreateCup;
      let responseAsJson = await this.request.post(url, dataJSON);
      console.log(responseAsJson);
    },
    async getSpecialities() {
      let url = this.endpoint.getORcreateSpeciality;
      this.specialities = await this.request.get(url);
      console.log(this.specialities);
    },
    setSpecialityId(event) {
      this.specialityId = event.id;
    },
    setDxMainCodeId(event) {
      this.dxMainCodeId = event.id;
    },
    showSpeciality() {
      if (this.toggleSpeciality) {
        this.addSpeciality({ visible: false });
        this.toggleSpeciality = false;
        return;
      }
      this.addSpeciality({ visible: true });
      this.toggleSpeciality = true;
    },
    editSpeciality() {
      let insuranceList = this.$store.state.insuranceList;
      console.log(insuranceList[this.specialityId]);
    },
  },
};
</script>