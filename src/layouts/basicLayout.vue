<template>
  <div class="basic-layout">
    <c-menu
      :list="menu.list"
      :active="menu.activeKey"
      :actives="menu.activeKeys"
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
import { defineComponent, reactive, computed  } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { CMenu } from '@components/index.js'
import { UserOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { ROUTE } from '@router/menu'
import { filterMenu, getMenuKeys } from '@utils/util'
import { getUserInfo, getUserInfoMock } from "@api/login";

export default defineComponent({
  name: 'basicLayout',
  components: {
    CMenu,
    UserOutlined
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    let menu = reactive({     //菜单
      activeKey: '',
      activeKeys: '',
      list: []
    });
    const user = computed(() => store.state.app.user);              // 用户信息
    const permission = computed(() => store.state.app.permission); // 权限
    console.log(user)

    // 初始化时，获取用户信息、权限等
    const getUserInfoFunc = async () => {
      try {
        const user = await getUserInfo();
        const res = await getUserInfoMock();
        if(user.code === 200) {
          let auth = {}, perm = res.data.permission, to = res.data.token;
          perm.filter(item => item.type === 'btn').forEach(item => {
            if(auth[item.path]) {
              auth[item.path][item.key] = true
            } else {
              auth[item.path] = {
                [item.key]: true
              }
            }
          })
          store.commit('app/setUser', {
            user: { ...user.data },
            permission: perm,
            auth,
            token: to
          })
          
          // 刷新界面、输入地址时，校验权限
          let flag =  perm.some(item => item.path === window.location.pathname);
          if(!flag) {
            router.push('/login')
          }

          // 按权限过滤菜单,转一下json，避免对象原型修改, 默认菜单数据
          let m = JSON.parse(JSON.stringify(ROUTE[0].children)),
          permi = perm.filter(item => item.type === 'menu'),
          list = filterMenu(m, permi);
          let actives = getMenuKeys(ROUTE[0].children, window.location.pathname)
          menu.list = [...list];
          menu.activeKey = actives.activeKey;
          menu.activeKeys = actives.activeKeys;
        } else {
          message.error(user.msg);
        }
      } catch (error) {
        console.log('error', error);
        message.error(error)
      }
    }
    // 退出登录
    const logout = () => {
      store.commit('app/setToken', '')
      router.push('/login')
    };

    getUserInfoFunc();
    // 通过权限，监控路由
    router.beforeEach((to, from, next) => {
      // let flag = permission.value.some(item => item.path === to.path);
      let flag = true
      if(flag) {
        next();
      } else {
        router.push('/login')
      }
    });

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
