import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: ()=>import('../components/login/loginComponent.vue')
    },
    {
      path: '/home',
      name: 'home',
    
      component: () => import('../components/homePage/homeComponent.vue'),
      meta:{requireAuth:true}
    },
    {
      path: '/register',
      name: 'register',
      
      component: () => import('../components/register/registerComponent.vue')
    },
  ]
})

//token
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

//=> Nprogress
router.beforeResolve((to,from,next)=>{
  if(to.name){
    NProgress.start()
  }
  next()
})
router.afterEach((to,from)=>{
  NProgress.done()
})

export default router
