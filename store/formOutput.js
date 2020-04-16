const state = () => ({
  result: []
})

const getters = {
  getResult(state) {
    return state.result
  }
}

const actions = {
  updateField({commit}, field) {
    commit('updateField', field)
  },
  updateResult({commit}, data) {
    commit('updateResult', data)
  }
}

const mutations = {
  updateField(state, field) {
    let copyField = Object.assign({}, field)
    const item = state.result.find(item => item.fieldId === copyField.fieldId);
    if (item) {
      Object.assign(item, copyField);
    } else {
      state.result.push(copyField)
    }
  },

  updateResult(state, data) {
    if (data.length !== state.result.length) {
      for (let g = 0; g < state.result.length; g++) {
        let isFound = data.find(item => item.fieldId === state.result[g]['fieldId'])
        if (!isFound) {
          state.result.splice(g, 1)
        }

      }
    }

  }
}

export {
  state, getters, actions, mutations
}
