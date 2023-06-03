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
                    <img src="/assets/logo2.png">
                </ion-avatar>
                <ion-text>
                    <h1>Car List</h1>
                </ion-text>
            </center>


        </ion-content>


    </ion-page>
</template>
  
<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterOutlet, IonMenuButton, IonMenu, IonButton } from '@ionic/vue';
import { logInOutline, personAddOutline, shieldHalf, homeOutline } from 'ionicons/icons';


</script>
  
<style scoped>
ion-avatar {
    --border-radius: 4px;
    margin-top: 20px;
    width: 75%;
    height: 100%;
}
</style>