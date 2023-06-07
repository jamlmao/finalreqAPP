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
            </center>

            <ion-item>
                <ion-icon :src="person"></ion-icon>
                <ion-input type="text" v-model="inputUsername" placeholder="Username"></ion-input>
            </ion-item>

            <ion-item>
                <ion-icon :src="lockClosed"></ion-icon>
                <ion-input type="password" v-model="inputPassword" placeholder="Password"></ion-input>
            </ion-item>

            <center>
                <ion-button shape="round" expand="full" @click="login">Login</ion-button>
                <ion-button shape="round" expand="full" fill="outline" href="/reg">Sign Up</ion-button>
            </center>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonAvatar, IonItem, IonInput, toastController } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';
import { logInOutline, personAddOutline, chevronBack, person, lockClosed } from 'ionicons/icons';
import { RouteRecord } from 'vue-router';

export default defineComponent({
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        IonButton,
        IonAvatar,
        IonItem,
        IonInput,
    },
    data() {
        return {
            inputUsername: '',
            inputPassword: '',
            isLoggedIn: false,
        };
    },
    setup() {
        return {
            person,
            lockClosed,
            chevronBack,
        };
    },
    created() {
        this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check if user is logged in on component creation
    },
    methods: {
        login() {
            if (this.inputUsername === '' || this.inputPassword === '') {
                this.toastMessage('Invalid Username or Password!');
            } else {
                axios
                    .post('http://localhost/crud/login.php', null, {
                        params: { username: this.inputUsername, passcode: this.inputPassword },
                    })
                    .then((response) => {
                        if (response.data.message === 'success') {
                            this.isLoggedIn = true; // Set isLoggedIn to true
                            localStorage.setItem('isLoggedIn', 'true'); // Save isLoggedIn to localStorage
                            this.toastMessage('Login Successful!');
                            this.$router.push('/main');
                        } else {
                            this.toastMessage('Invalid Username or Password!');
                        }
                    })
                    .catch(function (error) {
                        alert(error);
                    });
            }
        },
        async toastMessage(txt) {
            const toast = await toastController.create({
                message: txt.toString(),
                duration: 2000,
                buttons: [
                    {
                        side: 'end',
                        text: 'Close',
                        role: 'cancel',
                    },
                ],
                position: 'top',
            });

            return toast.present();
        },
        goBack() {
            this.$router.back();
        },
    },
});
</script>
  
<style scoped>
ion-avatar {
    --border-radius: 4px;
    margin-top: 20px;
    width: 75%;
    height: 100%;
}
</style>