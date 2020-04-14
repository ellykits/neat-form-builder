<template>
  <Card class="form-fields" dis-hover title="Field properties" icon="md-options" :padding="0" shadow>
    <div style="color: #7f828b">
      <pre>{{ getFormOutput}}</pre>
    </div>
  </Card>
</template>

<script>
  export default {
    name: "FieldProperties",
    computed: {
      getFormOutput() {
        return this.$store.state.formOutput.result
      }
    }
  }
</script>

<style scoped>

</style>
