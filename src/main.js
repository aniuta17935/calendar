import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue'
import MainPage from './components/MainPage.vue'
import LoginPage from './components/LoginPage.vue'
import RegistrationPage from './components/RegistrationPage.vue'


const routes = [{
        path: '/',
        name: 'MainPage',
        component: MainPage
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/registration',
        name: 'RegistrationPage',
        component: RegistrationPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);
app.use(router);
app.config.lang = 'ua';
app.mount('#app');