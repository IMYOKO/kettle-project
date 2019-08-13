<template>
	<web-view 
    :webview-styles="webviewStyles"
    :src="url"
  >
  </web-view>
</template>

<script>
export default {
  data () {
    return {
      url: ''
    }
  },
  onLoad (option) {
    this.url = option.url
  }
}
</script>

<style lang="less" scoped></style>