<template >
  <v-form
    v-if="dxMainCodeForm.visible"
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-card elevation="18" class="mx-auto" outlined>
      <v-card-title>
        <v-toolbar-title>{{ dxMainCodeForm.title }}</v-toolbar-title>
      </v-card-title>
      <v-list-item three-line>
        <v-list-item-content>
          <v-text-field
            :value="dxMainCodeForm.data.CUP"
            label="Codigo Principal"
            required
            maxlength="10"
            :rules="DxMainCodeRules"
          >
          </v-text-field>
          <v-text-field
            :value="dxMainCodeForm.data.description"
            label="Descripcion Codigo Principal"
            required
            :rules="DescriptionDxMainCodeRules"
          >
          </v-text-field>
          <v-btn small @click="validate" outlined color="indigo">
            Guardar
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-form>
</template>
<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import Requests from "@/scripts/Request.js";
import Constants from "@/scripts/Constants";
export default {
  name: "DxMainCode",
  data() {
    return {
      dxMainCode: "",
      descriptionDxMainCode: "",
      request: new Requests(),
      endpoint: new Constants.EndPoints(),
      messages: new Constants.Messages(),
      valid: true,
      DxMainCodeRules: [(v) => !!v || "Codigo Principal es requerido"],
      DescriptionDxMainCodeRules: [(v) => !!v || "Descripcion es requerido"],
    };
  },
  computed: {
    ...mapGetters("settings", ["dxMainCodeForm", "specialityForm"]),
  },
  methods: {
    ...mapMutations(["showSnackbar", "showLoading"]),
    ...mapActions("settings", ["addDXMainCode", "updateDXMainCode"]),
    async validate() {
      let valid = this.$refs.form.validate();
      if (valid) {
        let speciality = this.specialityForm.data;
        if (this.dxMainCodeForm.id === null) {
          let url = this.endpoint.getORcreateCup;
          let payload = {
            CUP: this.dxMainCode.CUP,
            description: this.descriptionDxMainCode,
            speciality: speciality.id,
          };
          let dataJSON = JSON.stringify(payload);
          this.addDXMainCode(dataJSON);
          //responseAsJson = await this.request.post(url, dataJSON);
        }
        if (typeof this.dxMainCodeForm.id == "number") {
          //let url = this.endpoint.updateDxMainCode(this.specialityForm.data.id);
          let payload = {
            CUP: this.dxMainCode.CUP,
            description: this.dxMainCode.description,
            id: this.dxMainCodeForm.id,
            speciality: this.dxMainCode.speciality.id,
          };
          let dataJSON = JSON.stringify(payload);
          this.updateDXMainCode(dataJSON);
          //responseAsJson = await this.request.put(url, dataJSON);
        }
        // this.showLoading({ visible: false });
        // if (responseAsJson === undefined) {
        //   this.showSnackbar({
        //     text: this.messages.errorMessage,
        //     icon: "mdi-close-thick",
        //     color: "error",
        //   });
        //   return;
        // }
        // //await this.$store.dispatch("settings/getSpecialityList");
        // this.showSnackbar({
        //   text: this.messages.successMessage,
        //   icon: "mdi-check-bold",
        //   color: "success",
        // });
      }
    },
    // setDXMainCode($event) {
    //   this.description = $event;
    // },
  },
};
</script>