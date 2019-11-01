<template>
  <div>
    <nav-bar/>
    <Row style="margin-top: 14px" :gutter="12">
      <Col span="4">
        <form-fields/>
      </Col>
      <Col span="12">
        <form-generator/>
      </Col>
      <Col span="8">
        <field-properties/>
      </Col>
    </Row>
  </div>
</template>

<script>
    import NavBar from "../components/NavBar"
    import FormFields from "../components/FormFields";
    import FieldProperties from "../components/FieldProperties";
    import FormGenerator from "../components/FormGenerator";

    export default {
        name: "form-builder",
        components: {FormGenerator, FieldProperties, FormFields, NavBar},
        data() {
            return {

            }
        }
    }
</script>

<style scoped>

</style>
