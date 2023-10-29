<script>
import { ref, onMounted } from 'vue';
export default {
  props: {
    isEditing: Boolean,
  },
  data() {
    return {
      name: '',
      userID: '',
      email: '',
      phone: '',
      profesion: '',
    };
  },
  methods: {
    setDataFields() {
        const getDetails = sessionStorage.getItem('user_detail');
        const objData = JSON.parse(getDetails);
        const firstName = objData.firstName.toString();
        const lastName = objData.lastName.toString();

        this.name = firstName + ' ' + lastName;
        this.userID = objData.keycloakUserID.toString();
        this.email = objData.mail.toString();
        this.phone = objData.phoneNumber.toString();
        this.profesion = objData.description.toString();
    }
  },
    mounted() {
        // 2. The DOM is ready to go now
        this.setDataFields();
    },
};
</script>

<template>
<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <div class="row">

            <div class="col-md-6">
                <label>User Id</label>
            </div>
            <div class="col-md-6">
                <template v-if="isEditing">
                    <input type="text" class="form-control" v-model="userID" />
                </template>
                <template v-else>
                    <p>{{ userID }}</p>
                </template>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <label>Name</label>
            </div>
            <div class="col-md-6">
                <template v-if="isEditing">
                    <input type="text" class="form-control" v-model="name" />
                </template>
                <template v-else>
                    <p>{{ name }}</p>
                </template>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <label>Email</label>
            </div>
            <div class="col-md-6">
                <template v-if="isEditing">
                    <input type="text" class="form-control" v-model="email" />
                </template>
                <template v-else>
                    <p>{{ email }}</p>
                </template>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <label>Phone</label>
            </div>
            <div class="col-md-6">
                <template v-if="isEditing">
                    <input type="text" class="form-control" v-model="phone" />
                </template>
                <template v-else>
                    <p>{{ phone }}</p>
                </template>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <label>Description</label>
            </div>
            <div class="col-md-6">
                <template v-if="isEditing">
                    <textarea rows="3"  class="form-control" v-model="profesion"></textarea>
                </template>
                <template v-else>
                    <p>{{ profesion }}</p>
                </template>
            </div>
        </div>
</div>
</template>