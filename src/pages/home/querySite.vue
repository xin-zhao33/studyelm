<template>
  <div>
    <van-nav-bar left-arrow class="nav-top">
      <template #left>
        <span @click="toHome"><i class="iconfont icon-leftarrow"></i></span>
      </template>
      <template #title>
        <span>{{name}}</span>
      </template>
      <template #right>
        <div class="nav-r">
          <span @click="toHome">切换城市</span>
        </div>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getCityName } from '../../api/home.js'
export default {
  setup () {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      name: ''
    })
    onMounted(async () => {
      const cityName = await getCityName(route.query.id)
      state.name = cityName.data.name
    })
    const toHome = () => {
      router.push('/home')
    }

    return {
      ...toRefs(state),
      toHome
    }
  }
}
</script>

<style lang="scss" scoped>
>>> .van-nav-bar__title {
  color: #fff !important;
}
</style>
