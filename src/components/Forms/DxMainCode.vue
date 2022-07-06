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
            :value="dxMainCodeForm.data.description"
            label="Codigo Principal"
            required
            :rules="DxMainCodeRules"
            @input="setDXMainCode"
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
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapMutations, mapGetters, mapActions } from "vuex";
import Requests from "@/scripts/Request.js";
import Constants from "@/scripts/Constants";
export default {
  name: "DxMainCode",
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
      valid: true,
      DxMainCodeRules: [(v) => !!v || "Codigo Principal es requerido"],
    };
  },
  computed: {
    ...mapGetters("settings", ["dxMainCodeForm", "specialityForm"]),
  },
  methods: {
    ...mapMutations(["showSnackbar", "showLoading"]),
    // ...mapActions("settings", ["getSpecialityList"]),
    async validate() {
      let valid = this.$refs.form.validate();
      if (valid) {
        this.showLoading({ visible: true });
        let responseAsJson = undefined;
        let speciality = this.specialityForm.data;
        if (this.dxMainCodeForm.data.id === null) {
          let url = this.endpoint.getORcreateCup;
          let data = {
            CUT: this.description,
            especiality: speciality.id,
          };
          let dataJSON = JSON.stringify(data);
          responseAsJson = await this.request.post(url, dataJSON);
        }
        if (typeof this.specialityForm.data.id == "number") {
          let url = this.endpoint.updateSpeciality(this.specialityForm.data.id);
          let data = {
            description: this.description,
            id: this.specialityForm.data.id,
          };
          let dataJSON = JSON.stringify(data);
          responseAsJson = await this.request.put(url, dataJSON);
          console.log(responseAsJson);
        }
        this.showLoading({ visible: false });
        if (responseAsJson === undefined) {
          this.showSnackbar({
            text: this.messages.errorMessage,
            icon: "mdi-close-thick",
            color: "error",
          });
          return;
        }
        //await this.$store.dispatch("settings/getSpecialityList");
        this.showSnackbar({
          text: this.messages.successMessage,
          icon: "mdi-check-bold",
          color: "success",
        });
      }
    },
    setDXMainCode($event) {
      this.description = $event;
    },
  },
};
</script>