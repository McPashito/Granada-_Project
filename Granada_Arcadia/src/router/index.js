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
      path: '/collection', // 1. La URL
      name: 'collection', // 2. Un nombre identificador
      component: CollectionView, // 3. El componente Vue que se muestra
    },
    {
      path: '/collection/:id', // 1. La URL
      name: 'collectionid', // 2. Un nombre identificador
      component: CollectionDetailView, // 3. El componente Vue que se muestra
    },
    {
      path: '/record', // 1. La URL
      name: 'record', // 2. Un nombre identificador
      component: RecordView, // 3. El componente Vue que se muestra
    },
    {
      path: '/record/:id', // 1. La URL
      name: 'recordid', // 2. Un nombre identificador
      component: RecordDetailView, // 3. El componente Vue que se muestra
    },
    {
      path: '/', // 1. La URL
      name: 'Home', // 2. Un nombre identificador
      component: HomeView, // 3. El componente Vue que se muestra
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
  ],
})

export default router
