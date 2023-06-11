<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/main">
                        <ion-icon :src="chevronBack"></ion-icon>
                    </ion-back-button>
                </ion-buttons>
                <ion-title>UnRent</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-card v-if="rentedCar" color="secondary">
                <ion-card-header>
                    <ion-card-title>Rented Car Information</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-item>
                        <ion-label>Brand: {{ rentedCar.brand }}</ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label>Model: {{ rentedCar.model }}</ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label>Plate Number: {{ rentedCar.plateNum }}</ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label>Status: {{ rentedCar.status_ }}</ion-label>
                    </ion-item>
                </ion-card-content>
            </ion-card>
            <ion-card v-if="carInfo" color="secondary">
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
            <ion-button color="danger" shape="round" expand="full" size="default" @click="Unrent">Unrent</ion-button>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonButton, IonBackButton, alertController } from '@ionic/vue';
import axios from 'axios';
import { chevronBack } from 'ionicons/icons';
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import router from '@/router';

const params = useRouter().currentRoute.value.params;
const id = params?.id?.toString() || '';

const carInfo = reactive({
    horsepower: '',
    engine_: '',
    transmission: '',
    seatcap: '',
    fueltype: '',
});

const rentedCar = reactive({
    brand: '',
    model: '',
    plateNum: '',
    status_: '',
});

function getCarRented() {
    axios.get("http://localhost/crud/car_detailsR.php", { params: { recordid: id } })
        .then((response) => {
            const [cars] = response.data;
            rentedCar.brand = cars.brand;
            rentedCar.model = cars.model;
            rentedCar.plateNum = cars.plateNum;
            rentedCar.status_ = cars.status_;

            if (!checkCarAvailability() && cars.status_ === 'Available') {
                showAlert('Sorry', 'The car is  available for rent.');
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

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
    getCarRented();
});
const showAlert = async (header, message) => {
    const alert = await alertController.create({
        header: header,
        message: message,
        buttons: [
            {
                text: "Ok",
                handler: () => {
                    alert.dismiss().then(() => {
                        router.go(-1);
                    });
                }
            }
        ],
    });
    await alert.present();
};
const brand = ref(sessionStorage.getItem('rentedCarBrand') || '');
const model = ref(sessionStorage.getItem('rentedCarModel') || '');

function Unrent() {
    const isAvailable = checkCarAvailability();

    if (isAvailable) {
        showAlert('Sorry', 'The car is already occupied.');
    } else {
        const isOccupied = !isAvailable;

        if (isOccupied) {
            updateCarStatus();
            showAlert('Success', 'Car unrent successfully!');
        } else {
            showAlert('Sorry', 'The car is available for rent.');
        }
    }
}

const checkCarAvailability = () => {
    const carStatus = rentedCar.status_ || '';
    return carStatus === 'Available';
};

function updateCarStatus() {
    const carID = id;
    const newStatus = 'Available';

    axios
        .post('http://localhost/crud/car_status.php', {
            carID: carID,
            status: newStatus
        })
        .then((response) => {
            if (response.data.success) {
                rentedCar.status_ = newStatus;
                showAlert('Success', 'Car unrent successfully!');
            } else {
                showAlert('Error', 'Failed to update car status.');
            }
        })
        .catch((error) => {
            console.error(error);
            showAlert('Error', 'An error occurred while updating car status.');
        });
}
</script>
  