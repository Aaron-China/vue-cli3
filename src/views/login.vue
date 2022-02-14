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
          <a-button class="btn" type="primary" :loading="loading" @click="loginFunc">登陆</a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import { login, getUserInfoMock } from "@api/login";

export default defineComponent({
  name: 'login',
  setup() {
    const store = useStore();
    const router = useRouter();
    const loading = ref(false);
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
    // 为了测试方便，登陆和获取权限分写了，权限还是mock获取
    const loginFunc = () => {
      loginForm.value.validate().then(async (v) => {
        loading.value = true;
        try {
          const user = await login({ name: v.username, account: v.username, password: v.password });
          const info = await getUserInfoMock();
          if(user.code === 200) {
            const { permission, token } = info.data;
            let auth = {};
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
              user: { ...user.data },
              permission,
              auth,
              token
            })
            message.success('登陆成功');
            router.push('/');
          } else {
            message.error(user.msg);
          }
        } catch (error) {
          loading.value = false;
          console.log('error', error);
          message.error(error)
        }
      })
    }

    return {
      loginForm,
      loading,
      formData,
      rules,
      labelCol: { span: 5 },
      wrapperCol: { span: 12 },
      loginFunc
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
