<template>
  <Card class="form-fields" dis-hover title="Drag and drop section" shadow>
    <field-drop-zone/>
  </Card>
</template>

<script>
    import FieldDropZone from "./FieldDropZone";
    export default {
        name: "FormGenerator",
        components: {FieldDropZone}
    }
</script>

<style scoped>

</style>
