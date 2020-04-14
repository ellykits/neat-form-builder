<template>
  <div>
    <div @drop.prevent="addFieldStep" @dragover.prevent class="field-drop-zone">
      <p v-if="generatedFormFields && generatedFormFields.length === 0" class="drag-info">Drag and drop fields here</p>
      <draggable :value="generatedFormFields"
                 ghost-class="ghost"
                 :group="{ put: false}"
                 @start="dragging = true"
                 @end="dragging = false"
                 handle=".handle"
                 :sort="true">
        <div class="list-group-item" v-for="(field, index) in generatedFormFields" :key="index">
          <selected-field class="selected-field" :field-index="index" :field="field"
          />
        </div>
      </draggable>
    </div>
  </div>

</template>

<script>
  import SelectedField from "./SelectedField";
  import faker from 'faker'

  export default {
    name: "FieldDropZone",
    components: {SelectedField},
    methods: {
      addFieldStep(event) {
        const fieldId = faker.random.uuid();
        const fieldTypeId = event.dataTransfer.getData("fieldId");
        const fieldType = event.dataTransfer.getData("fieldType");
        const fieldIcon = event.dataTransfer.getData("fieldIcon");
        if (fieldId !== "" && fieldType !== "") {
          console.log("fieldId -> " + fieldId + " fieldType ->" + fieldType + " fieldIcon ->" + fieldIcon)
          this.$store.dispatch('fieldPlayGround/addField', {
            fieldId, fieldType, fieldIcon, fieldTypeId
          })
        }
      }
    },
    data() {
      return {
        isDragTextInfoShown: true
      }
    },
    computed: {
      generatedFormFields() {
        return this.$store.state.fieldPlayGround.generatedFormFields
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
