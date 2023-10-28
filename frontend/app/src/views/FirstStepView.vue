<template>
    <!-- https://levelup.gitconnected.com/create-a-multi-step-form-using-html-css-and-javascript-30aca5c062fc    template source -->
    <div>
      <h1>Create a Multi-Step Form Using Vue.js</h1>
      <div id="multi-step-form-container">
        <!-- Form Steps / Progress Bar -->
        <ul class="form-stepper form-stepper-horizontal text-center mx-auto pl-0">
          <li v-for="(step, index) in formSteps" :key="index" :class="stepClasses(index)">
            <a class="mx-2 coler-hover" @click="navigateToFormStep(index)">
              <span class="form-stepper-circle">
                <span>{{ index + 1 }}</span>
              </span>
              <div class="label">{{ step.label }}</div>
            </a>
          </li>
        </ul>
        <!-- Step Wise Form Content -->
        <form id="userAccountSetupForm" name="userAccountSetupForm" @submit.prevent>
          <component :is="stepComponents[currentStep]" />
          <div class="mt-3 form-buttons">
            <button class="button" @click="prevStep" v-if="currentStep > 0">Prev</button>
            <button class="button button-right" @click="nextStep" v-if="currentStep < formSteps.length - 1">Next</button>
            <button class="button submit-btn next-button" type="submit" v-else>Save</button>
          </div>
        </form>
      </div>
    </div>
    <div>
      <button @click="showText">Prikaži tekst</button>
    </div>
</template>
  
<script>
import FirstStep from "../components/FormStepOneComp.vue";
import SecondStep from "../components/FormStepTwoComp.vue";
import ThirdStep from "../components/FormStepThreeComp.vue";
import { mapState } from 'vuex';
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router'
export default {
  data() {
    return {
      currentStep: 0,
      formSteps: [
        { label: 'Account Basic Details' },
        { label: 'Social Profiles' },
        { label: 'Personal Details' },
      ],
      stepComponents: [FirstStep, SecondStep, ThirdStep],
      jsonBodyFirstSteps: {
        UserFirstName: "",
        UserLastName: "",
        UserNumber: "",
        token: "",
        title: "",
        description: "",
        about: "",
        tagInput: [],
        links: "",
        firstStepsComplete: true
      }
    };
  },
  computed: {
    ...mapState(['component1Data', 'component2Data', 'component3Data']),
  },
  methods: {
    async sendPutRequest() {
      try {
				const response = await axios.put('http://0.0.0.0:8085/update-user-profile', this.jsonBodyFirstSteps);
				this.$router.push('/profile');  // redirekcija na formu
        console.log('Succes: ', response.data)
        // server response
			} catch (error) {
				// zhavamo greske
				console.error('Auth error:', error);
				this.errors.push(error.response.data.detail);
			}
    },
    showText() {
        const accessToken = sessionStorage.getItem('access_token');
        this.jsonBodyFirstSteps.UserFirstName = this.component1Data.UserFirstName;
        this.jsonBodyFirstSteps.UserLastName = this.component1Data.UserLastName;
        this.jsonBodyFirstSteps.UserNumber = this.component1Data.UserNumber;
        this.jsonBodyFirstSteps.token = accessToken;
        this.jsonBodyFirstSteps.title = this.component1Data.title;
        this.jsonBodyFirstSteps.description = this.component1Data.description;
        this.jsonBodyFirstSteps.about = this.component2Data.about;
        this.jsonBodyFirstSteps.tagInput = this.component3Data.tagsInput;
        this.jsonBodyFirstSteps.links = this.component2Data.links;
        this.sendPutRequest();
        // const jsonToString = JSON.stringify(this.jsonBodyFirstSteps);
        // alert(jsonToString);
    },
    navigateToFormStep(stepNumber) {
      this.currentStep = stepNumber;
    },
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },
    nextStep() {
      if (this.currentStep < this.formSteps.length - 1) {
        this.currentStep++;
      }
    },
    stepClasses(index) {
      return {
        'form-stepper-active': index === this.currentStep,
        'form-stepper-unfinished': index > this.currentStep,
        'form-stepper-completed': index < this.currentStep,
      };
    },
  },
};

