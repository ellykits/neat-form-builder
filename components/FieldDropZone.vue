<template>
  <div>
    <div>
      <Row style="margin-bottom: 20px">
        <Col span="7">
          <Row>
            Form Title: <Input type="text" v-model="result.form" placeholder="Enter Form title"></Input>
          </Row>
        </Col>
        <Col span="7">
        </Col>
      </Row>
    </div>
    <div v-for="(step, index) in result.steps">
      <Row>
        <Col span="7">
          <Input type="text" v-model="step.title" placeholder="Enter Step title"></Input>
        </Col>
        <Col span="7">
          <Poptip
            confirm
            width="300px"
            v-model="isDeletePopupShown"
            @on-ok="deleteStep(step, index)"
            @on-cancel="closeDeletePopup"
            title="Are you sure you want to delete this step?"
          >
            <Icon class="delete-icon" type="md-trash" size="18"/>
          </Poptip>

        </Col>
      </Row>
      <div @drop.prevent="addFieldStep($event,step)" @dragover.prevent class="field-drop-zone">
        <p class="drag-info">Drag and drop fields here</p>
        <draggable :value="step.fields"
                   ghost-class="ghost"
                   :group="{ put: false}"
                   @start="dragging = true"
                   @end="dragging = false"
                   handle=".handle"
                   :sort="true">
          <div class="list-group-item" v-for="(field, index) in step.fields" :key="index">
            <selected-field class="selected-field" :field-index="index" :field="field" :step="step"
            />
          </div>
        </draggable>
      </div>
    </div>
    <div>
      <Row>
        <Button @click="addStep">Add Step</Button>
      </Row>
    </div>
  </div>

</template>

<script>
  import SelectedField from "./SelectedField";
  import faker from 'faker'

  export default {
    name: "FieldDropZone",
    components: {SelectedField},
    data() {
      return {
        result: {form: '', rules_file: '', steps: [{title: '', fields: []}]},
        isDragTextInfoShown: true,
        isDeletePopupShown: false
      }
    },
    watch: {
      result: {
        deep: true,
        handler(newResult) {
          this.updateResult(newResult)
        }
      }
    },
    methods: {
      closeDeletePopup() {
        this.isDeletePopupShown = !this.isDeletePopupShown
      },
      updateResult(newResult) {
        if (newResult) {
          this.$store.dispatch('formOutput/updateResult', newResult)
        }
      },
      addStep() {
        this.result.steps.push({
          title: '', fields: []
        })
      },
      deleteStep(step, index) {
        this.result.steps.splice(index, 1)
      },
      addFieldStep(event, step) {
        const fieldId = faker.random.uuid();
        const fieldTypeId = event.dataTransfer.getData("fieldId");
        const fieldType = event.dataTransfer.getData("fieldType");
        const fieldIcon = event.dataTransfer.getData("fieldIcon");
        if (fieldId !== "" && fieldType !== "") {
          step.fields.push({
            fieldId, fieldType, fieldIcon, fieldTypeId, subjects: '', name: faker.hacker.noun(),
            validation: [],
            metadata: {},
            attributes: [],
            isRequired: false,
            errorMessage: '',
            property: {}
          })
          console.log("fieldId -> " + fieldId + " fieldType ->" + fieldType + " fieldIcon ->" + fieldIcon)
        }
      }
    }
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
