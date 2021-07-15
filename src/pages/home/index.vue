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
    <van-cell is-link @click="toCityDetail(curSite.id)">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="custom-title">{{ curSite.name }}</span>
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
      <div v-for="(value, key, index) in allCityData" :key="index">
        <van-index-anchor :index="key" />
        <van-grid :column-num="4" class="all-citys">
          <van-grid-item
            @click="hotClick(item)"
            v-for="item in value"
            :key="item.id"
            :text="item.name"
          />
        </van-grid>
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { hotCity } from '../../api/home.js'
export default {
  setup () {
    const router = useRouter()
    const state = reactive({
      hotCityList: {},
      allCityData: {},
      curSite: {}
    })

    onMounted(async () => {
      try {
        const res = await hotCity({ type: 'guess' })
        state.curSite = res.data
        const hotcity = await hotCity({ type: 'hot' })
        state.hotCityList = hotcity.data
        const allCityList = await hotCity({ type: 'group' })
        const alphabetArr = Object.keys(allCityList.data).sort()
        for (let i = 0; i < alphabetArr.length; i++) {
          state.allCityData[alphabetArr[i]] = allCityList.data[alphabetArr[i]]
        }
      } catch (error) {
        console.log(error)
      }
    })
    const hotClick = item => {
      router.push({
        path: '/city/query',
        query: {
          id: item.id
        }
      })
    }
    const toCityDetail = id => {
      router.push({
        path: '/city/query',
        query: {
          id
        }
      })
    }
    return {
      ...toRefs(state),
      hotClick,
      toCityDetail
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
  .all-citys {
    text-align: center;
  }
}
</style>
