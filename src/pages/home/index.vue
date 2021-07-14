<template>
  <div class="home-box">
    <van-nav-bar left-arrow class="nav-top">
      <template #left>
        <span>elm</span>
      </template>
      <template #right>
        <div class="nav-r">
          <span>登录</span>
          <span>|</span>
          <span>注册</span>
        </div>
      </template>
    </van-nav-bar>
    <div class="cur-city">
      <span>当前定位城市：</span>
      <span>定位不准时，请在城市列表中选择</span>
    </div>
    <van-cell is-link>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="custom-title">{{ curSite }}</span>
      </template>
    </van-cell>
    <div class="hot-city">
      <span>热门城市</span>
    </div>
    <van-grid :column-num="4">
      <van-grid-item
        @click="hotClick(item)"
        v-for="item in hotCityList"
        :key="item.id"
        :text="item.name"
      />
    </van-grid>
    <van-index-bar>
      <van-index-anchor index="A" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="B" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
    </van-index-bar>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import { hotCity } from '../../api/home.js'
export default {
  setup () {
    const state = reactive({
      hotCityList: [],
      allCityList: [],
      curSite: ''
    })
    onMounted(async () => {
      try {
        const res = await hotCity({ type: 'guess' })
        state.curSite = res.data.name
        const hotcity = await hotCity({ type: 'hot' })
        state.hotCityList = hotcity.data
        const allCityList = await hotCity({ type: 'group' })
        console.log(allCityList)
      } catch (error) {
        console.log(error)
      }
    })
    const hotClick = (item) => {
      console.log(item)
      console.log(item.name)
    }
    return {
      ...toRefs(state),
      hotClick
    }
  }
}
</script>

<style scoped lang="scss">
.home-box {
  font-size: 12px;
  .nav-top {
    background-color: #3190e8;
    color: #fff;
  }
  .nav-r {
    display: flex;
    align-items: center;
    span {
      &:nth-child(2) {
        padding: 5px;
      }
    }
  }
  .cur-city {
    height: 40px;
    font-size: 12px;
    line-height: 40px;
    padding: 0 14px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    span {
      &:nth-child(1) {
        font-size: 14px;
      }
      &:nth-child(2) {
        color: #ccc;
        font-weight: 600;
      }
    }
  }
  .custom-title {
    font-size: 18px;
    color: #3190e8;
  }
  .hot-city {
    padding: 0 14px;
    margin-top: 10px;
    height: 30px;
    line-height: 30px;
  }
  .van-cell--clickable {
    border-bottom: 1px solid #eee;
  }
}
</style>
