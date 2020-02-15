export default {
    router:{
        path: 'user/user',
        name: 'userUser',
        meta: {
            title: '管理',
            auth: true
        },
        component: _import('user/user/page')
    },
    menu: {
        path: '/user/user',
        title: '管理'
    }
}