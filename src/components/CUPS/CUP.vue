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
            <v-flex xs12 sm9>
              <v-select
                v-model="dxMainCode"
                :items="dxMainCodes"
                :item-text="(item) => item.CUP + ' - ' + item.description"
                item-value="id"
                label="Seleccione Codigo Principal"
                required
                return-object
                :rules="dxMainCodeRules"
              >
                <template v-slot:append-outer>
                  <v-btn-toggle v-model="toggleCUP" rounded>
                    <v-btn color="primary" fab x-small dark class="mx-2">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn
                      color="success"
                      fab
                      x-small
                      dark
                      class="mx-2"
                      v-if="dxMainCodeId != 0"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </template>
              </v-select>
              <v-select
                v-model="relationCode"
                :items="relationCodes"
                item-value="id"
                :item-text="(item) => item.code + ' - ' + item.description"
                label="Seleccione Codigo Relacionado"
                required
                return-object
                :rules="relationCodeRules"
              >
                <template v-slot:append-outer>
                  <v-btn-toggle v-model="toggleRelationCode" rounded>
                    <v-btn color="primary" fab x-small dark class="mx-2">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn
                      color="success"
                      fab
                      x-small
                      dark
                      class="mx-2"
                      v-if="relationCodeId != 0"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </template>
              </v-select>
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
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
import Speciality from "@/pages/Speciality/Speciality";
import DxMainCode from "@/components/Forms/DxMainCode";

export default {
  components: { Speciality, DxMainCode },

  data() {
    return {
      valid: true,
      speciality: {},
      specialities: [],
      specialityId: 0,
      dxMainCode: null,
      dxMainCodes: [],
      dxMainCodeId: 0,
      relationCode: null,
      relationCodes: [],
      relationCodeId: 0,
      descriptionCUP: "",
      dataCUP: {},
      description: "",
      descriptionRelationCode: "",
      e6: 1,
      toggleSpeciality: undefined,
      toggleCUP: undefined,
      toggleRelationCode: undefined,
      relationCodeRules: [(v) => !!v || "Codigo Relacionado es requerido"],
      dxMainCodeRules: [(v) => !!v || "Codigo Principal es requerido"],
    };
  },
  computed: {
    ...mapGetters("settings", [
      "getSpecialityById",
      "getAllSpecialities",
      "getAllDXMainCode",
      "getRelationCodeByDXMainCodeId",
      "getDxMainCodeBySpecialityId",
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
      "getRelationCodeList",
      "addRelationCode",
    ]),
    ...mapState("settings", ["insuranceList"]),
    ...mapMutations("settings", [
      "toggleSpecialityForm",
      "specialityForms",
      "dxMainCodeForm",
      "toggleCUPForm",
    ]),
    reset() {
      this.$refs.form.resetValidation();
    },
    async validate() {
      let valid = this.$refs.form.validate();
      if (valid) {
        let payload = {
          description: this.descriptionRelationCode,
          code: this.relationCode,
          dxmaincode: this.dxMainCode.id,
        };
        let dataJSON = JSON.stringify(payload);
        this.addRelationCode(dataJSON);
      }
    },
  },
  watch: {
    toggleCUP(newState, oldState) {
      let payload = {};
      if (newState === 0) {
        payload = {
          data: {
            CUP: null,
            description: null,
            id: null,
            speciality: this.specialityId,
          },
          title: "Agregar Codigo Principal",
        };
      }
      if (newState === 1) {
        payload = {
          data: this.dataCUP,
          title: "Editar Codigo Principal",
        };
      }
      this.dxMainCodeForm(payload);
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
        let speciality = this.getSpecialityById(this.specialityId);
        payload = {
          data: {
            description: speciality.description,
            id: speciality.id,
          },
          title: "Editar Especialidad",
        };
      }
      this.specialityForms(payload);
      this.toggleSpecialityForm(newState);
    },
    async e6(newState, oldState) {
      if (newState === 2) {
        let speciality = this.getSpecialityById(this.specialityId);
        let payload = {
          data: {
            description: speciality.description,
            id: speciality.id,
          },
        };
        this.toggleSpecialityForm(null);
        this.specialityForms(payload);
        await this.$store.dispatch("settings/getDXMainCodeList");
        this.getRelationCodeList();
        this.dxMainCodes = await this.getDxMainCodeBySpecialityId(
          this.specialityId
        );
      }
    },
    dxMainCode(newState, oldState) {
      this.dataCUP = {
        id: newState.id,
        CUP: newState.CUP,
        description: newState.description,
        speciality: newState.speciality.id,
      };
      this.dxMainCodeId = newState.id;
      this.descriptionCUP = newState.description;
      this.relationCodes = this.getRelationCodeByDXMainCodeId(newState.id);
    },
    speciality(newState, oldState) {
      this.specialityId = newState.id;
    },
    relationCode(newState, oldState) {
      this.relationCodeId = newState.id;
    },
  },
};
</script>