<template>
  <view class="subscribe">
    <view class="subscribe-tab">
      <ul class="subscribe-wrapper">
        <li @click="showSubscribe(0)" :class="{'active': id === 0}">待进行</li>
        <li @click="showSubscribe(1)" :class="{'active': id === 1}">进行中</li>
        <li @click="showSubscribe(2)" :class="{'active': id === 2}">已完成</li>
      </ul>
    </view>
    <view class="subscribe-content">
      <ul class="subscribe-list" v-if="id === 0">
        <li v-for="(item, index) in waitItem" :key="index">
          <h1>{{item.title}} <text class="wait">待进行</text></h1>
          <h5>{{item.time}}</h5>
        </li>
      </ul>
      <view class="no-mores" v-if="id === 0 && waitItem.length === 0">暂无数据</view>

      <ul class="subscribe-list" v-if="id === 1">
        <li v-for="(item, index) in ingItem" :key="index">
          <h1>{{item.title}} <text class="ing">进行中</text></h1>
          <h5>{{item.time}}</h5>
        </li>
      </ul>
      <view class="no-mores" v-if="id === 1 && ingItem.length === 0">暂无数据</view>

      <ul class="subscribe-list" v-if="id === 2">
        <li v-for="(item, index) in overItem" :key="index">
          <h1>{{item.title}} <text class="over">已完成</text></h1>
          <h5>{{item.time}}</h5>
        </li>
      </ul>
      <view class="no-mores" v-if="id === 2 && overItem.length === 0">暂无数据</view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      id: 0,
      waitItem: [],
      ingItem: [],
      overItem: []
    }
  },
  onShow () {
    this.queryAppointment()
  },
  computed: {
    ...mapState(['userid'])
  },
  methods: {
    showSubscribe (id) {
      this.id = id
    },
    async queryAppointment () {
      const data = await this.$server.queryAppointment({userid: this.userid})
      this.$server.resultCallback(
				data,
				(data) => {
					this.waitItem = data.waitItem
					this.ingItem = data.ingItem
					this.overItem = data.overItem
				}
			)
    }
  }
}
</script>

<style lang="less" scoped>
.no-mores {
	height: 50px;
	line-height: 50px;
	font-size: 14px;
	color: #999;
	text-align: center;
}
.subscribe {
  padding-top: 44px;
  .subscribe-tab {
    width: 100%;
    height: 44px;
    line-height: 44px;
    background: #7993b7;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .subscribe-wrapper {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;

    li {
      flex: 1;
      color: #fff;
      font-size: 16px;
      text-align: center;
      &.active {
        font-weight: bold;
        background: #ffb170;
      }
    }
  }

  .subscribe-content {
    margin-top: 10px;
    .subscribe-list {
      background: #fff;
      li {
        padding: 12px 15px;
        border-bottom: 1px solid #ddd;
        &:last-child {
          border-bottom: none;
        }

        h1 {
          color: #000;
          font-size: 18px;
          line-height: 28px;
          padding-right: 4em;
          margin-bottom: 10px;
          word-break: break-all;
          position: relative;
          text {
            font-size: 14px;
            position: absolute;
            top: 0;
            right: 0;

            &.wait {
              color: green;
            }
            &.ing {
              color: red;
            }
            &.over {
              color: gray;
            }
          }
        }
        h5 {
          font-size: 14px;
					line-height: 16px;
					color: #999;
        }
      }
    }
  }
}
</style>
