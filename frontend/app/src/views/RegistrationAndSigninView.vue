<script>
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs, between } from '@vuelidate/validators'
export default {
  setup () {
    return { v$: useVuelidate() }
  },
	data() {
		return {
      postRestartPassBody: {
        UserEmail: ''
      },
      popupVisible: false,
      inputValue: "",
      param: {
        token: ''
      },
      activeForm: 'login', // Initial form is the login form
      postRegistrationBody: {
        UserEmail: '',
        UserPassword: '',
        UserRePassword: '',
      },
      postLoginBody: {
        UserEmail: '',
        UserPassword: ''
      },
      errors: [],
      errorsMsg: 'The email address is already used!',
      validationMsg: ["Reasons why the form is not valid: ", 
      "Email: ", 
      "Password: ", 
      "Please check that you have entered the correct email address.", 
      "You've probably already registered.",
      "Password must be between 8 and 18 characters long.",
      "Passwords must match."
      ],
      loginMsg: ["The email or password is incorrect.", "Please check that you have entered the correct email address."],
      showValidationMsg: false,
      showLoginMsg: false,
      showLoginSevrerErrorMsg: false,
      showServerErrorMsg: false,
		};
	},
  	methods: {
    showPopup() {
      this.popupVisible = true;
    },
    submit() {
      // Ovde možete dodati logiku za rukovanje unosom i dugmetom
      // Na primer, možete poslati unos na server ili izvršiti drugu željenu akciju.
      // alert(this.inputValue);
      this.popupVisible = false; // Zatvorite popup nakon što završite akciju
    },
    closePopup() {
      this.popupVisible = false;
    },
    async sendRestartPasswordRequest() {
			try {
				const response = await axios.post('http://0.0.0.0:8083/password-restart', this.postRestartPassBody);
        alert(response.data);
        this.popupVisible = false;
        this.$router.push('/registration-and-signin');
				// server response
			} catch (error) {
				// zhavamo greske
				console.error('Password restart error:', error);
			}
		},
		async sendRegistrationRequest() {
			try {
        
				const response = await axios.post('http://0.0.0.0:8081/register-user', this.postRegistrationBody);
				this.activeForm = "login";  // prikazujemo login formu ako je uspesno
				this.$router.push('/registration-and-signin');  // redirekcija na formu
        this.showServerErrorMsg = false;
				// server response
			} catch (error) {
				// zhavamo greske
				console.error('Registration error:', error);
				this.errors.push(error.response.data.detail);
        this.showServerErrorMsg = true;
			}
		},
    async getUserProfileRequest() {
			try {
        const accessToken = sessionStorage.getItem('access_token');
        this.param.token = accessToken;
        const textBody = this.param;
				const response = await axios.get('http://0.0.0.0:8085/get-user-profile', {params: textBody});
        
        if (response.data.data.query.firstStepsComplete) {
          window.sessionStorage.setItem('user_detail', JSON.stringify(response.data.data.query));
          this.$router.push('/profile');
        } else {
          this.$router.push('/first-steps');
        }
				// server response
			} catch (error) {
				// zhavamo greske
				console.error('Get user profile error:', error.response.data.detail);
			}
    },
    async sendLoginRequest() {
			try {
				const response = await axios.post('http://0.0.0.0:8083/login', this.postLoginBody);
				// this.activeForm = "login";  // prikazujemo login formu ako je uspesno
        this.showLoginSevrerErrorMsg = false;
        window.sessionStorage.setItem('refresh_token', response.data.refresh_token);
        window.sessionStorage.setItem('access_token', response.data.access_token);
        
        await this.getUserProfileRequest();
        
				// server response
			} catch (error) {
				// zhavamo greske
				console.error('Auth error:', error);
				this.errors.push(error.response.data.detail);
        this.showLoginSevrerErrorMsg = true;
			}
		},
    validateRegistration() {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.postRegistrationBody.UserEmail) && 
      this.postRegistrationBody.UserPassword.length >= 4 && 
      this.postRegistrationBody.UserPassword.length <= 18 && 
      this.postRegistrationBody.UserPassword === this.postRegistrationBody.UserRePassword) {
        this.sendRegistrationRequest();
        this.showValidationMsg = false;
        // uslov koji mora da se ispuni ako zelimo da posaljemo request
      } else {
        this.showValidationMsg = true;
      }
    },
    validateLogin () {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.postLoginBody.UserEmail) && 
      this.postLoginBody.UserPassword.length >= 4 && 
      this.postLoginBody.UserPassword.length <= 18) {
        this.sendLoginRequest();
        this.showLoginMsg = false;
      } else {
        this.showLoginMsg = true;
      }
    },
    validateRestartPassword () {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.postRestartPassBody.UserEmail)) {
        this.sendRestartPasswordRequest();
        console.log("Password recovery is sended!")
        // this.showLoginMsg = false;
      } else {
        console.log("Email not founded|Email recovery")
      }
    },
    switchToSignupForm() {
      this.activeForm = 'signup'; // Change the active form to 'signup'
    },
	},
  watch: {
    email(value){
      this.postRegistrationBody.UserEmail = value;
      this.validateRegistration(value);
    },
    emailLogin(value){
      this.postLoginBody.UserEmail = value;
      this.validateLogin(value)
    },
    restartPassword(value) {
      this.postRestartPassBody.UserEmail = value;
      this.validateRestartPassword(value);
    }
  }
}
</script>
<template>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </symbol>
  </svg>

  <div class="wrapper">
    <div class="title-text">
      <div class="title login" v-if="activeForm==='login'">Login Form</div>
      <div class="title signup" v-else-if="activeForm==='signup'">Signup Form</div>
    </div>
    <div class="form-container">
      <div class="slide-controls">
        <input type="radio" name="slide" id="login" v-model="activeForm" value="login">
        <input type="radio" name="slide" id="signup" v-model="activeForm" value="signup">
        <label for="login" class="slide login">Login</label>
        <label for="signup" class="slide signup">Signup</label>
        <div class="slider-tab" :style="{ left: activeForm === 'login' ? '0%' : '50%' }"></div>
      </div>
      <div class="form-inner">
        <form action="#" class="login" @submit.prevent="validateLogin" v-show="activeForm === 'login'">
          <div class="field">
            <input type="text" v-model="postLoginBody.UserEmail" placeholder="Email Address">
          </div>
          <div class="field">
            <input type="password" v-model="postLoginBody.UserPassword" placeholder="Password" required>
          </div>
          <div class="pass-link forgot-password"><a href="#" @click="showPopup">Forgot password?</a></div>
          <div>
            <button class="btn btn-primary btnStyle" type="submit">Login</button>
          </div>
          <div class="signup-link">Not a member? <a href="#" @click="switchToSignupForm">Signup now</a></div>
          <div style="margin-top: 15px;" v-if="showLoginMsg">
            <ul style="margin-top: 8px; font-size: 11px;">
              <li>{{ loginMsg[1] }}</li>
            </ul>
          </div>
          <div style="margin-top: 15px; font-size: 11px;" v-if="showLoginSevrerErrorMsg">
            <ul style="margin-top: 8px;">
              <li>{{ loginMsg[0] }}</li>
            </ul>
          </div>
          <div style="margin-top: 15px;" v-else>
          </div>
        </form>
        <form class="signup" @submit.prevent="validateRegistration" v-show="activeForm === 'signup'">
          <div class="field">
            <input type="text" v-model="postRegistrationBody.UserEmail" placeholder="Email Address">
          </div>
          <div class="field">
            <input type="password" v-model="postRegistrationBody.UserPassword" placeholder="Password" required>
          </div>
          <div class="field">
            <input type="password" v-model="postRegistrationBody.UserRePassword" placeholder="Confirm password" required>
          </div>
          <div class="signup-link check-box-form">I agree to the terms of use <input type="checkbox" class="form-check-input chkbx"></div>
          <div>
            <button class="btn btn-primary btnStyle" type="submit">Sign up</button>
          </div>
          <div style="margin-top: 15px;" v-if="showValidationMsg">
            <ul style="margin-top: 8px; font-size: 11px;">
              <li>{{ validationMsg[3] }}</li>
              <li>{{ validationMsg[4] }}</li>
              <li>{{ validationMsg[5] }}</li>
              <li>{{ validationMsg[6] }}</li>
            </ul>
          </div>
          <div style="margin-top: 15px; font-size: 11px;" v-else-if="showServerErrorMsg">
            <ul style="margin-top: 8px;">
              <li>{{ errorsMsg }}</li>
            </ul>
          </div>
          <div style="margin-top: 15px;" v-else>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div>
    <div v-if="popupVisible" class="popup alert alert-light">
      <a href="#" @click="closePopup" class="close-popup btn btn-danger"><strong>X</strong></a>
      <div class="content-popup">
        <p class="text-container">In order to recover your password, you need to enter your email address, you need to check your inbox where we sent you a password recovery link.</p>
        <form @submit.prevent="validateRestartPassword">
          <input type="email" v-model="postRestartPassBody.UserEmail" class="form-control" placeholder="Email" required/>
          <button type="submit" class="restart-password-btn btn btn-primary">Potvrdi</button>
        </form>

      </div>
    </div>
  </div>
