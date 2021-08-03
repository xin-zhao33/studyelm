<template>
  <div class="main">
    <router-view />
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/takeout">外卖 </van-tabbar-item>
      <van-tabbar-item icon="search" to="/search">搜索</van-tabbar-item>
      <van-tabbar-item to="/order">
        <span>订单</span>
        <template #icon>
          <van-icon name="shopping-cart-o" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <span>我的</span>
        <template #icon>
          <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
}
</style>
