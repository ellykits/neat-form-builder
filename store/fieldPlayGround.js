const state = () => ({
  generatedFormFields: [],
  fieldCounter: -1
})

const getters = {
  getGeneratedFields(state) {
    return state.generatedFormFields
  }
}

const actions = {
  addField({commit}, field) {
    commit('addField', field)
  },
  removeField({commit}, field) {
    commit('removeField', field)
  }
}

const mutations = {
  addField(state, field) {
    state.fieldCounter++
    field.index = state.fieldCounter
    state.generatedFormFields.push(field)
  },
  removeField(state, field) {
    state.generatedFormFields = state.generatedFormFields.filter(function (value, index, arr) {
      return field.index !== index
    })
  }
}

export {
  state, getters, actions, mutations
}

