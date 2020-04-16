const state = () => ({
  result: {form: 'profile', rules_file: '', steps: [{title: '', fields: []}]}
})

const getters = {
  getResult(state) {
    return state.result
  }
}

const actions = {
  updateResult({commit}, data) {
    commit('updateResult', data)
  },
  addField({commit}, data, step) {
    commit('addField', data, step)
  }
}

const mutations = {
  updateResult(state, result) {
    state.result = JSON.parse(JSON.stringify(result))
  }
}

export {
  state, getters, actions, mutations
}
