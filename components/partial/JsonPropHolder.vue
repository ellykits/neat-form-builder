<template>
  <div>
    <div v-for="(property,index) in properties" :key="index">
      <Row v-if="properties.length !== 0">
        <Col span="7">
        </Col>
        <Col span="7">
          <p>{{`${property.key}:${property.value}`}}</p>
        </Col>
        <Col span="5">
          <Button shape="circle" icon="md-trash" @click="deleteProperty(property, index)"
                  style="color: red;margin-bottom: 10px"></Button>
        </Col>
      </Row>
    </div>
    <Row>
      <Col span="5">
        <Input type="text" v-model="property.key" placeholder="Enter key"></Input>
      </Col>
      <Col span="1" offset="1">
        <div style="font-size: 20px">:</div>
      </Col>
      <Col span="5">
        <Input type="text" v-model="property.value" placeholder="Enter value"></Input>
      </Col>
      <Col span="4" offset="1">
        <Button @click="addProperty(property)">Add</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "JsonPropHolder",
    props: {
      template: Object,
    },
    data() {
      return {
        property: {},
        properties: []
      }
    },
    methods: {
      addProperty(property) {
        if (property.hasOwnProperty("key") && property.hasOwnProperty("value")) {
          this.properties.push(property)
          this.property = {}
          this.$emit('onAddFieldProperty', property)
        }
      },
      deleteProperty(property, index) {
        this.properties.splice(index, 1)
        this.$emit('onDeleteFieldProperty', property)
      },
    }
  }
</script>

<style scoped>

</style>
