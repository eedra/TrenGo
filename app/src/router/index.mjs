import { createRouter, createWebHistory } from 'vue-router'
import homepage from '../views/homepage.vue'
import proposta from '../views/proposte.vue'
import utenti from '../views/utenti.vue'
import newp from '../views/nuovaProposta.vue'
import login from '../views/login.vue'
import modp from '../views/modificaProposta.vue'
import modu from '../views/modificaUtente.vue'
import miep from '../views/mieProposte.vue'
import richiedicambiop from '../views/richiediCambioPassword.vue'
import cambiop from '../views/cambioPassword.vue'
import notifiche from '../views/notifiche.vue'
import signup from '../views/signup.vue'
import valutap from '../views/valutaProposte.vue'
import listachats from '../views/listaChat.vue'
import chat from '../views/chat.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
	{
    	path: '/',
      	name: 'home',
      	component: homepage
    },
    {
     	path: '/proposte/:id',
      	name: 'proposte',
      	component: proposta
    },
    {
      	path: '/proposte/crea',
      	name: 'nuova proposta',
      	component: newp
    },
    {
      	path: '/proposte/modifica/:id',
      	name: 'modifica proposta',
      	component: modp
    },
    {
      	path: '/proposte/mie',
      	name: 'mie proposte',
      	component: miep
    },
    {
      	path: '/utenti/:username',
      	name: 'utenti',
      	component: utenti
    },
    {
      	path: '/utenti/modifica',
      	name: 'modifica utente',
      	component: modu
    },
    {
      	path: '/login',
      	name: 'login',
      	component: login
    },
	{
		path: '/passworddimenticata',
		name: 'richiedi cambio password',
		component: richiedicambiop
  	},
	{
		path: '/cambiopassword/:token',
		name: 'cambio password',
		component: cambiop
  	},
	{
		path: '/notifiche/',
		name: 'notifiche',
		component: notifiche
	},
	{
		path: '/signup',
		name: 'signup',
		component: signup
	},
	{
		path: '/valutazioni/:idProposta',
		name: 'valutazioni',
		component: valutap
	},
	{
		path: '/chats',
		name: 'listachats',
		component: listachats
	},
	{
		path: '/chats/:idChat',
		name: 'chat',
		component: chat
	}
  ]
})

export default router
