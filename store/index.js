export const state = () => ({
  supportedFormFields: [
    {id: 1, icon: "ios-create-outline", type: "Text input"},
    {id: 2, icon: "md-checkbox", type: "Checkbox"},
    {id: 3, icon: "md-radio-button-on", type: "Select one"},
    {id: 4, icon: "md-arrow-dropdown-circle", type: "Dropdown"},
    {id: 5, icon: "md-calendar", type: "Date field"},
    {id: 6, icon: "md-clock", type: "Time field"},
    {id: 7, icon: "md-calculator", type: "Number selector"},
    {id: 8, icon: "md-camera", type: "Image selector"},
    {id: 9, icon: "md-barcode", type: "Bar code scanner"},
    {id: 10, icon: "md-locate", type: "Location field"},
    {id: 11, icon: "md-information-circle", type: "Toaster note"}
  ],

  generatedFormFields: [],

  fieldCounter: 1
})

export const mutations = {

  ADD_SUPPORTED_FORM_FIELD(state, field) {
    state.supportedFormFields.push(field)
  },

  ADD_SELECTED_FORM_FIELD(state, field) {
    state.generatedFormFields.push(field)
  },
  INCREMENT_FIELD_COUNTER(state) {
    state.fieldCounter++
  }
}
