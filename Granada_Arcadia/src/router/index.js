import RecordView from '@/views/RecordView.vue'
import CollectionView from '@/views/CollectionView.vue'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import CollectionDetailView from '@/views/CollectionDetailView.vue'
import RecordDetailView from '@/views/RecordDetailView.vue'
import SearchView from '@/views/SearchView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/collection',
      name: 'collection',
      component: CollectionView,
      meta: { title: 'Colecciones' },
    },
    {
      path: '/collection/:id',
      name: 'collectionid',
      component: CollectionDetailView,
      meta: { title: 'Detalle de Colección' },
    },
    {
      path: '/record',
      name: 'record',
      component: RecordView,
      meta: { title: 'Registros' },
    },
    {
      path: '/record/:id',
      name: 'recordid',
      component: RecordDetailView,
      meta: { title: 'Detalle de Registro' },
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: { title: 'Inicio' },
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
      meta: { title: 'Búsqueda' },
    },
  ],
})
router.afterEach((to) => {
  document.title = to.meta.title || 'Licium Classic'
})
export default router
