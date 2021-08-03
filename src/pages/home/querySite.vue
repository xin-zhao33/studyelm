<template>
  <div class="query-box">
    <van-nav-bar left-arrow class="nav-top">
      <template #left>
        <span @click="toHome"><i class="iconfont icon-leftarrow"></i></span>
      </template>
      <template #title>
        <span>{{ name }}</span>
      </template>
      <template #right>
        <div class="nav-r">
          <span @click="toHome">切换城市</span>
        </div>
      </template>
    </van-nav-bar>
    <div class="main-content">
      <div class="main-title">
        <van-field
          v-model="inputValue"
          placeholder="请输入学校、商务楼、地址"
          class="input-box"
        />
        <van-button type="primary" @click="submitInfo" size="small" block
          >提交</van-button
        >
      </div>
      <!-- <div v-if="inputValue === ''">
        <div class="history-box" v-if="isShow">
          <div class="history-top">
            <div class="top-l">历史记录</div>
            <div class="top-l">清空</div>
          </div>
          <div
            class="history-main history-item"
            v-for="(item, index) in historyList"
            :key="index"
            @mouseenter="enter(index)"
          >
            <div>{{ item }}</div>
          </div>
        </div>
      </div> -->
      <div>
        <div class="history-title">历史记录</div>
        <van-row
          type="flex"
          justify="center"
          v-for="(item, index) in siteList"
          :key="index"
          class="site-box"
        >
          <van-col span="24" @click="selectSite(item)">
            <div>{{ item.name }}</div>
            <div class="site-content">{{ item.address }}</div>
          </van-col>
        </van-row>
        <div
          class="footer"
          @click="clearList"
          v-if="siteList && siteList.length > 0"
        >
          清空所有
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getCityName, querySiteInfo } from '../../api/home.js'
import { Toast } from 'vant'
export default {
  setup () {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      name: '',
      inputValue: '',
      siteList: JSON.parse(localStorage.getItem('choose')) || [],
      isShow: false,
      historyList: []
    })
    onMounted(async () => {
      const cityName = await getCityName(route.query.id)
      state.name = cityName.data.name
    })
    const toHome = () => {
      router.push('/home')
    }
    const submitInfo = async () => {
      if (state.inputValue === '') Toast.fail('请填写搜索内容!')
      const siteInfo = await querySiteInfo({
        city_id: route.query.id,
        keyword: state.inputValue
      })
      state.siteList = siteInfo.data
    }
    // const getFocus = () => {
    //   state.historyList = JSON.parse(localStorage.getItem('list')) || []
    //   if (state.historyList.length > 0) state.isShow = true
    // }
    // const pushHistory = val => {
    //   let arr = []
    //   if (val === '') return
    //   let list = JSON.parse(localStorage.getItem('list'))
    //   if (list && list.length > 0) arr = list
    //   if (arr.length === 5) {
    //     arr.splice(0, 1)
    //     arr.push(val)
    //     arr = [...new Set(arr)]
    //   } else {
    //     arr.push(val)
    //     arr = [...new Set(arr)]
    //   }
    //   localStorage.setItem('list', JSON.stringify(arr))
    //   return arr
    // }
    // const getBlur = () => {
    //   state.isShow = false
    //   pushHistory(state.inputValue)
    // }
    // const enter = index => {
    //   console.log(index)
    // }
    const selectSite = item => {
      console.log(item)
      const list = []
      list.push(item)
      localStorage.setItem('choose', JSON.stringify(list))
      router.push({
        path: '/main',
        query: {
          geohash: item.geohash
        }
      })
    }
    const clearList = () => {
      localStorage.clear('choose')
      state.siteList = []
    }
    return {
      ...toRefs(state),
      toHome,
      submitInfo,
      selectSite,
      clearList
    }
  }
}
</script>

<style lang="scss" scoped>
.query-box {
  .nav-top {
    background-color: #3190e8;
    color: #fff;
    position: fixed;
    top: 0;
    width: 100%;
  }
  .main-content {
    width: 100%;
    // margin-top: 60px;
    padding-top: 60px;
    position: relative;
    .history-title {
      padding: 0 20px;
    }
    .site-box {
      padding: 10px 20px;
      border: 1px solid #eee;
      box-sizing: border-box;
      .site-content {
        font-size: 12px;
        color: #ccc;
        margin: 10px 0;
      }
    }
    .main-title {
      padding: 0 20px;
      .input-box {
        margin-bottom: 4px;
      }
    }
    .history-box {
      position: absolute;
      top: 100px;
      left: 20px;
      z-index: 99999999999;
      width: 90%;
      border-radius: 0 0 4px 4px;
      box-sizing: border-box;
      overflow: hidden;
      background-color: #fff;
      .history-top {
        padding: 10px;
        height: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
      }
      .history-item {
        height: 26px;
        line-height: 26px;
        padding: 6px 10px;
        border-bottom: 1px dashed #eee;
      }
    }
  }
  .footer {
    text-align: center;
  }
}
</style>
