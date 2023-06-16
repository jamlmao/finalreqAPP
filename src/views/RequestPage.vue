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

                </ion-text>
            </center>
            <ion-card v-for="item, i in cars.Car" v-bind:key="item" color="primary">
                <ion-card-header color="">
                    <h1> <b>Waiting for Approval</b> </h1>
                </ion-card-header>
                <ion-card-content>
                    <ion-item>
                        <ion-label>
                            <h3>Brand: <b> {{ item.brand }}</b></h3>
                        </ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label>
                            <h3> Model: <b> {{ item.model }}</b></h3>
                        </ion-label>
                    </ion-item>

                    <ion-item>
                        <ion-label>
                            <h3> Status: <b> {{ item.status_ }}</b></h3>
                        </ion-label>
                    </ion-item>

                </ion-card-content>
            </ion-card>



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
const loggedInUser = ref({ username: "" });



function loadRecord() {
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("uid")
    axios
        .get("http://localhost/crud/rented_cars.php", {
            params: { userId: uid },
        })
        .then((response) => {
            cars.Car = response.data;
            console.log(cars.Car);
            console.log(uid)
        });
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