<template>
  <div class="component-detail">
    <div class="go-back" @click="goBack"><span>＜</span> 返回</div>
    <div class="bottom">
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';


export default defineComponent({
  components: {
  },
  setup() {
    const router = useRouter();
    let formData = reactive({});
    const { query = {} } = router.currentRoute._value;
    formData.type = query.type;

    const getData = () => {
      formData = {
        id: query.id,
        type: query.type,
      }
    }
    // 返回上级
    const goBack = () => {
      router.go(-1);
    }

    getData();

    return {
      formData,
      goBack,
    }
  }
})
</script>

<style lang="less" scoped>
.component-detail {
  .go-back {
    position: absolute;
    top: -55px;
    left: 0px;
    cursor: pointer;
    span {
      font-size: 25px;
      position: relative;
      top: 3px;
    }
  }
}
</style>
