<template>
<div>
  Page 1 Site, Params:{{$route.params}}
</div>
</template>

<script>
export default {
  name: "page1",
  mounted() {
    console.log(this.$route.params)
  }
}
</script>

<style scoped>

</style>