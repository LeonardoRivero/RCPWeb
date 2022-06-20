<template>
  <div>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur labore ab
    expedita recusandae maiores iure, harum aperiam quae vel ex possimus
    repellat. Id laboriosam pariatur ea soluta corrupti omnis deserunt.
    <ValidationProvider rules="required" v-slot="{ errors }">
      <input v-model="value" type="text" />
      <span id="error">{{ errors[0] }}</span>
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  name: "AddEps",
  components: {
    ValidationProvider,
  },
};
</script>