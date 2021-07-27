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
          @focus="getFocus"
          @blur="getBlur"
          class="input-box"
        />
        <van-button type="primary" @click="submitInfo" size="small" block
          >提交</van-button
        >
      </div>
      <div class="history-box" v-if="isShow">
        <div class="history-top">
          <div class="top-l">历史记录</div>
          <div class="top-l">清空</div>
        </div>
        <div class="history-main">1111</div>
        <div class="history-main">1111</div>
        <div class="history-main">1111</div>
        <div class="history-main">1111</div>
      </div>
      <div>
        <div class="history-title" v-if="siteList.length === 0">历史记录</div>
        <van-row
          type="flex"
          justify="center"
          v-for="(item, index) in siteList"
          :key="index"
          class="site-box"
        >
          <van-col span="24">
            <div>{{ item.name }}</div>
            <div class="site-content">{{ item.address }}</div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getCityName, querySiteInfo } from '../../api/home.js'
export default {
  setup () {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      name: '',
      inputValue: '',
      siteList: [],
      isShow: false
    })
    onMounted(async () => {
      const cityName = await getCityName(route.query.id)
      state.name = cityName.data.name
    })
    const toHome = () => {
      router.push('/home')
    }
    const submitInfo = async () => {
      console.log(route.query.id)
      console.log(state.inputValue)
      const siteInfo = await querySiteInfo({
        city_id: route.query.id,
        keyword: state.inputValue
      })
      state.siteList = siteInfo.data
    }
    const getFocus = () => {
      state.isShow = true
    }
    const getBlur = () => {
      state.isShow = false
    }
    return {
      ...toRefs(state),
      toHome,
      submitInfo,
      getFocus,
      getBlur
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
    }
  }
}
</style>
