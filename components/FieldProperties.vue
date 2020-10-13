<template>
  <Row>
    <Card class="form-fields" dis-hover title="Field properties" icon="md-options" :padding="0" shadow>
      <div style="color: #7f828b;margin-left: 5px;margin-right: 5px">
        <pre>{{ getFormOutput}}</pre>
      </div>
    </Card>
    <Col span="24">
      <Row type="flex" justify="center">
        <Button icon="md-print" size="large" shape="circle" @click="downloadJsonForm(getFormOutput)"
                style="margin-top: 10px;font-size: 20px"></Button>
      </Row>
    </Col>
  </Row>
</template>

<script>
  export default {
    name: "FieldProperties",
    data() {
      return {
        unwantedFields: ['fieldId', 'FieldType', 'fieldIcon', 'fieldTypeId']
      }
    },
    computed: {
      getFormOutput() {
        return this.$store.state.formOutput.result
      }
    },
    methods: {
      downloadJsonForm(data) {
        this.cleanData(data)
        let fileName = data.form.toLowerCase()
        let contentType = 'application/json'
        let a = document.createElement("a");
        let file = new Blob([JSON.stringify(data, undefined, 2)
        ], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
      },
      cleanData(data) {
        for (let i = 0; i < data.steps.length; i++) {
          for (let j = 0; j < data.steps[i].fields.length; j++) {
            for (let k = 0; k < this.unwantedFields.length; k++) {
              delete data.steps[i].fields[j][this.unwantedFields[k]]
            }
          }
        }
      }

    }
  }
</script>

<style scoped>

</style>
