<template>
  <div class="c-batchInput">
    <a-input
      style="width: 100%"
      v-model:value="input"
      :placeholder="placeholder"
      @change="inputChange"
    >
      <template #addonAfter>
        <CopyOutlined style="cursor: pointer" @click="showModal" />
      </template>
    </a-input>

    <a-modal
      :visible="visible"
      :title="title"
      ok-text=" 确认"
      width="70%"
      cancel-text="取消"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-textarea class="batch-input-text" v-model:value="textarea" allow-clear :rows="16" @change="textChange" />
    </a-modal>
  </div>
</template>

<script>
// 一个可以批量输入的组件，换行自动切换数据，输出逗号分隔的字符串
import { defineComponent, ref } from 'vue';
import { CopyOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'batchInput',
  components:{
    CopyOutlined
  },
  props:{
    title: {  // 标题
      type: String,
      default: ''
    },
    value: { // 值
      type: String,
    },
    placeholder: { // placeholder
      type: String,
      default: ''
    },
    change: {   //  值修改的回调
      type: Function
    },
  },
  setup(props, { emit }) {
    const visible = ref(false);     // 显示弹窗
    const input = ref(props.value); // 输入框值
    const textarea = ref('');       // 文本框值

    //  展示弹窗
    const showModal =() => {
      const reg = new RegExp(",","g");
      textarea.value = (input.value || '').replace(reg, '\n')
      visible.value = true
    }
    // 文本域 回调
    const textChange = (e) => {
      textarea.value = e.target.value
    }
    // 输入框 回调
    const inputChange = (e) => {
      e.preventDefault();
      input.value = e.target.value;
      emit('change', e);
    }
    // 弹窗取消
    const handleCancel = () => {
      visible.value = false
    }
    // 弹窗确定
    const handleOk = () => {
      const reg = new RegExp("[\\r\\n]","g");
      let newValue = (textarea.value || '').replace(reg, ',')
      if(newValue[newValue.length- 1] === ',') {
        newValue = newValue.slice(0, newValue.length - 1)
      }
      input.value = newValue
      visible.value = false
      // 返回默认监听的数据类型
      emit('change', {target: {value: newValue}})
    }

    return {
      visible,
      input,
      textarea,
      showModal,
      textChange,
      inputChange,
      handleCancel,
      handleOk
    }
  }
})
</script>
<style lang="less" scoped>
.c-batchInput {
  width: 100%;
}
.batch-input-text {
    height: 300px;
    margin: 20px auto 0 auto;
  }
</style>