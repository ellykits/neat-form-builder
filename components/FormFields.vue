<template>
  <Card class="form-fields" dis-hover title="Supported fields" icon="ios-paper" :padding="0" shadow>
    <ButtonGroup class="button-group" v-for="field in fieldsList" :key="field.id">
      <field :id="field.id" :type="field.type" :icon="field.icon"/>
    </ButtonGroup>
  </Card>
</template>

<script>

    import Field from "./Field";

    export default {
        name: "FormFields",
        components: {Field},
        computed: {
            fieldsList: {
                get() {
                    return this.$store.state.supportedFormFields
                }
            },

        }
    }
</script>

<style scoped>

  .form-fields {
    padding: 10px;
    height: 100%;
  }

</style>
