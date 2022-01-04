<template>
  <a-modal
    :visible="visible"
    :title="title"
    :width="width"
    :destroyOnClose="isDestroyOnClose"
    :maskClosable="isMaskClosable"
    @cancel="handleCancel"
  >
    <a-form
      ref="editForm"
      :model="formData"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-row :gutter="24">
        <a-col
          v-for="(item, key) in formItems"
          :key="key"
          :span="item.span || 12"
          v-show="!item.hide"
        >
          <a-form-item
            :label="item.label"
            :name="item.key"
          >
            <a-input
              v-if="item.type === 'input'"
              style="width: 100%"
              :disabled="!!item.disabled"
              v-model:value="formData[item.key]"
              :placeholder="item.placeholder || '请输入'"
              @change="(e) => item.needBack && handleBack(e.target.value, item.key)"
            />

            <a-input-number
              v-if="item.type === 'number'"
              style="width: 100%"
              :min="item.min || 0"
              :precision="item.precision || 0"
              :disabled="!!item.disabled"
              v-model:value="formData[item.key]"
              :placeholder="item.placeholder || '请输入'"
              @change="(e) => item.needBack && handleBack(e.target.value, item.key)"
            />

            <a-select
              v-if="item.type === 'select'"
              style="width: 100%"
              v-model:value="formData[item.key]"
              :disabled="!!item.disabled"
              :mode="item.mode || null"
              :show-search="!item.showSearch"
              :allowClear="!!item.allowClear"
              :placeholder="item.placeholder || '请选择'"
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              :filter-option="(input, option) => {
                return (
                  option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }"
              @change="(e) => item.needBack && handleBack(e, item.key)"
            >
              <a-select-option
                v-for="(optionItem, optionKey) in item.option"
                :key="optionKey"
                :title="optionItem.title || optionItem.label"
                :value="optionItem.value"
              >
                {{ optionItem.label }}
              </a-select-option>
            </a-select>

            <large-select
              v-if="item.type === 'largeSelect'"
              v-model:value="formData[item.key]"
              :disabled="!!item.disabled"
              show-search
              allowClear
              :list="item.option"
              @change="(v) => handleCustomChange(v, item)"
            />

            <batch-Input
              v-if="item.type === 'batchInput'"
              :disabled="!!item.disabled"
              v-model:value="formData[item.key]"
              :placeholder="item.placeholder || '请选择'"
              @change="(e) => handleCustomChange(e.target.value, item)"
            />

            <a-date-picker
              v-if="item.type === 'datepicker'"
              style="width: 100%"
              v-model:value="formData[item.key]"
              :allowClear="item.allowClear || false"
              :format="item.format || 'YYYY-MM-DD'"
              :show-time="item.showTime"
              :getCalendarContainer="(triggerNode) => triggerNode.parentNode"
              @change="(e) => item.needBack && handleBack(e, item.key)"
            />

            <a-range-picker
              v-if="item.type === 'rangepicker'"
              style="width: 110%"
              v-model:value="formData[item.key]"
              :format="item.format || 'YYYY-MM-DD'"
              :disabled="!!item.disabled"
              :show-time="!!item.showTime"
              :allowClear="item.allowClear || false"
              :placeholder="item.placeholder || ['开始日期', '结束日期']"
              :getCalendarContainer="(triggerNode) => triggerNode.parentNode"
              @change="(e) => item.needBack && handleBack(e, item.key)"
            >
            </a-range-picker>

            <a-radio-group
              v-if="item.type === 'radio'"
              v-model:value="formData[item.key]"
              :disabled="!!item.disabled"
              @change="(e) => item.needBack && handleBack(e, item.key)"
            >
              <a-radio
                v-for="(optionItem, optionKey) in item.option"
                :key="optionKey"
                :value="optionItem.value"
              >
                {{ optionItem.label }}
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <template #footer>
      <a-button key="back" :disabled="loading" @click="handleCancel">
        取消
      </a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
        确定
      </a-button>
    </template>
  </a-modal>
</template>

<script>
import { defineComponent, ref, reactive, watch } from 'vue';
import LargeSelect from '@components/largeSelect'
import BatchInput from '@components/batchInput'

export default defineComponent({
  name: 'editModel',
  components: {
    BatchInput,
    LargeSelect
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    visible: {
      // 弹窗是否显示
      type: Boolean,
      default: false
    },
    width: {
      // 弹窗宽度
      type: Number,
      default: 800
    },
    title: {
      // 弹窗标题
      type: String,
      default: ''
    },
    type: {
      // 操作类型
      type: String,
      default: ''
    },
    isDestroyOnClose: {
      // 是否销毁窗口
      type: Boolean,
      default: true
    },
    isMaskClosable: {
      // 点击遮罩层是否关闭窗口
      type: Boolean,
      default: false
    },
    initData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    formItems: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  setup(props, { emit }) {
    const editForm = ref();
    let formData = ref({});
    let rules = reactive({});

    watch(() => props.visible, v => {
      if(v) {
        // 初始化表单默认值 和 校验规则
        formData.value = props.type === 'edit' ? props.initData : {}
        props.formItems.forEach(item => {
          if(item.rules) {
            rules[item.key] = [...item.rules]
          } else {
            rules[item.key] = {required: !!item.required, message: `请填写${item.label}`}
          }
        })
      }
    })

    // antd3自定义表单组件绑定域还不支持，这里自定义组件暂时手动修改数据
    const handleCustomChange = (v, d) => {
      formData.value[d.key] = v
      if(d.needBack) handleBack(v, d.key)
    }
    const handleBack = (v, k) => {
      emit('onBack', v, k, formData.value)
    }
    const handleCancel = () => {
      emit('onClose', 'cancle')
    }
    const handleOk = () => {
      editForm.value.validate().then((v) => {
        const params = {
          type: props.type,
          data: { ...v, id: props.initData.id || null }
        }
        emit('onClose', params)
      })
    }

    return {
      editForm,
      formData,
      rules,
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
      handleCustomChange,
      handleBack,
      handleCancel,
      handleOk,
    }
  }
})
</script>

<style scoped></style>
