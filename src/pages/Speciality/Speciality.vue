<template >
  <v-form
    v-if="specialityForm.visible"
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-card elevation="18" class="mx-auto" outlined>
      <v-card-title>
        <v-toolbar-title>{{ specialityForm.title }}</v-toolbar-title>
      </v-card-title>
      <v-list-item three-line>
        <v-list-item-content>
          <v-text-field
            :value="specialityForm.data.description"
            label="Especialidad"
            required
            :rules="nameRules"
            @input="setSpeciality"
          >
          </v-text-field>
          <v-btn :disabled="!valid" @click="validate" outlined color="indigo">
            Guardar
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-form>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Speciality",

  data() {
    return {
      description: "",
      valid: true,
      nameRules: [(v) => !!v || "Especialidad es requerida"],
    };
  },
  computed: {
    ...mapGetters("settings", ["specialityForm"]),
  },
  methods: {
    ...mapActions("settings", [
      "getSpecialityList",
      "addSpeciality",
      "updateSpeciality",
    ]),
    async validate() {
      let valid = this.$refs.form.validate();
      if (valid) {
        if (this.specialityForm.data.id === null) {
          let data = {
            description: this.description,
          };
          let dataJSON = JSON.stringify(data);
          this.addSpeciality(dataJSON);
        }
        if (this.specialityForm.data.id != null) {
          let data = {
            description: this.description,
            id: this.specialityForm.data.id,
          };
          await this.updateSpeciality(data);
        }
        await this.getSpecialityList();
      }
    },
    setSpeciality($event) {
      this.description = $event;
    },
  },
};
</script>