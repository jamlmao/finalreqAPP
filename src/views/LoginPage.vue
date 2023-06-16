<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-button v-if="isLoggedIn" @click="goBack">
                        <ion-icon :src="chevronBack" size="default"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title>Login</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <center>
                <ion-avatar>
                    <img src="/assets/logo.png">
                </ion-avatar>
                <ion-text>
                    <h1>
                        <bold>Good Day Gearheads!</bold>
                    </h1>
                </ion-text>
            </center>




            <ion-item>
                <ion-icon :src="person"></ion-icon>
                <ion-input v-model="user.username" placeholder="Username"></ion-input>
            </ion-item>

            <ion-item>
                <ion-icon :src="lockClosed"></ion-icon>
                <ion-input v-model="user.password" type="password" placeholder="Passcode"></ion-input>
            </ion-item>

            <center>
                <ion-button shape="round" expand="full" @click="login()">Login</ion-button>
                <ion-button shape="round" color="medium" expand="full" size="default" href="/reg">
                    <ion-label>
                        <p>Create Account</p>
                    </ion-label>
                </ion-button>
            </center>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonAvatar, IonItem, IonInput, toastController, alertController } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';
import { logInOutline, personAddOutline, chevronBack, person, lockClosed } from 'ionicons/icons';
import { reactive } from 'vue';
import { RouteRecord } from 'vue-router';
import router from '@/router';

const user = reactive(
    {
        username: "",
        password: "",
        id: ""
    }
)

function login() {
    axios.post("http://localhost/crud/login.php", user)
        .then(async (response) => {
            if (response.data.status == 1) {


                if (response.data.accounttype == "User") {
                    localStorage.setItem("token", user.username);
                    localStorage.setItem("uid", response.data.id);
                    router.push(`/main`);
                } else {
                    router.push("/login");
                }
            } else {
                const alert = await alertController.create({
                    header: "Login Failed",
                    message: "Invalid username and password!",
                    buttons: [
                        {
                            text: "Ok",
                            handler: () => {
                                alert.dismiss();
                            }
                        }
                    ]
                });

                alert.present();
            }
        })
        .catch((error) => {
            console.log("Error");
        });
}


</script>
  
<style scoped>
ion-avatar {
    --border-radius: 4px;
    margin-top: 20px;
    width: 75%;
    height: 100%;
}
</style>