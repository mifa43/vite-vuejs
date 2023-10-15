<script>
export default {
  props: {
    isEditing: Boolean,
  },
  data() {
    return {
      name: 'Kshiti Ghelani',
      userID: 'Kshiti123',
      email: 'kshitighelani@gmail.com',
      phone: '123 456 7890',
      profesion: 'Web Developer and Designer',
    };
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
                <label>Profession</label>
            </div>
            <div class="col-md-6">
                <template v-if="isEditing">
                    <input type="text" class="form-control" v-model="profesion" />
                </template>
                <template v-else>
                    <p>{{ profesion }}</p>
                </template>
            </div>
        </div>
</div>
</template>