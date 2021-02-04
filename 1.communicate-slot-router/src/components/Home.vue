<template>
  <div>
    <div>Home Page</div>
<!--    <router-link :to="{ name: 'Page1'}">goto Page 1</router-link>-->
<!--    <router-link :to="{ name: 'Page2'}">goto Page 2</router-link>-->
    <router-link :to="{ path: '/home/page1/123/'}" tag="button">goto Page 1</router-link>
    <router-link :to="{ name: 'Page2',query:{id:456}}" tag="button">goto Page 2</router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
name: "Home"
}
</script>

<style scoped>

</style>