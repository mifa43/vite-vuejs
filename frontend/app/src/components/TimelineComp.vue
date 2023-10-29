<script>
export default {
  props: {
    isEditing: Boolean,
  },
  data() {
    return {
        about: '',
        links: '',
        tagInput: [],
        engLvl: 'C2',
        availability: '6 mounth',
    };
  },
  methods: {
    setDataFields() {
        
        const getDetails = sessionStorage.getItem('user_detail');
        const objData = JSON.parse(getDetails);
        this.about = objData.about.toString();
        this.links = objData.links.toString();

        let tagStr = objData.tagInput.slice(1, -1).split(',');
        this.tagInput = tagStr[0] + " " + tagStr[1] + " " + tagStr[2]
    }
  },
    mounted() {
        // 2. The DOM is ready to go now
        this.setDataFields();
    },
};
</script>

<template>
    
<div class="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div class="row">
                <div class="col-md-6">
                    <label>About</label>
                </div>
                <div class="col-md-6">
                    <template v-if="isEditing">
                        <input type="text" class="form-control" v-model="about" />
                    </template>
                    <template v-else>
                        <p>{{ about }}</p>
                    </template>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label>Links</label>
                </div>
                <div class="col-md-6">
                    <template v-if="isEditing">
                        <input type="text" class="form-control" v-model="links" />
                    </template>
                    <template v-else>
                        <p>{{ links }}</p>
                    </template>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label>Tags</label>
                </div>
                <div class="col-md-6">
                    <template v-if="isEditing">
                        <input type="text" class="form-control" v-model="tagInput" />
                    </template>
                    <template v-else>
                        <p>{{ tagInput }}</p>
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