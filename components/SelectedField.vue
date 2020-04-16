<template>
  <div>
    <div class="selected-field-row">
      <div v-on:click="showFieldProperties" id="left-element">
        <p><span><Icon class="handle" type="md-reorder" size="18"/></span>
          <span><Icon :type="field.fieldIcon" size="18"/></span> {{field.name}}
        </p>
      </div>
      <div id="right-element">
        <p>
          <Icon class="action-icon" v-on:click="showFieldProperties" type="md-options" size="18"/>
          <Poptip
            confirm
            placement="bottom"
            width="300px"
            v-model="isDuplicatePopupShown"
            title="How many duplicates?"
            @on-ok="duplicateField"
            @on-cancel="closeDuplicatePopup">
            <Icon class="action-icon" type="md-copy" size="18"/>
          </Poptip>
          <Poptip
            confirm
            width="300px"
            placement="bottom"
            v-model="isDeletePopupShown"
            title="Are you sure you want to delete this field?"
            @on-ok="deleteField"
            @on-cancel="closeDeletePopup">
            <Icon class="delete-icon" type="md-trash" size="18"/>
          </Poptip>
        </p>
      </div>
      <div id="no-content"></div>
    </div>
    <Form class="selected-field-properties" slot="content" ref="formValidate" :model="field"
          :rules="ruleValidate" :label-width="180" v-if="isFieldPropertiesShown === true">
      <FormItem label="Name" prop="name">
        <Input v-model="field.name" placeholder="Name/Key"></Input>
      </FormItem>
      <FormItem label="Type" prop="type">
        <Input disabled v-model="field.fieldType" placeholder="Type"></Input>
      </FormItem>
      <FormItem label="Binding fields" prop="subjects">
        <Input v-model="field.subjects" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
               placeholder="(Comma separated field:data_type values e.g age:number, dob:map)"></Input>
      </FormItem>
      <FormItem label="Validation" prop="validation">
        <!--        <Input v-model="formValidate.validation" type="textarea" :autosize="{minRows: 2,maxRows: 5}"-->
        <!--               placeholder="Validation(s) performed on the field; separated by semicolon"></Input>-->
      </FormItem>
      <FormItem label="" prop="isRequired">
        <Checkbox v-model="field.isRequired">Required?</Checkbox>
      </FormItem>
      <FormItem v-if="field.isRequired === true" label="Error message" prop="errorMessage">
        <Input v-model="field.errorMessage" placeholder="Error message when value is not filled"></Input>
      </FormItem>
      <FormItem label="Other attributes" prop="subjects">
        <Collapse value="1" accordion>
          <Panel name="1">
            Field attributes
            <p slot="content">Field attributes</p>
          </Panel>
          <Panel name="2">
            Metadata
            <div slot="content">Form metadata
              <JsonPropHolder @onAddFieldProperty="onAddFieldMetadata"
                              @onDeleteFieldProperty="onDeleteFieldMetadata"></JsonPropHolder>
            </div>
          </Panel>
          <Panel name="3">
            Field Properties
            <div slot="content">Field Properties
              <JsonPropHolder @onAddFieldProperty="onAddFieldProperty"
                              @onDeleteFieldProperty="onDeleteFieldProperty"></JsonPropHolder>
            </div>
          </Panel>
          <Panel name="4">
            Field Validation
            <div slot="content">Field Validation
              <Row>
                <div v-for="(item, index) in validateArr">
                  <div> {{`condition:${item.condition}`}}</div>
                  <div> {{`message:${item.message}`}}</div>
                  <div>
                    <Poptip
                      confirm
                      width="300px"
                      v-model="isDeletePopupForValidationShown"
                      @on-ok="deleteValidation(item, index)"
                      @on-cancel="closeDeleteValidationPopup"
                      title="Are you sure you want to delete this step?"
                    >
                      <Icon class="delete-icon" type="md-trash" size="18"/>
                    </Poptip>
                  </div>
                </div>
              </Row>
              <Row>
                <Col span="7">
                  <Input placeholder="condition" v-model="validate.condition"></Input>
                </Col>
                <Col span="7">
                  <Input placeholder="message" v-model="validate.message"></Input>
                </Col>
              </Row>
              <Row>
                <Button @click="addValidationObject(validate)">Add</Button>
              </Row>
            </div>
          </Panel>
        </Collapse>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">Done</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  import JsonPropHolder from "./partial/JsonPropHolder";

  export default {
    name: "SelectedField",
    components: {JsonPropHolder},
    props: {
      fieldIndex: {
        type: Number,
        required: true
      },
      step: {
        type: Object,
        required: true
      },
      field: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        isFieldPropertiesShown: true,
        isDuplicatePopupShown: false,
        isDeletePopupShown: false,
        isDeletePopupForValidationShown: false,
        properties: [],
        property: {},
        validate: {},
        validateArr: [],
        ruleValidate: {
          name: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ]
        }
      }
    },
    watch: {
      formValidate: {
        deep: true,
        handler(v) {
          this.updateFormOutput(v)
        }
      }
    },
    methods: {
      addValidationObject(validationInput) {
        this.step.fields[this.fieldIndex].validation.push(validationInput)
        this.validateArr.push(validationInput)
        this.validate = {}
        this.updateFormOutput(JSON.parse(JSON.stringify(this.step.fields)))
      },
      deleteValidation(item, index){
        this.step.fields[this.fieldIndex].validation.splice(index, 1)
        this.updateFormOutput(JSON.parse(JSON.stringify(this.step.fields)))
      },
      onAddFieldMetadata(property) {
        this.step.fields[this.fieldIndex].metadata[property.key] = property.value
        this.updateFormOutput(JSON.parse(JSON.stringify(this.step.fields)))
      },
      onDeleteFieldMetadata(property) {
        delete this.field.metadata[property.key]
        this.updateFormOutput(JSON.parse(JSON.stringify(this.step.fields)))
      },
      onAddFieldProperty(property) {
        this.field.property[property.key] = property.value
        this.updateFormOutput(JSON.parse(JSON.stringify(this.step.fields)))
      },
      onDeleteFieldProperty(property) {
        delete this.field.property[property.key]
        this.updateFormOutput(JSON.parse(JSON.stringify(this.step.fields)))
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
        this.isFieldPropertiesShown = false
      },
      updateFormOutput(fields) {
        if (fields) {
          this.step.fields = JSON.parse(JSON.stringify(fields))
        }
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      showFieldProperties() {
        this.isFieldPropertiesShown = !this.isFieldPropertiesShown
      },
      closeDuplicatePopup() {
        this.isDuplicatePopupShown = false
      },
      closeDeletePopup() {
        this.isDeletePopupShown = false
      },
      closeDeleteValidationPopup() {
        this.isDeletePopupForValidationShown = false
      },
      deleteField() {
        this.step.fields.splice(this.fieldIndex, 1)
        this.updateFormOutput(JSON.parse(JSON.stringify(this.step.fields)))
      },
      duplicateField() {

      }
    }
  }
</script>

<style scoped>
  .selected-field-row {
    border: #cccccc solid 1px;
    padding: 8px;
  }

  .selected-field-properties {
    margin-top: 10px;
  }

  .delete-icon {
    cursor: pointer;
  }

  .delete-icon:hover {
    color: red;
  }

  .action-icon {
    cursor: pointer;
  }

  .action-icon:hover {
    color: dodgerblue;
  }


  .handle {
    cursor: move;
  }


  #left-element {
    float: left;
  }

  #left-element:hover {
    cursor: pointer;
    color: dodgerblue;
  }

  #right-element {
    float: right;
  }

  #no-content {
    clear: both;
  }
</style>
