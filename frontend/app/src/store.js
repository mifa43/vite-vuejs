// store.js
import { createStore } from 'vuex';


const store = createStore({
  // State je objekat koje ce da se cuva u nasem store, radimo deklaraciju tipa podatka npr. str list json...
  state: {
    component1Data: {
      UserFirstName: '',
      UserLastName: '',
      UserNumber: '',
      title: '',
      description: '',
    },
    component2Data: {
      links: '',
      about: '',
    },
    component3Data: {
      tagsInput: [],
    },
  },
  // Mutations je kao event ali takodje sadrzi handelr, omogucava nam da manipulismo sa podatcima deklarisanim u State
  mutations: {
    updateComponent1Data(state, newData) {
      state.component1Data = newData;
    },
    updateComponent2Data(state, newData) {
      state.component2Data = newData;
    },
    updateComponent3Data(state, newTags) {
      state.component3Data.tagsInput = newTags.tagsInput;
    },
  },
});


export default store;
