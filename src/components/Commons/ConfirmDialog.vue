<template>
  <v-row justify="center">
    <v-dialog v-model="showConfirm" persistent max-width="350">
      <v-card>
        <v-card-title class="text-h5">
          Esta seguro de guardar los cambios?
        </v-card-title>
        <v-card-text
          >No se podran revertir los datos despues de confirmar.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Descartar
          </v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "ConfirmDialog",
  props: {
    show: Boolean,
    default: false,
  },
  data() {
    return {
      //dialog: this.show,
    };
  },
  computed: {
    ...mapState(["showConfirm"]),
  },
};
</script>