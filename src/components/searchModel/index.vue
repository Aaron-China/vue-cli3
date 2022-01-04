<template>
  <div class="table-search-modal">
    <a-form
      ref="searchForm"
      :model="formData"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-row :gutter="24">
        <a-col v-for="(item, idx) in formList" :key="idx" :span="6" :style="{ display: idx < count ? 'block' : 'none' }">
          <a-form-item
            v-if="item.type === 'input'"
            :label="item.label"
            :name="item.key"
          >
            <a-input
              style="width: 100%"
              v-model:value="formData[item.key]"
              :placeholder="item.placeholder || '请输入'"
              @change="(e) => item.needBack && handleBack(e.target.value, item.key)"
            />
          </a-form-item>

          <a-form-item
            v-if="item.type === 'number'"
            :label="`${item.label}`"
            :name="item.key"
          >
            <a-input-number
              style="width: 100%"
              :placeholder="item.placeholder || '请输入'"
              v-model:value="formData[item.key]"
              :min="item.min || 0"
              :precision="item.precision || 0"
              @change="(e) => item.needBack && handleBack(e.target.value, item.key)"
            />
          </a-form-item>

          <a-form-item
            v-if="item.type === 'select'"
            :label="`${item.label}`"
            :name="item.key"
          >
            <a-select
              style="width: 100%"
              v-model:value="formData[item.key]"
              show-search
              allowClear
              :mode="item.mode || null"
              :placeholder="item.placeholder || '请选择'"
              :getPopupContainer="triggerNode => triggerNode.parentNode"
              :filter-option="(input, option) => {
                return (
                  option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
              }"
              @change="(e) => item.needBack && handleBack(e, item.key)"
            >
              <a-select-option
                v-for="(optionItem,optionKey) in item.option"
                :key="optionKey"
                :title="optionItem.title || optionItem.label"
                :value="optionItem.value"
              >{{ optionItem.label }}</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            v-if="item.type === 'largeSelect'"
            :label="`${item.label}`"
            :name="item.key"
          >
            <large-select
              v-model:value="formData[item.key]"
              show-search
              allowClear
              :list="item.option"
              @change="(v) => handleCustomChange(v, item)"
            />
          </a-form-item>

          <a-form-item
            v-if="item.type === 'batchInput'"
            :label="`${item.label}`"
            :name="item.key"
          >
            <batch-Input
              style="width: 100%"
              v-model:value="formData[item.key]"
              :placeholder="item.placeholder || '请选择'"
              @change="(e) => handleCustomChange(e.target.value, item)"
            />
          </a-form-item>

          <a-form-item
            v-if="item.type === 'datepicker'"
            :label="`${item.label}`"
            :name="item.key"
          >
            <a-date-picker
              style="width: 100%"
              v-model:value="formData[item.key]"
              :allowClear="item.allowClear || false"
              :getCalendarContainer="triggerNode => triggerNode.parentNode"
              :format="item.format || 'YYYY-MM-DD'"
              :show-time="item.showTime"
              @change="(e) => item.needBack && handleBack(e, item.key)"
            />
          </a-form-item>

          <a-form-item
            v-if="item.type === 'rangepicker'"
            :label="`${item.label}`"
            :name="item.key"
          >
            <a-range-picker
              style="width: 100%"
              v-model:value="formData[item.key]"
              :allowClear="item.allowClear || false"
              :getCalendarContainer="triggerNode => triggerNode.parentNode"
              :format="item.format || 'YYYY-MM-DD'"
              :show-time="!!item.showTime"
              @change="(e) => item.needBack && handleBack(e, item.key)"
            />
          </a-form-item>

          <a-form-item
            v-if="item.type === 'checkbox'"
            :name="item.key"
          >
            <a-checkbox
              :style="'width: 100%;'"
              v-model:checked="formData[item.key]"
              @change="(e) => item.needBack && handleBack(e.target.value, item.key)"
            >{{item.label}}</a-checkbox>
          </a-form-item>

          <a-form-item
            v-if="item.type === 'btn'"
            style="width: 100%"
            label=""
            :labelCol="{span: 0}"
          >
            <div style="min-width: 230px;">
              <a-button class="o-btn" @click="handleSearch">
                <template #icon>
                  <SearchOutlined />
                </template>
                查询
              </a-button>
              <a-button class="w-btn" style="margin-left: 10px" @click="handleReset">
                <template #icon>
                  <ReloadOutlined />
                </template>
                重置
              </a-button>
              <a style="margin-left: 8px; fontSize: 12px" @click="toggle" v-if="formList.length > 4">
                {{ expand ? '合并' : '展开' }}
                <UpOutlined v-if="expand" />
                <DownOutlined v-else />
              </a>
            </div>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <slot class="left" name="tool-left"></slot>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, computed } from 'vue';
import LargeSelect from '@components/largeSelect'
import BatchInput from '@components/batchInput'
import { UpOutlined, DownOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'searchModel',
  components: {
    LargeSelect,
    BatchInput,
    UpOutlined,
    DownOutlined,
    SearchOutlined,
    ReloadOutlined
  },
  props: {
    // needBack: true 需要回调 触发 onBack 函数;  某一选项变化的回调
    formList: {
      type: Array,
      default: () => []
    },
    onSearch: {
      type: Function
    },
    expanded: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const searchForm = ref();
    let formData = reactive({});
    let rules = reactive({});
    const expand = ref(props.expanded);
    const count = computed(() => expand.value ? props.formList.length : 4);

    // 初始化表单默认值 和 校验规则
    props.formList.forEach(item => {
      if(item.rules) {
        rules[item.key] = [...item.rules]
      } else {
        rules[item.key] = {required: !!item.required, message: `请填写${item.label}`}
      }
      if(item.defaultValue || item.defaultValue === 0 || item.defaultValue === '') formData[item.key] = item.defaultValue
    })

    // 搜索的回调
    const handleSearch = () => {
      searchForm.value.validate().then((v) => {
        emit('onSearch', v)
      })
    }
    // 重置的回调
    const handleReset = () => {
      props.formList.forEach(item => {
        formData[item.key] = (item.defaultValue || item.defaultValue === 0 ? item.defaultValue : null)
      })
      searchForm.value.validate().then((v) => {
        emit('onSearch', v)
      })
    }
    // 展开/隐藏高级搜索
    const toggle = () => {
      expand.value = !expand.value
    }
    // 筛选条件值变化的回调
    const handleBack = (v, k) => {
      emit('onBack', v, k)
    }
    // antd3自定义表单组件绑定域还不支持，这里自定义组件暂时手动修改数据
    const handleCustomChange = (v, d) => {
      formData[d.key] = v
      if(d.needBack) handleBack(v, d.key)
    }

    return {
      searchForm,
      expand,
      count,
      formData,
      rules,
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
      toggle,
      handleSearch,
      handleReset,
      handleBack,
      handleCustomChange
    }
  }
})
</script>

<style lang="less">
  .table-search-modal {
    width: 100%;
    margin-bottom: 15px;
    .left {
      position: relative;
      text-align: left;
      width: auto;
    }
    .right {
      text-align: right;
    }
  }
</style>
