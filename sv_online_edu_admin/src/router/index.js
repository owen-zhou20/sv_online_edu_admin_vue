import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRoutes = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // Dashboard
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'SV Edu Dashboard', icon: 'dashboard' }
    }]
  }]
/**
 * Routes
 */
export const asyncRoutes = [

  // Teacher management
  {
    path: '/edu/teacher',
    component: Layout,
    redirect: '/teacher/table',
    name: 'Teacher Management',
    meta: { title: 'Teacher Management', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'Teacher List',
        component: () => import('@/views/edu/teacher/list'),
        meta: { title: 'Teacher List', icon: 'table' }
      },
      {
        path: 'save',
        name: 'Teacher Add',
        component: () => import('@/views/edu/teacher/save'),
        meta: { title: 'Teacher Add', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: 'Teacher Update',
        component: () => import('@/views/edu/teacher/save'),
        meta: { title: 'Teacher Update', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: 'Subject Management',
    meta: { title: 'Subject Management', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'Subject List',
        component: () => import('@/views/edu/subject/list'),
        meta: { title: 'Subject List', icon: 'table' }
      },
      {
        path: 'save',
        name: 'Subject Import',
        component: () => import('@/views/edu/subject/save'),
        meta: { title: 'Subject Import', icon: 'tree' }
      }
    ]
  },

  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: 'Course Management',
    meta: { title: 'Course Management', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'Course List',
        component: () => import('@/views/edu/course/list'),
        meta: { title: 'Course List', icon: 'table' }
      },
      {
        path: 'courseinfo',
        name: 'Course Add',
        component: () => import('@/views/edu/course/courseinfo'),
        meta: { title: 'Course Add', icon: 'tree' }
      },
      {
        path: 'courseinfo/:id',
        name: 'EduCourseInfoEdit',
        component: () => import('@/views/edu/course/courseinfo'),
        meta: { title: 'Fill in this course infomation', noCache: true },
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: 'EduCourseChapterEdit',
        component: () => import('@/views/edu/course/chapter'),
        meta: { title: 'Create course outline', noCache: true },
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'EduCoursePublishEdit',
        component: () => import('@/views/edu/course/publish'),
        meta: { title: 'Release new course', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/create',
    name: 'Statistics Daily',
    meta: { title: 'Statistics Daily', icon: 'example' },
    children: [
      {
        path: 'create',
        name: 'Create Data',
        component: () => import('@/views/statistics/create'),
        meta: { title: 'Create Data', icon: 'table' }
      },
      {
        path: 'show',
        name: 'Show Data',
        component: () => import('@/views/statistics/show'),
        meta: { title: 'Show Data', icon: 'tree' }
      }
    ]
  },

  {
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    name: 'Access Control',
    meta: { title: 'Access Control', icon: 'chart' },
    children: [
      {
        path: 'user/list',
        name: 'User management',
        component: () => import('@/views/acl/user/list'),
        meta: { title: 'User management' }
      },
      {
        path: 'role/list',
        name: 'Role management',
        component: () => import('@/views/acl/role/list'),
        meta: { title: 'Role management' }
      },
      {
        path: 'role/form',
        name: 'Role form',
        component: () => import('@/views/acl/role/form'),
        meta: { title: 'Role form' },
        hidden: true
      },
      {
        path: 'role/update/:id',
        name: 'Role Update',
        component: () => import('@/views/acl/role/form'),
        meta: { title: 'Role Update' },
        hidden: true
      },
      {
        path: 'role/distribution/:id',
        name: 'Role Menu Assign',
        component: () => import('@/views/acl/role/roleForm'),
        meta: { title: 'Role Menu Assign' },
        hidden: true
      },
      {
        path: 'menu/list',
        name: 'Menu management',
        component: () => import('@/views/acl/menu/list'),
        meta: { title: 'Menu management' }
      },
      {
        path: 'user/add',
        name: 'User Add',
        component: () => import('@/views/acl/user/form'),
        meta: { title: 'User Add' },
        hidden: true
      },
      {
        path: 'user/update/:id',
        name: 'User Modify',
        component: () => import('@/views/acl/user/form'),
        meta: { title: 'User Modify' },
        hidden: true
      },
      {
        path: 'user/role/:id',
        name: 'User Role Assign',
        component: () => import('@/views/acl/user/roleForm'),
        meta: { title: 'User Role Assign' },
        hidden: true
      }

    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// export default new Router({
//   // mode: 'history', //后端支持可开
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap
// })

export default router
