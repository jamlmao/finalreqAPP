<template>
    <ion-menu content-id="main-content">
        <ion-header>
            <ion-toolbar color="primary">
                <ion-text> Good Day Gearheads!</ion-text>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">

            <ion-list>
                <ion-item>
                    <ion-icon :src="logInOutline" size="large"></ion-icon>
                    <ion-button expand="block" size="default" href="/">
                        <ion-label>
                            Rent
                        </ion-label>
                    </ion-button>
                </ion-item>
            </ion-list>



            <ion-list>
                <ion-item>
                    <ion-icon :src="shieldHalf" size="large"></ion-icon>
                    <ion-button expand="block" size="default" href="/">
                        <ion-label>
                            Profile
                        </ion-label>
                    </ion-button>
                </ion-item>
            </ion-list>

            <ion-list>
                <ion-item>
                    <ion-icon :src="homeOutline" size="large"></ion-icon>
                    <ion-button expand="block" size="default" href="/">
                        <ion-label>
                            Go back
                        </ion-label>
                    </ion-button>
                </ion-item>
            </ion-list>


        </ion-content>
    </ion-menu>


    <ion-page id="main-content">
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <ion-title>Rent'n Go</ion-title> <!--edit name of app-->
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <center>
                <ion-avatar>
                    <img src="/assets/logo.png">
                </ion-avatar>
                <ion-text>
                    <h1>Car List</h1>
                </ion-text>
            </center>
            <ion-list>
                <ion-item-sliding v-for="item, i in cars.Car" v-bind:key="item">
                    <ion-item :href="`${'/view/' + item.id}`" lines="full" detail="true" button>
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
                        <ion-button color="danger" @click="goToCarRent(item.id)"><ion-icon slot="icon-only"
                                :src="carSport"></ion-icon></ion-button>
                    </ion-item-options>


                </ion-item-sliding>
            </ion-list>



        </ion-content>


    </ion-page>
</template>
  
<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterOutlet, IonMenuButton, IonMenu, IonButton, alertController } from '@ionic/vue';
import { logInOutline, personAddOutline, shieldHalf, homeOutline, eye, carSport } from 'ionicons/icons';
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import router from '@/router';

const cars = reactive({
    Car: []

})

async function toastMessage(txt: string) {

    const toast = await toastController.create({
        message: txt.toString(),
        duration: 2000,
        position: "middle"
    });

    return toast.present();

}


function loadRecord() {
    axios.get("http://localhost/crud/cars.php")
        .then((response) => {
            cars.Car = response.data;
            console.log(cars.Car);
        });
}


function goToCarInfo(carId) {
    router.push(`/view/${carId}`);
}
function goToCarRent(carId) {
    router.push(`/rent/${carId}`);
}

onMounted(() => {
    loadRecord();
});



</script>
  
<style scoped>
ion-avatar {
    --border-radius: 4px;
    margin-top: 20px;
    width: 75%;
    height: 100%;
}
</style>