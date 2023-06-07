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
                <ion-title>Rent'n Go</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">

            <center>
                <ion-avatar>
                    <img src="/assets/logo.png">
                </ion-avatar>
            </center>
            <ion-card v-if="carInfo">
                <ion-card-header color="secondary">
                    <ion-text>Car Information:</ion-text>
                </ion-card-header>
                <ion-card-content>
                    <ion-item>
                        <ion-text>Horsepower: {{ carInfo.horsepower }}</ion-text>
                    </ion-item>
                    <ion-item>
                        <ion-text>Engine: {{ carInfo.engine_ }}</ion-text>
                    </ion-item>
                    <ion-item>
                        <ion-text>Transmission: {{ carInfo.transmission }}</ion-text>
                    </ion-item>
                    <ion-item>
                        <ion-text>Seatcap: {{ carInfo.seatcap }}</ion-text>
                    </ion-item>
                    <ion-item>
                        <ion-text>Fuel Type: {{ carInfo.fueltype }}</ion-text>
                    </ion-item>
                </ion-card-content>
            </ion-card>

        </ion-content>


    </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardContent, IonItem, IonText } from '@ionic/vue';
import { logInOutline, personAddOutline, shieldHalf, homeOutline, pencil, trash } from 'ionicons/icons';
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const params = useRouter().currentRoute.value.params;
const id = params.id.toString();

const carInfo = reactive({
    horsepower: '',
    engine_: '',
    transmission: '',
    seatcap: '',
    fueltype: '',
});

function getCarInfo() {
    axios.get("http://localhost/crud/car_details.php", { params: { recordid: id } })
        .then((response) => {
            const [car] = response.data;
            carInfo.horsepower = car.horsepower;
            carInfo.engine_ = car.engine_;
            carInfo.transmission = car.transmission;
            carInfo.seatcap = car.seatcap;
            carInfo.fueltype = car.fueltype;
        })
        .catch((error) => {
            console.error(error);
        });
}

onMounted(() => {
    getCarInfo();
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