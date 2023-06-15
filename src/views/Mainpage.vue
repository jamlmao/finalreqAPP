<template>
    <ion-page id="main-content">
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <ion-title>Welcome, {{ loggedInUser.username }}!</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <div id="container">
                <center>

                    <img src="/assets/logo.png">

                    <ion-button @click="goToCar()" shape="round" expand="full" size="default">
                        <ion-label>
                            Rent a Car
                        </ion-label>
                    </ion-button>


                    <ion-button shape="round" expand="full" size="default" @click="rentedCars()">
                        <ion-label>
                            Requested Car Status
                        </ion-label>
                    </ion-button>



                    <ion-button shape="round" expand="full" size="default" @click="logout()">
                        <ion-label>
                            Log Out
                        </ion-label>
                    </ion-button>
                </center>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterOutlet, IonMenuButton, IonMenu, IonButton, alertController } from '@ionic/vue';
import { logInOutline, personAddOutline, shieldHalf, homeOutline, eye, carSport, logOutOutline } from 'ionicons/icons';
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import router from '@/router';


const loggedInUser = ref({ username: "", id: "" });


onMounted(() => {
    const token = localStorage.getItem("token");

    if (token) {
        loggedInUser.value.username = token;

        console.log(token)
    } else {
        router.push("/login");
    }
});

function goToCar() {
    router.push("/rent");
}

function rentedCars() {
    router.push("/request");
}



function logout() {
    localStorage.removeItem("token")
    router.push("/login");
}


</script>

<style scoped>
#container {
    --border-radius: 4px;
    margin-top: 70px;
    margin-left: 10%;
    width: 80%;
    height: 100%;
}

#container ion-avatar {
    margin-bottom: 25px;
}

#container ion-button {
    margin-bottom: 10px;
}

img {
    width: 100%;
    height: 100%;
}
</style>
