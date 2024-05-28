import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import CunHome from '../views/CunHome.vue';
import CunComponents from '../views/CunComponents.vue'

import docs from '../docs';
const routes: Array<RouteRecordRaw> =[
    {path: '/', name: 'V-CunHome', component: CunHome},
    {
        path: '/Components',
        name: 'V-CunComponents',
        component: CunComponents,
        children: docs
        
    }
]
const router = createRouter({
    history:createWebHashHistory(),
    routes
});

export default router;