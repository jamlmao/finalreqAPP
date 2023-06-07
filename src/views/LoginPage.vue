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
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonAvatar, IonItem, IonInput, IonToast, IonButton, toastController } from '@ionic/vue';
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
        IonBackButton,
        IonAvatar,
        IonItem,
        IonInput,
        IonButton,
        IonToast
    },
    data() {
        return {
            inputUsername: '',
            inputPassword: ''
        }
    },
    setup() {
        return {
            person,
            lockClosed,
            chevronBack
        }
    },
    methods: {
        login() {
            if (this.inputUsername === '') {
                this.toastMessage('Invalid Username or Password!');
            } else if (this.inputPassword === '') {
                this.toastMessage('Invalid Username or Password!');
            } else {
                axios.post("http://localhost/crud/login.php", null, { params: { "username": this.inputUsername, "passcode": this.inputPassword } })
                    .then((response) => {
                        if (response.data.message == "success") {
                            alert("Login Successfully!")
                            this.$router.push('/main');
                        } else {
                            alert("Invalid Username or Password!")
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
                buttons: [{
                    side: 'end',
                    text: 'Close',
                    role: 'cancel'
                }],
                position: 'top'
            });

            return toast.present();
        }
    }
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






<style scoped>
ion-avatar {
    --border-radius: 4px;
    margin-top: 20px;
    width: 75%;
    height: 100%;
}
</style>