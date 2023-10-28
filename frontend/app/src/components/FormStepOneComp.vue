<template>
  <div class="wrapper">
    <form>
      <div class="form-row">
        <div class="col">
          <label for="firstName">First name</label>
          <input type="text" 
            id="firstName" 
            name="firstName" 
            v-model="component1Data.UserFirstName" 
            @input="updateComponent1Data" 
            class="form-control input-step-one" 
            :placeholder="[[$store.state.component1Data.UserFirstName]]">
        </div>
        <div class="col">
          <label for="lastName">Last name</label>
          <input type="text" 
            id="lastName" 
            name="lastName" 
            v-model="component1Data.UserLastName" 
            @input="updateComponent1Data" 
            class="form-control input-step-one" 
            :placeholder="[[$store.state.component1Data.UserLastName]]">
        </div>
        <div class="col">
          <label for="phoneNumber">Phone number</label>
          <input type="text" 
            id="phoneNumber" 
            name="phoneNumber" 
            v-model="component1Data.UserNumber" 
            @input="updateComponent1Data" 
            class="form-control input-step-one" 
            :placeholder="[[$store.state.component1Data.UserNumber]]">
        </div>
        <div class="col">
          <label for="title">Title</label>
          <input type="text" 
            id="title" 
            name="title" 
            v-model="component1Data.title" 
            @input="updateComponent1Data" 
            class="form-control input-step-one" 
            :placeholder="[[$store.state.component1Data.title]]">
        </div>
        <div class="col">
          <label for="description">Description</label>
          <textarea rows="3" 
          id="description" 
          name="description" 
          v-model="component1Data.description" 
          @input="updateComponent1Data" 
          class="form-control input-step-one" 
          :placeholder="[[$store.state.component1Data.description]]"></textarea>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      component1Data: {
        UserFirstName: '',
        UserLastName: '',
        UserNumber: '',
        title: '',
        description: '',
      },
      showText: false
    };
  },

  methods: {
    updateComponent1Data() {
      this.$store.commit('updateComponent1Data', this.component1Data);
    },
  },

};
</script>
<style scoped>
.input-step-one {
  max-width: 100%; /* Use 100% to ensure they fit the available space */
  padding: 10px;
  margin-bottom: 10px;
}

.wrapper {
  width: 50%;
  margin: 0 auto;
}

</style>
