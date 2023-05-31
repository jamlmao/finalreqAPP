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
          <ion-button expand="block" size="default" href="/login">
            <ion-label>
              Login / Sign Up
            </ion-label>
          </ion-button>
        </ion-item>
      </ion-list>



      <ion-list>
        <ion-item>
          <ion-icon :src="shieldHalf" size="large"></ion-icon>
          <ion-button expand="block" size="default" href="/admin">
            <ion-label>
              Admin
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
        <ion-title>Lorem Ipsum</ion-title> <!--edit name of app-->
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">

    </ion-content>


  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterOutlet, IonMenuButton, IonMenu, IonButton } from '@ionic/vue';
import { logInOutline, personAddOutline, shieldHalf } from 'ionicons/icons';


</script>

<style scoped></style>