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
    },
    {
      path: '/collection/:id',
      name: 'collectionid',
      component: CollectionDetailView,
    },
    {
      path: '/record',
      name: 'record',
      component: RecordView,
    },
    {
      path: '/record/:id',
      name: 'recordid',
      component: RecordDetailView,
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
  ],
})

export default router
