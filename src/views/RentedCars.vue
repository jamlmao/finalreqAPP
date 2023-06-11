<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/main">
                        <ion-icon :src="chevronBack"></ion-icon>
                    </ion-back-button>
                </ion-buttons>
                <ion-title>Rented Cars</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">


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

</script>