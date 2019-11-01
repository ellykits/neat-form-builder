<template>
  <div>
    <div @drop.prevent="addFieldStep" @dragover.prevent class="field-drop-zone">
      <p v-if="isDragTextInfoShown" class="drag-info">Drag and drop fields here</p>
      <draggable :value="generatedFormFields"
                 ghost-class="ghost"
                 :group="{ put: false}"
                 @start="dragging = true"
                 @end="dragging = false"
                 handle=".handle"
                 :sort="true">
        <div class="list-group-item" v-for="field in generatedFormFields" :key="field.fieldId">
          <selected-field  class="selected-field" :field-id="field.fieldId" :field-type="field.fieldType"
                           :field-icon="field.fieldIcon"/>
        </div>
      </draggable>
    </div>
  </div>

</template>

<script>
    import SelectedField from "./SelectedField";

    export default {
        name: "FieldDropZone",
        components: {SelectedField},
        methods: {
            addFieldStep(event) {
                const fieldId = event.dataTransfer.getData("fieldId");
                const fieldType = event.dataTransfer.getData("fieldType");
                const fieldIcon = event.dataTransfer.getData("fieldIcon");
                if (fieldId !== "" && fieldType !== "") {
                    console.log("fieldId -> " + fieldId + " fieldType ->" + fieldType + " fieldIcon ->" + fieldIcon)
                    this.$store.commit("ADD_SELECTED_FORM_FIELD", {
                        "fieldId": fieldId,
                        "fieldType": fieldType,
                        "fieldIcon": fieldIcon
                    });
                    this.isDragTextInfoShown = this.$store.state.generatedFormFields.length === 0
                }
            }
        },
        data() {
            return {
                isDragTextInfoShown: true
            }
        },
        computed: {
            generatedFormFields: {
                get() {
                    return this.$store.state.generatedFormFields
                },
                set(value) {
                    return this.$store.commit("ADD_SELECTED_FORM_FIELD", value)
                }
            }
        },
    }
</script>

<style scoped>
  .field-drop-zone {
    border: #cccccc dashed 1px;
    margin: 8px 8px;
  }

  .drag-info {
    text-align: center;
    color: #cccccc;
    padding: 20px;
  }

  .selected-field {
    margin: 14px;
  }
</style>
