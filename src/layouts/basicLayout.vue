<template>
  <div class="basic-layout">
    <c-menu
      :list="menu"
    />
    <div class="content">
      <div class="header">
        <div class="avatar">
          <a-dropdown placement="bottomLeft">
            <div class="user">
              <a-avatar>
                <template #icon>
                  <UserOutlined />
                </template>
              </a-avatar>
              <span class="name">{{user.name || ''}}</span>
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="logout">退出登录</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
      <div class="body">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed  } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { UserOutlined } from '@ant-design/icons-vue';
import CMenu from '@components/c-menu'
import { ROUTE } from '@router/menu'
import { filterMenu } from '@utils/util'

export default defineComponent({
  name: 'basicLayout',
  components: {
    CMenu,
    UserOutlined
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const menu = ref([]);         //菜单列表
    const user = computed(() => store.state.app.user);              // 用户信息
    const permission = computed(() => store.state.app.permission); // 权限

    // 初始化时，获取用户信息、权限等
    const getUserInfo = () => {
      if(store.state.app.user && store.state.app.user.id) return
      let p = [
        { type: 'menu', path: '/report', key: '' },
        { type: 'btn', path: '/report', key: 'add' },
        { type: 'btn', path: '/report', key: 'delete' },
        { type: 'btn', path: '/report', key: 'export' },
        { type: 'menu', path: '/setting/user/add' },
        { type: 'menu', path: '/setting/user/edit' },
        { type: 'menu', path: '/setting/user/delete' },
        { type: 'menu', path: '/setting/role' },
        { type: 'menu', path: '/login' },
      ], a = {};
      p.filter(item => item.type === 'btn').forEach(item => {
        if(a[item.path]) {
          a[item.path][item.key] = true
        } else {
          a[item.path] = {}
        }
      })
      store.commit('app/setUser', {
        user: { id: 1186, name: '张三' },
        permission: p,
        auth: a
      })
    }
    getUserInfo();

    // 按权限过滤菜单,转一下json，避免对象原型修改
    let m = JSON.parse(JSON.stringify(ROUTE[0].children)),
    permi = permission.value.filter(item => item.type === 'menu'),
    list = filterMenu(m, permi);
    menu.value = list;

    // 菜单权限控制，路由拦截。注意，组件内部拦截，刷新界面、输入地址时，钩子函数不会触发
    const controlMenu = () => {
      // 刷新界面、输入地址时，校验权限
      let flag =  permission.value.some(item => item.path === window.location.pathname);
      if(!flag) {
        router.push('/login')
      }
      router.beforeEach((to, from, next) => {
        let flag =  permission.value.some(item => item.path === to.path);
        if(flag) {
          next();
        } else {
          router.push('/login')
        }
      })
    };
    // 退出登录
    const logout = () => {
      router.push('/login')
    };
    controlMenu();

    return {
      menu,
      user,
      logout
    }
  }
})
</script>

<style lang="less" scoped>
.basic-layout {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  .content {
    width: 100%;
    .header {
      height: 50px;
      position: relative;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
      .avatar {
        position: absolute;
        right: 10px;
        line-height: 50px;
        cursor: pointer;
        .name {
          padding: 0 10px;
        }
      }
    }
    .body {
      padding: 10px;
    }
  }
}
</style>
