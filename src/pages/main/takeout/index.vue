<template>
  <div class="take-out">
    <div class="take-title">
      <div class="title-item"><van-icon name="search" /></div>
      <div class="title-item">{{ title }}</div>
      <div class="title-item">登录 | 注册</div>
    </div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <van-grid :gutter="10" :border="false">
          <van-grid-item
            v-for="item in foodTags"
            :key="item.id"
            :icon="'https://fuss10.elemecdn.com'+item.image_url"
            :text="item.title"
          />
        </van-grid>
      </van-swipe-item>
      <van-swipe-item>
        <van-grid :gutter="10" :border="false">
          <van-grid-item
            v-for="ele in foodTgasT"
            :key="ele.id"
            :icon="'https://fuss10.elemecdn.com'+ele.image_url"
            :text="ele.title"
          />
        </van-grid>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { navbar, foodList } from '../../../api/takeout'
export default {
  setup () {
    const route = useRoute()
    const state = reactive({
      title: '',
      foodTags: [],
      foodTgasT: []
    })
    onMounted(async () => {
      getNavbar(route.query.geohash)
      getfoodList()
    })
    const getNavbar = async geohash => {
      const res = await navbar(geohash)
      state.title = res.data.name
    }
    const getfoodList = async () => {
      const res = await foodList()
      const data = res.data
      state.foodTags = data.splice(0, 8)
      state.foodTgasT = res.data.splice(8, 16)
    }
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.take-out {
  .take-title {
    height: 46px;
    background-color: #3190e8;
    display: flex;
    align-items: center;
    color: #fff;
    padding: 0 20px;
    text-align: center;
    justify-content: space-between;
    font-size: 20px;
    .title-item {
      &:nth-child(2) {
        width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-word;
      }
      &:nth-child(1) {
        font-size: 24px;
      }
    }
  }
  .van-grid-item {
    border: 0 !important;
    box-shadow: 0;
  }
}
</style>
