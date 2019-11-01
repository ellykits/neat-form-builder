<template>
  <div :draggable="true" @dragstart="dragStart" @dragover.stop>
    <Button :icon="icon"> {{type}}</Button>
  </div>
</template>

<script>
    export default {
        name: "Field",
        props: ['id', 'type', 'icon'],
        methods: {
            dragStart(event) {
                event.dataTransfer.setData("fieldId", this.$store.state.fieldCounter)
                event.dataTransfer.setData("fieldType", this.type)
                event.dataTransfer.setData("fieldIcon", this.icon)
                this.$store.commit("INCREMENT_FIELD_COUNTER")
            }
        }
    }
</script>

<style scoped>
  button {
    text-align: left;
    width: 100%;
    padding: 12px 12px;
  }
</style>
