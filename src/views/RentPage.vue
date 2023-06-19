<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/main">
                        <ion-icon :src="chevronBack"></ion-icon>
                    </ion-back-button>
                </ion-buttons>
                <ion-title>Rent</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-card v-if="rentedCar" color="secondary">
                <ion-card-header>
                    <ion-card-title>Rented Car Information</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-item>
                        <ion-label>
                            <h1><b>Brand: {{ rentedCar.brand }} </b></h1>
                        </ion-label>
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
            <ion-button color="primary" shape="round" expand="full" size="default" @click="confirmRenting">Request Car to
                Rent</ion-button>
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
    rentTime: '',
});


function updateUserId() {
    const carID = id;
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("uid")
    axios
        .post('http://localhost/crud/update_user_id.php', {
            carID: carID,
            userId: uid
        })
        .then((response) => {
            if (response.data.success) {
                console.log(carID)
                console.log(uid)
            } else {
            }
        })
        .catch((error) => {
            console.error(error);
            showAlert('Error', 'An error occurred while updating the user ID.');
        });
}






function getCarRented() {
    axios.get("http://localhost/crud/car_detailsR.php", { params: { recordid: id } })
        .then((response) => {
            const [cars] = response.data;
            rentedCar.brand = cars.brand;
            rentedCar.model = cars.model;
            rentedCar.plateNum = cars.plateNum;
            rentedCar.status_ = cars.status_;
            rentedCar.rentTime = cars.rentTime;
            if (!checkCarAvailability() && cars.status_ === 'Pending') {
                showAlert('Sorry', 'The car is not available for rent.');
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



async function confirmRenting() {

    const isOccupied = checkCarAvailability();
    if (isOccupied) {

        try {
            await showAlert('Sorry', 'The car is already occupied.');
            return;
        } catch (error) {
            console.log(error);
            return;
        }
    } else {
        const isAvailable = !isOccupied;

        if (isAvailable) {

            updateCarStatus();
            updateUserId();

            try {


                await showAlert('Success', 'Car request sent successfully!');
                return;
            } catch (error) {
                console.log(error);
                return;
            }
        } else {
            try {
                await showAlert('Sorry', 'The car is not available for rent.');
                return;
            } catch (error) {
                console.log(error);
                return;
            }
        }
    }
}


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


const checkCarAvailability = () => {
    const carStatus = rentedCar.status_ || '';
    return carStatus === 'Pending';
};




function updateCarStatus() {
    const carID = id;
    const newStatus = 'Pending';

    axios
        .post('http://localhost/crud/car_status.php', {
            carID: carID,
            status: newStatus
        })
        .then((response) => {
            if (response.data.success) {
                rentedCar.status_ = newStatus;

            } else {

            }
        })
        .catch((error) => {
            console.error(error);
            showAlert('Error', 'An error occurred while updating car status.');
        });
}




</script>
  