<template>
  <div class="login-page">
    <div class="login">
      <a-form 
        ref="loginForm"
        :model="formData"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="账号" name="username">
          <a-input
            style="width: 206px"
            v-model:value="formData.username"
          />
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input
            style="width: 206px"
            v-model:value="formData.password"
          />
        </a-form-item>
        <div class="item">
          <a-button class="btn" type="primary" @click="login">登陆</a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'login',
  setup() {
    const store = useStore();
    const router = useRouter();
    const loginForm = ref();
    const formData = reactive({
      username: '',
      password: ''
    });
    const rules = {
      username: [{required: true, message: '请填写账号'}],
      password: [{required: true, message: '请填写密码'}]
    };

    // 登陆
    const login = () => {
      loginForm.value.validate().then((v) => {
        let permission = [
            { type: 'menu', path: '/report', key: '' },
            { type: 'btn', path: '/report', key: 'add' },
            { type: 'btn', path: '/report', key: 'delete' },
            { type: 'btn', path: '/report', key: 'export' },
            { type: 'menu', path: '/setting/user/add' },
            { type: 'menu', path: '/setting/user/edit' },
            { type: 'menu', path: '/setting/user/delete' },
            { type: 'menu', path: '/setting/role' },
            { type: 'menu', path: '/login' },
            { type: 'menu', path: '/hightChartsGantt' },
          ], auth = {};
        permission.filter(item => item.type === 'btn').forEach(item => {
          if(auth[item.path]) {
            auth[item.path][item.key] = true
          } else {
            auth[item.path] = {
              [item.key]: true
            }
          }
        })
        store.commit('app/setUser', {
          user: { id: 1186, name: '张三' },
          permission,
          auth
        })
        router.push('/')
      })
      .catch(error => {
        console.log('error', error);
      });
    }

    return {
      loginForm,
      formData,
      rules,
      labelCol: { span: 5 },
      wrapperCol: { span: 12 },
      login
    }
  }
})
</script>

<style lang="less" scoped>
.login-page {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .login {
    position: absolute;
    top: 20%;
    right: 10%;
    width: 300px;
    padding: 30px 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    .item {
      width: 100%;
      text-align: center;
      margin-top: 15px;
      .btn {
        width: 60%;
        margin: 0 auto;
      }
    }
  }
}
</style>
