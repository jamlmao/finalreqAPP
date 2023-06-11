<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/main">
                        <ion-icon :src="chevronBack"></ion-icon>
                    </ion-back-button>
                </ion-buttons>
                <ion-title>Profile</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-card v-if="user">
                <ion-card-header>
                    <ion-card-title>{{ user.name }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-item>
                        <ion-label position="floating">Username</ion-label>
                        <ion-input v-model="user.username" readonly></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="floating">Account Type</ion-label>
                        <ion-input v-model="user.accounttype" readonly></ion-input>
                    </ion-item>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonButton, IonBackButton } from '@ionic/vue';
import axios from 'axios';
import { chevronBack } from 'ionicons/icons';
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const user = ref(null);

const params = useRouter().currentRoute.value.params;
const carId = params?.carId?.toString() || '';

function loadUser() {
    axios
        .get(`http://localhost/crud/user.php?carId=${carId}`)
        .then((response) => {
            user.value = response.data;
        })
        .catch((error) => {
            console.error(error);
        });
}

onMounted(() => {
    loadUser();
});
</script>