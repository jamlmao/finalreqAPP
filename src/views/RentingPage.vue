<template>
    <ion-page id="main-content">
        <ion-header>
            <ion-toolbar color="primary">
                <ion-button slot="start" href="/main">
                    <ion-icon :src="chevronBack"></ion-icon>
                </ion-button>
                <ion-title>Rent'n Go</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <center>
                <ion-avatar>
                    <img src="/assets/logo.png">
                </ion-avatar>
            </center>
            <ion-card color="secondary">
                <ion-card-content>
                    <ion-item lines="full">
                        <ion-item>
                            <ion-text>Brand: {{ carmodel.brand }}</ion-text>
                        </ion-item>
                        <ion-item lines="full">
                            <h3>Model: {{ carmodel.model }}</h3>
                        </ion-item>
                    </ion-item>
                </ion-card-content>
            </ion-card>
            <ion-card v-if="carInfo" color="secondary">
                <ion-card-header>
                    <ion-text>Car Information:</ion-text>
                </ion-card-header>
                <ion-card-content>
                    <ion-item lines="full">
                        <ion-text>Horsepower: {{ carInfo.horsepower }}</ion-text>
                    </ion-item>
                    <ion-item lines="full">
                        <ion-text>Engine: {{ carInfo.engine_ }}</ion-text>
                    </ion-item>
                    <ion-item lines="full">
                        <ion-text>Transmission: {{ carInfo.transmission }}</ion-text>
                    </ion-item>
                    <ion-item lines="full">
                        <ion-text>Seatcap: {{ carInfo.seatcap }}</ion-text>
                    </ion-item>
                    <ion-item lines="full">
                        <ion-text>Fuel Type: {{ carInfo.fueltype }}</ion-text>
                    </ion-item>
                </ion-card-content>
            </ion-card>
            <ion-button v-if="carInfo" expand="block" size="default"
                :disabled="buttonDisabled.rent || buttonDisabled.unrent" @click="handleRentButton">
                <ion-label>
                    {{ carInfo.status === 'Occupied' ? 'Unrent' : 'Rent' }}
                </ion-label>
            </ion-button>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardContent, IonItem, IonText } from '@ionic/vue';
import { logInOutline, personAddOutline, shieldHalf, homeOutline, chevronBack } from 'ionicons/icons';
import { onMounted, reactive, ref, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const params = useRouter().currentRoute.value.params;
const id = params.id.toString();

const buttonDisabled = reactive({
    rent: false,
    unrent: false,
});

const carInfo = reactive({
    horsepower: '',
    engine_: '',
    transmission: '',
    seatcap: '',
    fueltype: '',
    status: '',
});

const carmodel = reactive({
    model: '',
    brand: '',
});

function getCarInfo() {
    axios
        .get('http://localhost/crud/car_details.php', { params: { recordid: id } })
        .then((response) => {
            const [car] = response.data;
            carInfo.horsepower = car.horsepower;
            carInfo.engine_ = car.engine_;
            carInfo.transmission = car.transmission;
            carInfo.seatcap = car.seatcap;
            carInfo.fueltype = car.fueltype;

            if (sessionStorage.getItem('rentedCar')) {
                buttonDisabled.rent = true;
                carInfo.status = 'Occupied';
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

function getCar() {
    axios
        .get('http://localhost/crud/car_rentingpage.php', { params: { recordid: id } })
        .then((response) => {
            const [cars] = response.data;
            carmodel.brand = cars.brand;
            carmodel.model = cars.model;
        })
        .catch((error) => {
            console.error(error);
        });
}

function handleRentButton() {
    if (carInfo.status !== 'Available') {
        const confirmed = window.confirm('Are you sure you want to unrent this car?');
        if (confirmed) {
            handleUnrentButton();
        }
    } else {
        const confirmed = window.confirm('Are you sure you want to rent this car?');
        if (confirmed) {
            buttonDisabled.rent = true;
            axios
                .post('http://localhost/crud/car_status.php', { carID: id, status: 'Occupied' })
                .then((response) => {
                    carInfo.status = 'Occupied';
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    buttonDisabled.rent = false;
                    buttonDisabled.unrent = false;
                });
        }
    }
}

function handleUnrentButton() {
    buttonDisabled.unrent = true;
    axios
        .post('http://localhost/crud/car_status.php', { carID: id, status: 'Available' })
        .then((response) => {
            carInfo.status = 'Available';
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            buttonDisabled.rent = false;
            buttonDisabled.unrent = false;
        });

    sessionStorage.removeItem('rentedCar');
}

function setRentButtonLabel() {
    rentButtonLabel = carInfo.status === 'Occupied' ? 'Unrent' : 'Rent';
}

watch(carInfo, () => {
    buttonDisabled.rent = carInfo.status === 'Occupied';
});

onMounted(() => {
    getCarInfo();
    getCar();
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