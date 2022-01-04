<template>
  <div class="dashboard-detail">
    <div class="tool-bar">
      <div class="go-back" @click="goBack"><span>＜</span> 返回</div>
    </div>
    <div class="container">
      <div class="contain" :style="{width: formData.width, height: formData.height}">
        <div 
          class="comp-item"
          v-for="item in formData.components" 
          :key="item.id"
          :style="{
            width: `${item.width}px`, 
            height: `${item.height}px`, 
            top: `${item.top}px`, 
            left: `${item.left}px`, 
            zIndex: item.zIndex, 
            ...item.style || {}
          }"
        >
          <!-- 边框以定位的形式展示 -->
          <component class="cus-border" :is="item.container" :title="item.title" />
          <base-component :formData="item"  :parameter="parameter" @onControl="handleControl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import DrawContainer from '@views/visual/dashboard/drawContainer'
import container from '@views/visual/dashboard/container'
import BaseComponent from '@views/visual/component/componentDetail/index.vue'
import { message } from 'ant-design-vue';
import { getDashboard } from "@api/visual";

export default defineComponent({
  components: {
    ...container,
    DrawContainer,
    BaseComponent
  },
  setup() {
    const router = useRouter();
    let formData = ref({}), parameter = ref({});
    const checkItem = ref();
    const { query = {} } = router.currentRoute._value;

    // 获取组件详情
    const getDetail = () => {
      getDashboard({id: query.id}).then(res => {
        if (res.code === 200) {
          const { data = {} } = res;
          formData.value = {...data, components: JSON.parse(data.components)}
        } else {
          message.error(res.msg)
        }
      })
    }
    // 组件回调，主要是控制器
    const handleControl = (d) => {
      parameter.value = {...d}
    }
    // 返回上级
    const goBack = () => {
      router.go(-1)
    }
    // 选中
    const onCheck = (id) => {
      checkItem.value = (id === checkItem.value ? null : id)
    }
    // 编辑
    const onChange = (d) => {
      const { type, obj } = d;
      let list = [...formData.value.components];
      if(type === 'site' || type === 'size') {
        list = list.map(item => {
          if(item.id === obj.id) item = {...item, ...obj}
          return item
        })
      } else if(type === 'edit') {
        // 打开模态窗
      } else if(type === 'up') {
        list = list.map(item => {
          if(item.id === obj.id) item = {...item, zIndex: item.zIndex + 1}
          return item
        })
      } else if(type === 'down') {
        list = list.map(item => {
          if(item.id === obj.id) item = {...item, zIndex: item.zIndex > 0 ? item.zIndex - 1 : 0}
          return item
        })
      } else if(type === 'max') {
        let max = Math.max(...list.map(item => item.zIndex), 0);
        list = list.map(item => {
          if(item.id === obj.id) item = {...item, zIndex: max + 1}
          return item
        })
      } else if(type === 'min') {
        list = list.map(item => {
          if(item.id === obj.id) item = {...item, zIndex: 0}
          return item
        })
      } else if(type === 'delete') {
        list = list.filter(item => {
          return item.id !== obj.id
        })
      }
      formData.value.components = [...list];
    }
    // 保存
    const save = () => {
      console.log(formData.value)
      console.log(JSON.stringify(formData.value.components))
    }

    getDetail();

    return {
      formData,
      checkItem,
      parameter,
      handleControl,
      goBack,
      onCheck,
      onChange,
      save
    }
  }
})
</script>

<style  lang="less" scoped>
.dashboard-detail {
  position: relative;
  .tool-bar {
    position: absolute;
    top: -55px;
    left: 20px;
    display: flex;
    justify-content: space-between;
    width: 30%;
    .go-back {
      cursor: pointer;
      span {
        font-size: 25px;
        position: relative;
        top: 3px;
      }
    }
  }
  .container {
    position: relative;
    width: 100%;
    height: calc(100vh - 70px);
    font-size: 14px;
    overflow: auto;
    .contain {
      -moz-user-select: -moz-none;
      -moz-user-select: none;
      -o-user-select:none;
      -khtml-user-select:none;
      -webkit-user-select:none;
      -ms-user-select:none;
      user-select:none;
      .cus-border {
        position: absolute;
        top: 0;
        left: 0;
      }
      .comp-item {
        position: absolute;
      }
    }
  }
}
</style>
