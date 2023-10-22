<script setup>
import { RouterLink, RouterView } from 'vue-router'
// https://www.npmjs.com/package/vue-material-design-icons?activeTab=code - ikonice
import MenuIcon from 'vue-material-design-icons/HomeOutline.vue';
import DashboardIcon from 'vue-material-design-icons/MonitorDashboard.vue';
import FormsIcon from 'vue-material-design-icons/FormSelect.vue';
import GraphIcon from 'vue-material-design-icons/GraphOutline.vue';
import DocumentIcon from 'vue-material-design-icons/FileDocumentOutline.vue';
import FolderIcon from 'vue-material-design-icons/FolderOutline.vue';
import TableIcon from 'vue-material-design-icons/FileExcelOutline.vue';
import InfoIcon from 'vue-material-design-icons/InformationOutline.vue';
import PersonIcon from "vue-material-design-icons/DotsHorizontalCircleOutline.vue";
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';

components: {
  MenuIcon;
  DashboardIcon;
  FormsIcon;
  GraphIcon;
  DocumentIcon;
  FolderIcon;
  TableIcon;
  InfoIcon;
  PersonIcon;
}

var isUserLogedin = ref(false);
const router = useRouter();
const sendLogoutRequest = async () => {
    const refreshToken = sessionStorage.getItem('refresh_token');
    const requestLogoutBody = {
      token: refreshToken // Zamijenite sa stvarnim refresh_token-om
    };
    try {
        const response = await axios.post('http://0.0.0.0:8083/logout', requestLogoutBody);
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        router.push('/registration-and-signin');  // redirekcija na formu
        // server response
    } catch (error) {
        // zhavamo greske
        console.error('Logout error:', error);
        console.error(error.response.data.detail)
    }
}
const checkTokenHideShow = () => {
    const accessToken = sessionStorage.getItem('access_token');
    
    if (accessToken) {
        
        isUserLogedin.value = true;
    }
    else {
        
        isUserLogedin.value = false;
    }
}
const checkAndClearToken = () => {
    // checkTokenHideShow();
  const accessToken = sessionStorage.getItem('access_token');
  if (accessToken) {
    const decodedToken = parseJwt(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp && decodedToken.exp < currentTime) {
      // Token je istekao, obrisi ga
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');
      router.push('/registration-and-signin');

      // Opcionalno: dodajte dodatnu logiku kao što je izlogovanje korisnika
    }
  }
};

const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64));
  return JSON.parse(jsonPayload);
};

onMounted(() => {
    setInterval(checkTokenHideShow, 10);    // proveravamo token svakih 10 milisekundi
    
  // Postavlja interval na 5 minuta (300000 milisekundi)
  setInterval(checkAndClearToken, 100000);
});
</script>

<template>
  <header>
    <div>
      <nav>


        <div class="container-fluid">
            <div class="row flex-nowrap">
                <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <div class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <RouterLink to="/" class="ms-1 d-none d-sm-inline" style="text-decoration: none; font-size: 20px;" >Menu</RouterLink>
                        </div>
                        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li class="nav-item">
                                <!-- <a class="nav-link align-middle px-0"> -->
                                    
                                <RouterLink to="/home" class="nav-link align-middle px-0" >
                                    <MenuIcon />
                                    <span class="ms-1 d-none d-sm-inline">Home</span> 
                                </RouterLink>
                                <!-- </a> -->
                            </li>
                            <li>
                                <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                                    <DashboardIcon />
                                    <span class="ms-1 d-none d-sm-inline">Dashboard</span> 
                                </a>
                                <!-- <ul class="collapse nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                    <li class="w-100">
                                        <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 1 </a>
                                    </li>
                                    <li>
                                        <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 2 </a>
                                    </li>
                                </ul> -->
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0 align-middle">
                                    <FormsIcon />
                                    <span class="ms-1 d-none d-sm-inline">Forms</span>
                                </a>
                            </li>
                            <li>
                                <a href="#submenu2" data-bs-toggle="collapse" class="nav-link px-0 align-middle ">
                                    <GraphIcon />
                                    <span class="ms-1 d-none d-sm-inline">Statistics and graphs</span>
                                </a>
                                <!-- <ul class="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                    <li class="w-100">
                                        <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 1</a>
                                    </li>
                                    <li>
                                        <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 2</a>
                                    </li>
                                </ul> -->
                            </li>
                            <li>
                                <a href="#submenu3" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                                    <DocumentIcon />
                                    <span class="ms-1 d-none d-sm-inline">Documents</span> 
                                </a>
                                <!-- <ul class="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                                    <li class="w-100">
                                        <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 1</a>
                                    </li>
                                    <li>
                                        <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 2</a>
                                    </li>
                                    <li>
                                        <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 3</a>
                                    </li>
                                    <li>
                                        <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 4</a>
                                    </li>
                                </ul> -->
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0 align-middle">
                                    <FolderIcon />
                                    <span class="ms-1 d-none d-sm-inline">Folders</span> 
                                </a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0 align-middle">
                                    <TableIcon /><span class="ms-1 d-none d-sm-inline">Tables</span> 
                                </a>
                            </li>

                            <li>
                                <a href="#" class="nav-link px-0 align-middle">
                                    <InfoIcon />
                                    <span class="ms-1 d-none d-sm-inline">Info</span> 
                                </a>
                            </li>
                        </ul>
                        <hr>
                        <div class="dropdown pb-4">
                            <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <PersonIcon />
                                <span class="d-none d-sm-inline mx-1">More actions</span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                                <li><a class="dropdown-item" href="#">New project...</a></li>
                                <li><a class="dropdown-item" href="#">Settings</a></li>
                                <li v-if="isUserLogedin===true"><RouterLink to="/profile" class="dropdown-item" >Profile</RouterLink></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li v-if="isUserLogedin===true"><a class="dropdown-item" href="#" @click="sendLogoutRequest">Sign out</a></li>
                                <li v-else-if="isUserLogedin===false"><RouterLink to="/registration-and-signin" class="dropdown-item">Sign in</RouterLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col py-3">
                   <RouterView />
                </div>
            </div>
        </div>
        <!-- <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->

      </nav>
    </div>
  </header>

  
</template>

<style scoped>
li a {
    text-decoration: none;
}
li a:hover {
    color: aliceblue;
}
</style>
