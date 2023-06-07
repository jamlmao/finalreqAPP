<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/login"></ion-back-button>
                </ion-buttons>
                <ion-title>Sign Up</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-avatar>
                <img src="/assets/avatar.png">
            </ion-avatar>
            <ion-item>
                <ion-label position="floating">Name:</ion-label>
                <ion-input type="text" v-model="inputName" placeholder="Name"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Username:</ion-label>
                <ion-input type="text" v-model="inputUser" placeholder="Username"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Password:</ion-label>
                <ion-input type="text" v-model="inputPass" placeholder="Password"></ion-input>
            </ion-item>
            <ion-button shape="round" expand="full" @click="register()">Submit</ion-button>

        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonAvatar, IonItem, IonLabel, IonInput, IonButton, toastController } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

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
        IonLabel,
        IonInput,
        IonButton
    }, setup() {
        const router = useRouter();

        const navigateToOtherPage = () => {
            router.push('/login');
        }; return {
            navigateToOtherPage
        };
    },
    data() {
        return {
            inputName: '',
            inputUser: '',
            inputPass: ''
        }
    },
    methods: {
        register() {
            if (this.inputName === '') {
                this.toastMessage('Enter a valid name!');
            } else if (this.inputUser === '') {
                this.toastMessage('Enter a valid username!');
            } else if (this.inputPass === '') {
                this.toastMessage('Enter a valid password!');
            } else {
                axios.post("http://localhost/crud/signup.php", null, { params: { "name_": this.inputName, "username": this.inputUser, "passcode": this.inputPass } })
                    .then((response) => {
                        if (response.data.message) {
                            this.inputName = "";
                            this.inputUser = "";
                            this.inputPass = "";



                            this.toastMessage_alert("Your account has been recorded!")
                        } else {
                            this.toastMessage_alert("Unexpected Error!")
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
                duration: 5000,
                buttons: [{
                    side: 'end',
                    text: 'Close',
                    role: 'cancel'
                }],
                position: 'top'
            });

            return toast.present();
        },
        // handler: this.navigateToOtherPage

        async toastMessage_alert(txt) {
            const toast = await toastController.create({
                message: txt.toString(),
                duration: 5000,
                buttons: [{
                    side: 'end',
                    text: 'Close',
                    role: 'cancel',
                    handler: this.navigateToOtherPage
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
    margin: auto;
    width: 60px;
    height: 70px;
}
</style>