</script>

<style scoped> @import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
/* Add this to your CSS file */
.coler-hover:hover{
    color: rgb(156, 155, 155);
}
.form-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-buttons .button {
  margin: 5px;
}

.next-button {
  margin-left: auto; /* Push the "Next" button to the right */
}

h1 {
    text-align: center;
}
h2 {
    margin: 0;
}
#multi-step-form-container {
    margin-top: 5rem;
}
.text-center {
    text-align: center;
}
.mx-auto {
    margin-left: auto;
    margin-right: auto;
}
.pl-0 {
    padding-left: 0;
}
.button {
    padding: 0.7rem 1.5rem;
    border: 1px solid #4361ee;
    background: -webkit-linear-gradient(left, #074d94,#0059b3,#0d6efd, #007efc);
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
}
.submit-btn {
    border: 1px solid #0e9594;
    background-color: #0e9594;
}
.mt-3 {
    margin-top: 2rem;
}
.d-none {
    display: none;
}
.form-step {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 3rem;
}
.font-normal {
    font-weight: normal;
}
ul.form-stepper {
    counter-reset: section;
    margin-bottom: 3rem;
}
ul.form-stepper .form-stepper-circle {
    position: relative;
}
ul.form-stepper .form-stepper-circle span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
}
.form-stepper-horizontal {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
ul.form-stepper > li:not(:last-of-type) {
    margin-bottom: 0.625rem;
    -webkit-transition: margin-bottom 0.4s;
    -o-transition: margin-bottom 0.4s;
    transition: margin-bottom 0.4s;
}
.form-stepper-horizontal > li:not(:last-of-type) {
    margin-bottom: 0 !important;
}
.form-stepper-horizontal li {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: start;
    -webkit-transition: 0.5s;
    transition: 0.5s;
}
.form-stepper-horizontal li:not(:last-child):after {
    position: relative;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    height: 1px;
    content: "";
    top: 32%;
}
.form-stepper-horizontal li:after {
    background-color: #dee2e6;
}

/* The rest of your existing CSS */
.form-stepper-horizontal li.form-stepper-completed:after {
    background: #07ecab !important;
}

.form-stepper-horizontal li:last-child {
    flex: unset;
}
ul.form-stepper li a .form-stepper-circle {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-right: 0;
    line-height: 1.7rem;
    text-align: center;
    background: rgba(0, 0, 0, 0.38);
    border-radius: 50%;
}
.form-stepper .form-stepper-active .form-stepper-circle {
    background: -webkit-linear-gradient(left, #074d94,#0059b3,#0d6efd, #007efc) !important;
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
}
.form-stepper .form-stepper-active .label {
    color: #4361ee !important;
}
.form-stepper .form-stepper-active .form-stepper-circle:hover {
    background-color: #4361ee !important;
    color: #fff !important;
}
.form-stepper .form-stepper-unfinished .form-stepper-circle {
    background-color: #f8f7ff;
}
.form-stepper .form-stepper-completed .form-stepper-circle {
    background: -webkit-linear-gradient(left, #2e8a46, #27a863, #22c483, #07ecab) !important;
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
}
.form-stepper .form-stepper-completed .label {
    color: #0e9594 !important;
}
.form-stepper .form-stepper-completed .form-stepper-circle:hover {
    background-color: #0e9594 !important;
    color: #fff !important;
}
.form-stepper .form-stepper-active span.text-muted {
    color: #fff !important;
}
.form-stepper .form-stepper-completed span.text-muted {
    color: #fff !important;
}
.form-stepper .label {
    font-size: 1rem;
    margin-top: 0.5rem;
}
.form-stepper a {
    cursor: default;
    text-decoration: none;
}
</style>