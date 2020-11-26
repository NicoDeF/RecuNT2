import { createWebHistory, createRouter } from 'vue-router'

import Formulario from '../components/Formulario.vue'
import Respuestas from '../components/Respuestas.vue'

const routes = [
    { path: '/', name: 'Home', component: Formulario },
    { path: '/formulario', name: 'Formulario', component: Formulario },
    { path: '/respuestas', name: 'Respuestas', component: Respuestas }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router