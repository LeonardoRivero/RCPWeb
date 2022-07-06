<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-row :justify="'space-between'">
      <v-col :key="1" cols="12" sm="8">
        <v-stepper v-model="e6" vertical>
          <v-stepper-step :complete="e6 >= 1" step="1">
            Selecione o agregue una especialidad
            <v-card elevation="18" class="mx-auto" outlined> </v-card>
          </v-stepper-step>
          <v-stepper-content step="1">
            <v-flex xs12 sm7>
              <v-select
                v-model="speciality"
                :items="getAllSpecialities"
                item-text="description"
                item-value="id"
                label="Seleccione Especialidad"
                return-object
                @change="setSpecialityId"
              >
                <template v-slot:append-outer>
                  <v-btn-toggle v-model="toggleSpeciality" rounded>
                    <v-btn color="primary" fab dark x-small class="mx-2">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn
                      color="success"
                      fab
                      x-small
                      dark
                      class="mx-2"
                      v-if="specialityId != 0"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-btn-toggle>
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
          </v-stepper-content>

          <v-stepper-step :complete="e6 >= 2" step="2">
            Ingrese Codigo Principal y Codigo Relacionado
            <v-card elevation="18" class="mx-auto" outlined> </v-card>
          </v-stepper-step>
          <v-stepper-content step="2">
            <v-flex xs12 sm7>
              <v-select
                v-model="dxMainCode"
                :items="getAllDXMainCode"
                item-text="CUT"
                item-value="id"
                label="Seleccione Codigo Principal"
                return-object
              >
                <template v-slot:append-outer>
                  <v-btn-toggle v-model="toggleCUP" rounded>
                    <v-btn color="primary" fab x-small dark class="mx-2">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn color="success" fab x-small dark class="mx-2">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </template>
              </v-select>
              <v-text-field
                v-model="relationCode"
                label="Codigo Relacionado"
                required
                :rules="relationCodeRules"
              >
              </v-text-field>
              <v-text-field
                v-model="descriptionRelationCode"
                label="Descripcion Codigo Relacionado"
                required
                :rules="descriptionRelationCodeRules"
              >
              </v-text-field>
            </v-flex>
            <v-btn text @click="e6 = 1"> Atras </v-btn>
            <v-btn color="primary" @click="validate"> Guardar </v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-col>
      <v-col cols="12" sm="4">
        <Speciality />
        <DxMainCode />
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
import Constants from "@/scripts/Constants";
import Speciality from "@/pages/Speciality/Speciality";
import DxMainCode from "@/components/Forms/DxMainCode";

export default {
  mixins: [validationMixin],
  components: { Speciality, DxMainCode },

  validations: {
    description: { required },
    relationCode: { required },
    cup: { required },
  },
  data() {
    return {
      valid: true,
      speciality: {},
      dxMainCode: {},
      cup: "",
      dxMainCodes: [],
      specialities: [],
      description: "",
      specialityId: 0,
      relationCode: "",
      descriptionRelationCode: "",
      e6: 1,
      messages: new Constants.Messages(),
      toggleSpeciality: undefined,
      toggleCUP: undefined,
      relationCodeRules: [
        (v) => !!v || "Codigo Relacionado es requerido",
        (v) =>
          (v && v.length <= 10) || "Cantidad maxima de caracteres excedida",
      ],
      descriptionRelationCodeRules: [
        (v) => !!v || "Descripcion Codigo es requerida",
      ],
    };
  },
  computed: {
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
    ...mapGetters("settings", [
      "getSpecialityById",
      "getAllSpecialities",
      "getAllDXMainCode",
    ]),
  },
  async created() {
    await this.$store.dispatch("settings/getSpecialityList");
    //await this.getSpecialityList();
    //this.specialities = await this.specialityList();
  },
  methods: {
    ...mapMutations(["showSnackbar", "showLoading", "specialityForms"]),
    ...mapActions("settings", [
      "getInsuranceList",
      "getSpecialityList",
      "getDXMainCodeList",
      "addRelationCode",
    ]),
    ...mapState("settings", ["insuranceList"]),
    ...mapMutations("settings", [
      "toggleSpecialityForm",
      "specialityForms",
      "dxMainCodeForm",
      "toggleCUPForm",
    ]),
    async getSpecialities() {
      // let url = this.endpoint.getORcreateSpeciality;
      // this.specialities = await this.request.get(url);
      // console.log(this.specialities);
      //await this.$store.dispatch("settings/getInsuranceList");
    },
    setSpecialityId(event) {
      this.specialityId = event.id;
      this.speciality = this.getSpecialityById(this.specialityId);
      let payload = {
        data: {
          description: this.speciality.description,
          id: this.speciality.id,
        },
      };
      this.specialityForms(payload);
    },
    async validate() {
      let valid = this.$refs.form.validate();
      if (valid) {
        let payload = {
          description: this.descriptionRelationCode,
          code: this.relationCode,
          dxmaincode: this.dxMainCode.id,
        };
        console.log(payload);
        let dataJSON = JSON.stringify(payload);
        //this.addRelationCode(dataJSON);
      }
    },
    editSpeciality() {
      this.speciality = this.getSpecialityById(this.specialityId);
      this.specialityForms(this.speciality);
      this.toggleSpecialityForm(this.test);
    },
    showSpeciality() {
      let newSpeciality = { description: null, id: null };
      this.specialityForms(newSpeciality);
      this.toggleSpecialityForm(this.toggleForm);
    },
  },
  watch: {
    toggleCUP(newState, oldState) {
      if (newState === 0) {
        let payload = {
          data: { description: null, id: null },
          title: "Agregar Codigo Ppal",
        };
        this.dxMainCodeForm(payload);
      }
      if (newState === 1) {
        console.log({ newState });
      }
      this.toggleCUPForm(newState);
    },
    toggleSpeciality(newState, oldState) {
      let payload = {};
      if (newState === 0) {
        payload = {
          data: { description: null, id: null },
          title: "Agregar Especialidad",
        };
      }
      if (newState === 1) {
        this.speciality = this.getSpecialityById(this.specialityId);
        payload = {
          data: {
            description: this.speciality.description,
            id: this.speciality.id,
          },
          title: "Editar Especialidad",
        };
      }
      this.specialityForms(payload);
      this.toggleSpecialityForm(newState);
    },
    async e6(newState, oldState) {
      if (newState === 2) {
        await this.$store.dispatch("settings/getDXMainCodeList");
      }
    },
  },
};
</script>