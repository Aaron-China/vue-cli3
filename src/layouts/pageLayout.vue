<template>
  <div class="page-layout">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {},
  created () {},
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