</template>


<style scoped> @import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
html,body{
  display: grid;
  height: 100%;
  width: 100%;
  place-items: center;
  background: -webkit-linear-gradient(left, #074d94,#0059b3,#0d6efd, #007efc);
}
.text-container {
  padding: 10px;
  font-size: 15px;
}
.content-popup {
  margin-top: 30px;
}
.close-popup {
  position: absolute;
  top: 5px; /* Podešavanje željenog razmaka od vrha */
  right: 5px; /* Podešavanje željenog razmaka sa desne strane */
  cursor: pointer; /* Dodajte pokazivač prsta kako biste označili da je to dugme */
  border-radius: 30px;
  text-decoration: none;
  background: -webkit-linear-gradient(left,#d3050f,#d31111,#d31111,#d3050f);
}
.restart-password-btn {
  margin-top: 10px;
  background: -webkit-linear-gradient(left,#06498b,#004080,#115ed3,#056cd3);
  font-size: 18px;
  font-weight: 500;
}
.popup {
  position: absolute;
  max-width: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.chkbx{
	border-color: #999;
}
.check-box-form{
	padding: 6px;
}
.btnStyle{
	color: #fff;;
	background: -webkit-linear-gradient(left,#06498b,#004080,#115ed3
, #056cd3);
    font-size: 18px;
    font-weight: 500;
	margin-top: 5px;
}
.forgot-password{
	text-align: center;
	padding: 6px;
}
::selection{
  background: #1a75ff;
  color: #fff;
}
.wrapper{
  overflow: hidden;
  max-width: 400px;
  min-width: 300px;
  background: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 15px 20px rgba(0,0,0,0.1);
  margin: 0px auto;
}
.wrapper .title-text{
  display: flex;
  width: 200%;
}
.wrapper .title{
  width: 50%;
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  transition: all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55);
}
.wrapper .slide-controls{
  position: relative;
  display: flex;
  height: 50px;
  width: 100%;
  overflow: hidden;
  margin: 30px 0 10px 0;
  justify-content: space-between;
  border: 1px solid lightgrey;
  border-radius: 15px;
}
.slide-controls .slide{
  height: 100%;
  width: 100%;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  line-height: 48px;
  cursor: pointer;
  z-index: 1;
  transition: all 0.6s ease;
}
.slide-controls label.signup{
  color: #000;
}
.slide-controls .slider-tab{
  position: absolute;
  height: 100%;
  width: 50%;
  left: 0;
  z-index: 0;
  border-radius: 15px;
  background: -webkit-linear-gradient(left,#06498b,#004080,#115ed3
, #056cd3);
  transition: all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55);
}
input[type="radio"]{
  display: none;
}
#signup:checked ~ .slider-tab{
  left: 50%;
}
#signup:checked ~ label.signup{
  color: #fff;
  cursor: default;
  user-select: none;
}
#signup:checked ~ label.login{
  color: #000;
}
#login:checked ~ label.signup{
  color: #000;
}
#login:checked ~ label.login{
  cursor: default;
  user-select: none;
}
.wrapper .form-container{
  width: 100%;
  overflow: hidden;
}
.form-container .form-inner{
  display: flex;
  width: 200%;
}
.form-container .form-inner form{
  width: 50%;
  transition: all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55);
}
.form-inner form .field{
  height: 50px;
  width: 100%;
  margin-top: 20px;
}
.form-inner form .field input{
  height: 100%;
  width: 100%;
  outline: none;
  padding-left: 15px;
  border-radius: 15px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  font-size: 17px;
  transition: all 0.3s ease;
}
.form-inner form .field input:focus{
  border-color: #1a75ff;
  /* box-shadow: inset 0 0 3px #fb6aae; */
}
.form-inner form .field input::placeholder{
  color: #999;
  transition: all 0.3s ease;
}
form .field input:focus::placeholder{
  color: #1a75ff;
}
.form-inner form .pass-link{
  margin-top: 5px;
}
.form-inner form .signup-link{
  text-align: center;
  margin-top: 30px;
}
.form-inner form .pass-link a,
.form-inner form .signup-link a{
  color: #1a75ff;
  text-decoration: none;
}
.form-inner form .pass-link a:hover,
.form-inner form .signup-link a:hover{
  text-decoration: underline;
}
form .btn{
  height: 50px;
  width: 100%;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
}
form .btn .btn-layer{
  height: 100%;
  width: 300%;
  position: absolute;
  left: -100%;
  background: -webkit-linear-gradient(right,#003366,#004080,#0059b3
, #0073e6);
  border-radius: 15px;
  transition: all 0.4s ease;;
}
form .btn:hover .btn-layer{
  left: 0;
}
form .btn input[type="submit"]{
  height: 100%;
  width: 100%;
  z-index: 1;
  position: relative;
  background: none;
  border: none;
  color: #fff;
  padding-left: 0;
  border-radius: 15px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
}

</style>