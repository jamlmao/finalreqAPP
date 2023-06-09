<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/main">
                        <ion-icon :src="chevronBack"></ion-icon>
                    </ion-back-button>
                </ion-buttons>
                <ion-title>Rent Confirmation</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-card color="secondary">
                <ion-card-header>
                    <ion-card-title>Rented Car Information</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-item>
                        <ion-label>Brand: {{ carmodel.brand }}</ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label>Model: {{ carmodel.model }}</ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-button @click="confirmRenting">Confirm Rent</ion-button>
                    </ion-item>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonButton, IonBackButton } from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const params = useRouter().currentRoute.value.params;
const id = params?.id?.toString() || '';

const carmodel = computed(() => {
    return {
        brand: sessionStorage.getItem('rentedCarBrand') || '',
        model: sessionStorage.getItem('rentedCarModel') || ''
    };
});

const confirmRenting = () => {
    const isOccupied = checkCarAvailability(); // Check car availability

    if (isOccupied) {
        alert("The car is already occupied.");
    } else {
        updateCarStatus(); // Update car status
        alert("Car rented successfully!");
    }
};

const checkCarAvailability = () => {
    // Check car availability logic
    // You can use your own implementation here
    // Return true if car is occupied, false otherwise
    // For demonstration, let's assume car is occupied if its status is "occupied"
    const carStatus = sessionStorage.getItem('rentedCarStatus') || '';
    return carStatus.toLowerCase() === 'occupied';
};

const updateCarStatus = () => {
    // Update car status logic
    // You can use your own implementation here
    // For demonstration, let's assume we update the status to "occupied"
    sessionStorage.setItem('rentedCarStatus', 'occupied');
};
</script>