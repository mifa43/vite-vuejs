<script>
export default {
  data() {
    return {
      component2Data: {
        links: '',
        about: '',
      },
    };
  },
  methods: {
    updateComponent2Data() {
      this.$store.commit('updateComponent2Data', this.component2Data);
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <form>
      <div class="form-row">
        <div class="col">
          <label for="links">Links</label>
          <input type="text" 
            id="links" 
            name="links" 
            v-model="component2Data.links" 
            @input="updateComponent2Data" 
            class="form-control input-step-one" 
            :placeholder="[[$store.state.component2Data.links]]">
        </div>
        <div class="col">
          <label for="about">About</label>
          <textarea rows="3" 
            id="about" 
            name="about" 
            v-model="component2Data.about" 
            @input="updateComponent2Data" 
            class="form-control input-step-one" 
            :placeholder="[[$store.state.component2Data.about]]"></textarea>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.input-step-one {
  max-width: 100%; /* Use 100% to ensure they fit the available space */
  padding: 10px;
  margin-top: 10px;
}

.wrapper {
  width: 50%;
  margin: 0 auto;
}

</style>
