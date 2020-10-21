import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: 'home' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../view/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                //系统管理
                {
                    path: '/dataStat',
                    component: () => import(/* webpackChunkName: "icon" */ '../view/sys/DataStat.vue'),
                    meta: { title: '数据统计' }
                },
                {
                    path: '/authority',
                    component: () => import(/* webpackChunkName: "icon" */ '../view/sys/Authority.vue'),
                    meta: { title: '权限管理' }
                },
                {
                    path: '/log',
                    component: () => import(/* webpackChunkName: "icon" */ '../view/sys/Log.vue'),
                    meta: { title: '日志管理' }
                },
                //收费管理
                {
                    path: '/chargeBill',
                    component: () => import(/* webpackChunkName: "icon" */ '../view/yl/ChargeBill.vue'),
                    meta: { title: '收费记录' }
                },
                //餐饮管理
                {
                    path: '/kitchen',
                    component: () => import(/* webpackChunkName: "icon" */ '../view/eat/Kitchen.vue'),
                    meta: { title: '菜品制作记录' }
                },
                {
                    path: '/EatPrice',
                    component: () => import(/* webpackChunkName: "icon" */ '../view/eat/EatPrice.vue'),
                    meta: { title: '套餐列表' }
                },
                //住宿管理
                {
                    path: '/bed',
                    component: () => import(/* webpackChunkName: "icon" */ '../view/stay/Bed.vue'),
                    meta: { title: '床位' }
                },
                {
                    path: '/floor',
                    component: () => import(/* webpackChunkName: "icon" */ '../view/stay/Floor.vue'),
                    meta: { title: '楼层' }
                },
                {
                    path: '/build',
                    component: () => import(/* webpackChunkName: "icon" */ '../view/stay/Build.vue'),
                    meta: { title: '楼房' }
                },
                {
                    path: '/room',
                    component: () => import(/* webpackChunkName: "icon" */ '../view/stay/Room.vue'),
                    meta: { title: '房间' }
                },
                //健康管理
                {
                    path: '/healAss',
                    component: () => import(/* webpackChunkName: "icon" */ '../view/ill/HealAss.vue'),
                    meta: { title: '体检报告' }
                },
                {
                    path: '/illHistory',
                    component: () => import(/* webpackChunkName: "icon" */ '../view/ill/IllHistory.vue'),
                    meta: { title: '病史记录' }
                },
                {
                    path: '/illRecord',
                    component: () => import(/* webpackChunkName: "icon" */ '../view/ill/IllRecord.vue'),
                    meta: { title: '生病记录' }
                },
                {
                    path: '/phyExam',
                    component: () => import(/* webpackChunkName: "icon" */ '../view/ill/PhyExam.vue'),
                    meta: { title: '健康评估' }
                },
                //老人管理
                {
                    path: '/opeople',
                    component: () => import(/* webpackChunkName: "icon" */ '../view/opeople/Opeople.vue'),
                    meta: { title: '老人' }
                },
                //错误
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },

        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
