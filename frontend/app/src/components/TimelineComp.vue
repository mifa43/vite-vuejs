<script>
export default {
  props: {
    isEditing: Boolean,
  },
  data() {
    return {
      expirinace: 'Expert',
      payRate: '10$/hr',
      projectsNum: '230',
      engLvl: 'C2',
      availability: '6 mounth',
    };
  },
};
</script>

<template>
    
<div class="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div class="row">
                <div class="col-md-6">
                    <label>Experience</label>
                </div>
                <div class="col-md-6">
                    <template v-if="isEditing">
                        <input type="text" class="form-control" v-model="expirinace" />
                    </template>
                    <template v-else>
                        <p>{{ expirinace }}</p>
                    </template>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label>Hourly Rate</label>
                </div>
                <div class="col-md-6">
                    <template v-if="isEditing">
                        <input type="text" class="form-control" v-model="payRate" />
                    </template>
                    <template v-else>
                        <p>{{ payRate }}</p>
                    </template>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label>Total Projects</label>
                </div>
                <div class="col-md-6">
                    <template v-if="isEditing">
                        <input type="text" class="form-control" v-model="projectsNum" />
                    </template>
                    <template v-else>
                        <p>{{ projectsNum }}</p>
                    </template>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label>English Level</label>
                </div>
                <div class="col-md-6">
                    <template v-if="isEditing">
                        <input type="text" class="form-control" v-model="engLvl" />
                    </template>
                    <template v-else>
                        <p>{{ engLvl }}</p>
                    </template>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label>Availability</label>
                </div>
                <div class="col-md-6">
                    <template v-if="isEditing">
                        <input type="text" class="form-control" v-model="availability" />
                    </template>
                    <template v-else>
                        <p>{{ availability }}</p>
                    </template>
                </div>
            </div>
    <div class="row">
        <div class="col-md-12">
            <label>Your Bio</label><br/>
            <p>Your detail description</p>
        </div>
    </div>
</div>

</template>