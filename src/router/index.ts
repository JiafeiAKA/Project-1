import { createRouter, createWebHistory } from 'vue-router';
import EventListView from '@/views/EventListView.vue';
import LayoutView from '@/views/event/LayoutView.vue';
import CountyDetailView from '@/views/event/CountyDetailView.vue';
import OlympicDetailView from '@/views/event/OlympicDetailView.vue';
import NetworkErrorView from '@/views/NetworkErrorView.vue';
import NotFoundView from '@/views/NotFoundView.vue'
import nProgress from 'nprogress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Event-List-View',
      component: EventListView,
      props: (route) => ({
        page: parseInt(route.query.page?.toString() || '1'),
        pageSize: parseInt(route.query.pageSize?.toString() || '4')
      }),
    },
    {
      path: '/event/:id',
      name: 'event-layout-view',
      component: LayoutView,
      props: true,
      children: [
       {
         path: '',
         name: 'event-detail-view',
         component: CountyDetailView,
         props: true,
       },
       {
         path: 'olympicdetail',
         name: 'event-olympicdetail-view',
         component: OlympicDetailView,
         props: true
       }
      ]
     },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView
    },
    {
      path: '/404/:resource',
      name: '404/resource-view',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    }
  ],
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      return { top: 0 }
    }
  }
})
router.beforeEach(() => {
  nProgress.start()
})
router.afterEach(() => {
  nProgress.done()
})

export default router;
