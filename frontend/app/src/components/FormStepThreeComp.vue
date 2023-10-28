<template>
    <div class="wrapper">
    <form>
      <vue3-tags-input :tags="tagsInput" @on-tags-changed="updateComponent3Data" placeholder="To enter tags pres SPACE and for remove use BACKSPACE"/>
    </form>
  </div>

</template>

<script>
// https://www.npmjs.com/package/vue3-tags-input?activeTab=readme    izvor komponente
import { defineComponent } from 'vue';
import Vue3TagsInput from 'vue3-tags-input';

export default defineComponent ({
  name: 'CustomStyles',
  computed: {
    component3Data() {
      return this.$store.state.component3Data;
    },
  },
  components: {
    Vue3TagsInput
  },

  data() {
    return {
      component3Data: {
        tagsInput: []
      }
    }
  },
  methods: {

    updateComponent3Data(tagsInput) {
      this.$store.commit('updateComponent3Data', { tagsInput });
    },
  }
})
</script>

<style lang="css">
.v3ti .v3ti-tag {
  background: -webkit-linear-gradient(left, #074d94,#0059b3,#0d6efd, #007efc);
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  font-family: 'Poppins', sans-serif;
}

.v3ti .v3ti-tag .v3ti-remove-tag {
color: #000000;
transition: color .3s;
}

.v3ti .v3ti-tag .v3ti-remove-tag:hover {
color: #ffffff;
}

.wrapper {
  width: 50%;
  margin: 0 auto;
}
</style>