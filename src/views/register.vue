<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/"></ion-back-button>
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
                <ion-input type="password" v-model="inputPass" placeholder="Password"></ion-input>
            </ion-item>
            <ion-button shape="round" expand="full" @click="register()">Submit</ion-button>
        </ion-content>
    </ion-page>
</template>
  
<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonAvatar, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';
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
                this.showAlert('Enter a valid name!');
            } else if (this.inputUser === '') {
                this.showAlert('Enter a valid username!');
            } else if (this.inputPass === '') {
                this.showAlert('Enter a valid password!');
            } else {
                axios.post().then
            }
        },
        showAlert(message) {
            window.alert(message);
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