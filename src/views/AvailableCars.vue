<template>
    <ion-menu content-id="main-content">
        <ion-header>
            <ion-toolbar color="primary">
                <ion-text>
                    <center>Good Day, {{ loggedInUser.username }}!</center>
                </ion-text>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <div id="side-btn">
                <ion-list>
                    <ion-item lines="none">
                        <ion-icon :src="homeOutline" size="large"></ion-icon>
                        <ion-button shape="round" expand="block" size="default" href="/">
                            <ion-label>
                                Home
                            </ion-label>
                        </ion-button>
                    </ion-item>
                </ion-list>



                <ion-list>
                    <ion-item lines="none">
                        <ion-icon :src="carSharp" size="large"></ion-icon>
                        <ion-button shape="round" expand="block" size="default" href="/request">
                            <ion-label>
                                Check Status
                            </ion-label>
                        </ion-button>
                    </ion-item>
                </ion-list>

                <ion-list>
                    <ion-item lines="none">
                        <ion-icon :src="logOutOutline" size="large"></ion-icon>
                        <ion-button shape="round" expand="block" size="default" @click="logout()">
                            <ion-label>
                                Log Out
                            </ion-label>
                        </ion-button>
                    </ion-item>
                </ion-list>
            </div>

        </ion-content>
    </ion-menu>

    <ion-page id="main-content">
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <ion-title>Rent'n Go</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <center>
                <ion-avatar>
                    <img src="/assets/logo.png">
                </ion-avatar>
                <ion-text>
                    <h1>Ready to Rent Cars</h1>
                </ion-text>
            </center>
            <ion-list>
                <ion-item-sliding v-for="item, i in cars.Car" v-bind:key="item">
                    <ion-item lines="full" detail="true">
                        <ion-chip :outline="true" color="primary" slot="start">
                            {{ i + 1 }}
                        </ion-chip>
                        <ion-label>{{ item.model }}<br /><small>{{ item.brand }}</small><br /><small>{{
                            item.plateNum }}</small></ion-label>
                    </ion-item>
                    <ion-item-options>
                        <ion-button @click="goToCarInfo(item.id)" color="success">
                            <ion-icon slot="icon-only" :src="eye"></ion-icon>
                        </ion-button>
                    </ion-item-options>


                </ion-item-sliding>
            </ion-list>



        </ion-content>


    </ion-page>
</template>
    
<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterOutlet, IonMenuButton, IonMenu, IonButton, alertController } from '@ionic/vue';
import { logInOutline, personAddOutline, shieldHalf, homeOutline, eye, carSport, logOutOutline, carSharp } from 'ionicons/icons';
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import router from '@/router';

const cars = reactive({
    Car: []

})

const loggedInUser = ref({
    username: "",
    id: ""
});


function loadRecord() {
    axios.get("http://localhost/crud/availableCars.php")
        .then((response) => {
            cars.Car = response.data;
            console.log(cars.Car);
        });
}


function goToCarInfo(carId) {
    router.push(`/rent/${carId}`);
}

function goToProfile(carId) {
    router.push(`/profile/${carId}`);
}



function logout() {
    localStorage.removeItem("token")
    router.push("/login");
}

onMounted(() => {
    const token = localStorage.getItem("token");
    if (token) {
        loggedInUser.value.username = token;
        loadRecord();
    } else {
        router.push("/login");
    }
});


</script>
    
<style scoped>
ion-avatar {
    --border-radius: 4px;
    margin-top: 20px;
    width: 75%;
    height: 100%;
}

#side-btn {
    width: 250px;
    height: 200px;
}


#side-btn ion-button {
    margin-top: 25px;
    width: 200px;
}

#side-btn ion-icon {
    margin-top: 25px;

}
</style>