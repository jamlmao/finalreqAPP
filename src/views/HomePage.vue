<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-title>
          <center>Rent N GO!</center>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large"></ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <img src="assets/logo.png">

        <ion-label>
          <ion-text>
            <h1 id="test1">
              <bold>Good Day Gearheads!</bold>
            </h1>
          </ion-text>
        </ion-label>

        <div id="btn">
          <ion-item>

            <ion-button expand="block" size="default" href="/login">
              <ion-icon :src="logInOutline" size="large"></ion-icon>
              <ion-lable>
                Log in
              </ion-lable>
            </ion-button>


            <ion-button color="medium" expand="block" size="default" href="/reg">
              <ion-lable>
                <p>Create Account</p>
              </ion-lable>
            </ion-button>
          </ion-item>
        </div>



      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { logInOutline } from 'ionicons/icons';
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 25%;
  transform: translateY(-50%);
}

#container img {
  margin-top: 25%;
  margin-left: 5%;
  width: 70%;
  height: 80%;
}

#btn {
  margin-top: 15%;
  margin-left: 10%;
  width: 100%;
  height: 60%;
}

#container h1 {
  margin-top: auto;
  margin-left: 5%;
}

#container p {
  color: #2d3142;

}
</style>