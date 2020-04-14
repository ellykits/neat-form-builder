<template>
  <div>
    <div class="selected-field-row">
      <div v-on:click="showFieldProperties" id="left-element">
        <p><span><Icon class="handle" type="md-reorder" size="18"/></span>
          <span><Icon :type="field.fieldIcon" size="18"/></span> {{formValidate.name}}
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
    <Form class="selected-field-properties" slot="content" ref="formValidate" :model="formValidate"
          :rules="ruleValidate" :label-width="180" v-if="isFieldPropertiesShown === true">
      <FormItem label="Name" prop="name">
        <Input v-model="formValidate.name" placeholder="Name/Key"></Input>
      </FormItem>
      <FormItem label="Type" prop="type">
        <Input disabled v-model="formValidate.fieldType" placeholder="Type"></Input>
      </FormItem>
      <FormItem label="Binding fields" prop="subjects">
        <Input v-model="formValidate.subjects" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
               placeholder="(Comma separated field:data_type values e.g age:number, dob:map)"></Input>
      </FormItem>
      <FormItem label="Validation" prop="validation">
        <Input v-model="formValidate.validation" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
               placeholder="Validation(s) performed on the field; separated by semicolon"></Input>
      </FormItem>
      <FormItem label="" prop="isRequired">
        <Checkbox v-model="formValidate.isRequired">Required?</Checkbox>
      </FormItem>
      <FormItem v-if="formValidate.isRequired === true" label="Error message" prop="errorMessage">
        <Input v-model="formValidate.errorMessage" placeholder="Error message when value is not filled"></Input>
      </FormItem>
      <FormItem label="Other attributes" prop="subjects">
        <Collapse value="1" accordion>
          <Panel name="1">
            Field attributes
            <p slot="content">Field attributes</p>
          </Panel>
          <Panel name="2">
            Metadata
            <p slot="content">Form metadata</p>
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
  import rfdc from 'rfdc'

  export default {
    name: "SelectedField",
    props: {
      fieldIndex: {
        type: Number,
        required: true
      },
      field: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        isFieldPropertiesShown: true,
        isDuplicatePopupShown: false,
        isDeletePopupShown: false,
        formValidate: {
          index: this.fieldIndex,
          name: this.field.fieldType + "_" + this.fieldIndex,
          type: this.field.fieldType,
          subjects: '',
          validation: '',
          metadata: [],
          attributes: [],
          isRequired: false,
          errorMessage: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ]
        }
      }
    },
    watch: {
      field: {
        deep: true,
        handler(v) {
          this.formValidate.name = v.fieldType + "_" + this.fieldIndex
          this.formValidate.index = this.fieldIndex
          this.formValidate.fieldType = v.fieldType
        }
      },
      formValidate: {
        deep: true,
        handler(v) {
          this.updateFormOutput(v)
        }
      }
    },
    mounted() {
      this.updateFormOutput(this.formValidate)
    },
    methods: {
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
      updateFormOutput(newFormValidate) {
        if (newFormValidate) {
          this.$store.dispatch('formOutput/updateField', newFormValidate)
          this.$store.dispatch('formOutput/updateResult', this.$store.state.fieldPlayGround.generatedFormFields)
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
      deleteField() {
        let newField = rfdc(this.field)
        newField.index = this.fieldIndex
        this.$store.dispatch('fieldPlayGround/removeField', newField)
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
