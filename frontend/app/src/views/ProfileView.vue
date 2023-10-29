<script setup>
import AboutComp from "../components/AboutComp.vue";
import TimelineComp from "../components/TimelineComp.vue";
import { ref } from 'vue';

function data() {
    return {
        showComponentAbout: false, // umesto True
    }
}

const isEditing = ref(false);

const toggleEditMode = () => {
  isEditing.value = !isEditing.value;

};
const getDetails = sessionStorage.getItem('user_detail');
const objData = JSON.parse(getDetails);
const firstName = objData.firstName.toString();
const lastName = objData.lastName.toString();

let userName = firstName + ' ' + lastName;
let title = objData.title.toString();
let rating = "8.5/10"
</script>

<template>
<main>
<div class="container emp-profile">
            <form method="post">
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt=""/>
                            <div class="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                                    <template v-if="isEditing">
                                        <input type="text" class="form-control" v-model="userName" />
                                    </template>
                                    <template v-else>
                                        <h5>{{ userName }}</h5>
                                    </template>

                                    <template v-if="isEditing">
                                        <input type="text" class="form-control" v-model="title" />
                                    </template>
                                    <template v-else>
                                        <h5>{{ title }}</h5>
                                    </template>
                                    <template v-if="isEditing">
                                        <input type="text" class="form-control" v-model="rating" />
                                    </template>
                                    <template v-else>
                                        <p class="proile-rating">RANKINGS : <span>{{ rating }}</span></p>
                                    </template>
                                    
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a @click="showComponentAbout = false" :class="{ active: !showComponentAbout }" class="nav-link" id="home-tab" data-toggle="tab" href="#" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                                <li class="nav-item">
                                    <a @click="showComponentAbout = true" :class="{ active: showComponentAbout }" class="nav-link" id="profile-tab" data-toggle="tab" href="#" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-md-2">
                        <button type="button" class="profile-edit-btn" @click="toggleEditMode">
                        {{ isEditing ? 'Save changes' : 'Edit Profile' }}
                        </button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-work" style="margin: 0px">
                            <p>WORK LINK</p>
                            <a href="">Website Link</a><br/>
                            <a href="">Bootsnipp Profile</a><br/>
                            <a href="">Bootply Profile</a>
                            <p>SKILLS</p>
                            <a href="">Web Designer</a><br/>
                            <a href="">Web Developer</a><br/>
                            <a href="">WordPress</a><br/>
                            <a href="">WooCommerce</a><br/>
                            <a href="">PHP, .Net</a><br/>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <TimelineComp  v-if="showComponentAbout" :isEditing="isEditing" />
                            <AboutComp v-else :isEditing="isEditing" />
                            
                        </div>
                    </div>
                </div>
            </form>           
        </div>
  </main>
</template>

<style scoped>
body{
    background: -webkit-linear-gradient(left, #3931af, #00c6ff);
}
.emp-profile{
    padding: 3%;
    margin-top: 3%;
    margin-bottom: 3%;
    border-radius: 0.5rem;
    background: #fff;
}
.profile-img{
    text-align: center;
}
.profile-img img{
    width: 70%;
    height: 100%;
}
.profile-img .file {
    position: relative;
    overflow: hidden;
    margin-top: -20%;
    width: 70%;
    border: none;
    border-radius: 0;
    font-size: 15px;
    background: #212529b8;
}
.profile-img .file input {
    position: absolute;
    opacity: 0;
    right: 0;
    top: 0;
}
.profile-head h5{
    color: #333;
}
.profile-head h6{
    color: #0062cc;
}
.profile-edit-btn{
    border: none;
    border-radius: 1.5rem;
    width: 70%;
    padding: 2%;
    font-weight: 600;
    color: #6c757d;
    cursor: pointer;
}
.proile-rating{
    font-size: 12px;
    color: #818182;
    margin-top: 5%;
}
.proile-rating span{
    color: #495057;
    font-size: 15px;
    font-weight: 600;
}
.profile-head .nav-tabs{
    margin-bottom:5%;
}
.profile-head .nav-tabs .nav-link{
    font-weight:600;
    border: none;
}
.profile-head .nav-tabs .nav-link.active{
    border: none;
    border-bottom:2px solid #0062cc;
}
.profile-work{
    padding: 14%;
    margin-top: -15%;
}
.profile-work p{
    font-size: 12px;
    color: #818182;
    font-weight: 600;
    margin-top: 10%;
}
.profile-work a{
    text-decoration: none;
    color: #495057;
    font-weight: 600;
    font-size: 14px;
}
.profile-work ul{
    list-style: none;
}
.profile-tab label{
    font-weight: 600;
}
.profile-tab p{
    font-weight: 600;
    color: #0062cc;
}
</style>