<template>
  <div class="component-detail">
    <div class="go-back" @click="goBack"><span>＜</span> 返回</div>
    <div class="top">
      <component :is="setting.form.type" :dynamic="!!setting.form.datasourceId" :formData="com.form" :dataSource="com.data"  />
    </div>

    <div class="bottom">
      <div class="left">
        <div class="title">基本信息:</div>
        <div class="row">
          <span class="set-label">组件名称:</span>
          <a-input v-model:value="setting.form.title" style="width: 60%"></a-input>
        </div>
        <div class="row">
          <span class="set-label">数据处理模板:</span>
          <a-select
            v-model:value="setting.form.content.template"
            :getPopupContainer="triggerNode => triggerNode.parentNode"
            style="width: 60%"
          >
            <a-select-option v-for="item in DATASOURCE_TEMPLATES" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
          </a-select>
        </div>
        <div class="title">数据预览</div>
        <data-setting  ref="dataRef" :data="com.data" />
      </div>
      <div class="right">
        <div class="title">
          具体配置:
          <a-popover title="组件配置说明" trigger="hover">
            <template #content>
              <pre>{{COMPOTENT_SCRIPT[setting.form.type]}}</pre>
              <a href="#">详细文档</a>
            </template>
            <QuestionCircleOutlined class="component-tip" />
          </a-popover>
          <div class="tool-bar">
            <a-button class="n-btn" @click="refresh">预览</a-button>
            <a-button class="d-btn" @click="save">保存</a-button>
          </div>
        </div>
        <div class="content">
          <component ref="compRef" :is="`Edit${setting.form.type}`" :formData="setting.form" :points="setting.points"  />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import cusComponent from './componentDetail/index.js'
import DataSetting from './dataSetting'
import componentSetting from './componentSetting/index.js'
import { message } from 'ant-design-vue';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import { getComponent, getData } from "@api/visual";
import { COMPOTENT_SCRIPT } from '@constants/componentScript.js'
import { DATASOURCE_TEMPLATES, DATASOURCE_TEMPLATE } from '@constants/datasourceTemplate.js'
import { getCompData } from '@utils/util.js'


export default defineComponent({
  name: 'component-detail',
  components: {
    ...cusComponent,
    ...componentSetting,
    DataSetting,
    QuestionCircleOutlined
  },
  setup() {
    const router = useRouter();
    let compRef = ref();
    const com = reactive({ form: {}, data: {} }),
      setting = reactive({ form: {content: {}}, data: {}, points: []});
    const { query = {} } = router.currentRoute._value;

    // 获取组件详情
    const getDetail = () => {
      getComponent({id: query.id}).then(res => {
        if (res.code === 200) {
          const { data = {} } = res;
          // 组件创建是，有默认配置填充，所以这里不需要考虑 content 不是json格式的问题
          com.form = JSON.parse(data.content);
          setting.form = {...data, content: JSON.parse(data.content)}
        } else {
          message.error(res.msg)
        }
      })
    }
    // 获取具体数据
    const getDataSource = () => {
      if(query.did) {
        getData({id: query.did}).then(res => {
          if (res.code === 200) {
            setting.data = {...res.data};
            try {
              const template = setting.form.content.template;
              com.data = getCompData(res.data);
              if(template) {
                setting.points = DATASOURCE_TEMPLATE[template](com.data)
              }
            } catch (error) {
              console.log(error)
            }
          } else {
            message.error(res.msg)
          }
        })
      }
    }
    // 返回上级
    const goBack = () => {
      router.go(-1);
    }
    // 预览
    const refresh = () => {
      getDataSource();
      com.form = {...compRef.value.content}
      // console.log(compRef.value.content)
      console.log(JSON.stringify(compRef.value.content))
    }
    // 保存
    const save = () => {
      console.log(setting.form)
    }
    // 初始化函数
    const init = async () => {
      await getDetail();
      await getDataSource();
    }

    init();

    return {
      compRef,
      com,
      setting,
      COMPOTENT_SCRIPT,
      DATASOURCE_TEMPLATES,
      goBack,
      refresh,
      save
    }
  }
})
</script>

<style lang="less" scoped>
.component-detail {
  position: relative;
  width: 100%;
  height: calc(100vh - 80px);
  .go-back {
    position: absolute;
    top: -55px;
    left: 20px;
    cursor: pointer;
    span {
      font-size: 25px;
      position: relative;
      top: 3px;
    }
  }
  .top {
    height: 40%;
    overflow: scroll;
  }
  .bottom {
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: space-between;
    .left {
      width: 35%;
      height: 100%;
      border-right: 1px solid gray;
      box-sizing: border-box;
      padding: 0 8px;
    }
    .right {
      width: 65%;
      height: 100%;
      overflow-y: auto;
      box-sizing: border-box;
      padding: 0 8px;
    }
    // 这里是所有组件配置的总体样式
    .title {
      position: relative;
      height: 35px;
      font-size: 16px;
      font-weight: bold;
      line-height: 35px;
      .tool-bar {
        position: absolute;
        top: 2px;
        right: 0;
        width: 140px;
        display: flex;
        justify-content: space-between;
      }
    }
    .content {
      width: 100%;
      height: calc(100% - 35px);
      overflow-y: auto;
      .component-tip {
        position: relative;
        cursor: pointer;
        font-size: 18px;
      }
    }
    .s-title {
      position: relative;
      margin: 13px 0 8px 0;
    }
    .row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      .col {
        .set-label {
          line-height: 30px;
        }
        .color-label {
          position: relative;
          top: -11px;
        }
      }
    }
  }
}
</style>
