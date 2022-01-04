<template>
  <div class="c-menu" :style="{ width: !spread ? width : '0px', minWidth: !spread ? width : '0px' }">
    <div class="header">XXS</div>
    <div class="contain">
      <!-- 一级菜单 -->
      <div 
        class="m1"
        v-for="m1 in list"
        :key="m1.name"
      >
        <div @click="(e) => handleClick(e, 0, m1)">
          <div :class="{'row': true, 'row1': true, 'actLine': actLine(m1), 'active': row(m1)}">
            {{m1.title}}
            <RightOutlined class="open" v-if="icon(m1, 'down')" />
            <DownOutlined class="open" v-if="icon(m1, 'right')" />
          </div>
          <!-- 二级菜单 -->
          <div :class="{'item': true, 'active': children(m1)}">
            <div 
              v-for="m2 in m1.children"
              :key="m2.name"
            >
              <div @click="(e) => handleClick(e, 1, m2)">
                <div :class="{'row': true, 'row2': true, 'active': row(m2)}">
                  {{m2.title}}
                  <RightOutlined class="open" v-if="icon(m2, 'down')" />
                  <DownOutlined class="open" v-if="icon(m2, 'right')" />
                </div>
                <!-- 三级菜单 -->
                <div :class="{'item': true, 'active': children(m2)}">
                  <div 
                    v-for="m3 in m2.children"
                    :key="m3.name"
                  >
                    <div @click="(e) => handleClick(e, 2, m3)">
                      <div :class="{'row': true, 'row3': true, 'active': row(m3)}">{{m3.title}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="{ tool: true, toolActive: spread }" @click="onSpread">
      <div></div>
      <div></div>
      <div></div>
      <div v-if="spread" class="right"></div>
      <div v-else class="left"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { RightOutlined, DownOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'c-menu',
  components: {
    RightOutlined,
    DownOutlined
  },
  props:{
    width: {     // 宽度
      type: String,
      default: '220px'
    },
    list: {     // 菜单列表
      type: Array,
      default: () => { return [] }
    },
    active: {   // 当前激活菜  例： edit
      type: String,
      default: ''
    },
    actives: {   // 当前激活菜单链  例 setting-user-edit
      type: String,
      default: ''
    },
    change: {   // 菜单变化的回调
      type: Function
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    const spread = ref(false);      // 是否展开菜单
    const activeKeys = ref(props.actives || ''); // 当前激活菜单链
    const activeKey = ref(props.active || '');  // 当前激活菜单

    watch(() => props.active, v => {
      activeKey.value = v
    });
    watch(() => props.actives, v => {
      activeKeys.value = v
    });


    // icon激活状态
    const icon = (d, t) => {
      if(d.children && d.children.length) {
        let type = activeKeys.value.indexOf(d.name) >= 0 ? 'right' : 'down';
        return type === t
      } else {
        return false
      }
    };
    // 有子菜单的一级菜单。加一个竖线
    const actLine = (d) => {
      return activeKeys.value.indexOf(d.name) >= 0
    };
    // 子菜单菜单激活状态
    const children = (d) => {
      return d.children && d.children.length && (activeKeys.value.indexOf(d.name) >= 0)
    };
    // 菜单激活状态
    const row = (d) => {
      return activeKey.value === d.name
    };
    // 菜单点击
    const handleClick = (e, idx, d) => {
      e.stopPropagation(); 
      let arr = activeKeys.value.split('-');
      let flag = arr.some(item => item === d.name);
      // 已存在
      if(flag) {
        if(idx === 0) {
          arr = []
        } else if(idx === 1) {
          arr[1] = ''
          arr[2] = ''
        }
      } else {
        arr[idx] = d.name
      }
      activeKeys.value = arr.join('-')
      // 没有子菜单，需跳转页面
      if(!(d.children && d.children.length)) {
        activeKey.value = d.name
        router.push(d.path)
        emit('change', d)
      }
    };
    // 展开关闭菜单
    const onSpread = () => {
      spread.value = !spread.value
    };

    return {
      spread,
      activeKeys,
      activeKey,
      icon,
      actLine,
      children,
      row,
      handleClick,
      onSpread
    }
  }
})
</script>

<style lang="less" scoped>
  .c-menu {
    position: relative;
    height: 100vh;
    background-color: #4065e0;
    color: #fff;
    font-size: 16px;
    .header {
      font-size: 50px;
      text-align: center;
      line-height: 70px;
    }
    .contain {
      height: calc(100vh - 70px);
      overflow: auto;
      .row {
        padding: 14px 5px 14px 10px;
        cursor: pointer;
        position: relative;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        .open {
          font-size: 13px;
          position: absolute;
          top: 20px;
          right: 10px;
          z-index: 9;
        }
        &:hover {
          color: @active;
          background-color: #2546B1;
        }
      }
      .actLine {
        border-left: 2px solid #00f6f0;
      }
      .row2 {
        padding-left: 20px;
      }
      .row3 {
        padding-left: 30px;
      }
      .row.active {
        color: #00F6F0;
        background-color: #2546B1;
      }
      .item {
        height: 0px;
        overflow: hidden;
      }
      .item.active {
        height: auto;
        background-color: #2C4EBE;
      }
    }
    .tool {
      position: absolute;
      top: 3px;
      right: 2px;
      z-index: 99;
      cursor: pointer;
      div {
        width: 27px;
        height: 2.5px;
        margin-bottom: 8px;
        background-color: #fff;
      }
      .left {
        position: absolute;
        top: 2px;
        left: -11px;
        width: 0;
        height: 0;
        background-color: transparent;
        border-top: 10px solid transparent;
        border-right: 10px solid #fff;
        border-left: 10px solid transparent;
        border-bottom: 10px solid transparent;
      }
      .right {
        position: absolute;
        top: 2px;
        right: -11px;
        width: 0;
        height: 0;
        background-color: transparent;
        border-top: 10px solid transparent;
        border-right: 10px solid transparent;
        border-left: 10px solid #fff;
        border-bottom: 10px solid transparent;
      }
    }
    .toolActive {
      top: 3px;
      right: -27px;
      div {
        background-color: @other;
      }
      .left {
        border-right: 10px solid@other;
      }
      .right {
        border-left: 10px solid @other;
      }
    }
  }
</style>
