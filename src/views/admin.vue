<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-button href="/">
                        <ion-icon :src="chevronBack" size="default"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title>Login</ion-title> <!--edit name of app-->
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <center>
                <ion-avatar>
                    <img src="/assets/avatar.png">
                </ion-avatar>
            </center>

            <ion-item>
                <ion-icon :src="person"></ion-icon>
                <ion-input type="text" placeholder="Username"></ion-input>
            </ion-item>

            <ion-item>
                <ion-icon :src="lockClosed"></ion-icon>
                <ion-input type="text" placeholder="Password"></ion-input>
            </ion-item>

            <center>
                <ion-button shape="round" expand="full">Login</ion-button>
            </center>


        </ion-content>
    </ion-page>
</template>


<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterOutlet, IonMenuButton, IonMenu, IonButton, IonAvatar } from '@ionic/vue';
import { logInOutline, personAddOutline, chevronBack, person, lockClosed } from 'ionicons/icons';


</script>

<style scoped>
ion-avatar {
    --border-radius: 4px;
    margin-top: 20px;
    width: 60px;
    height: 70px;
}
</style>