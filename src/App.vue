<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    import axios from 'axios'
    //export default块不添加将会导致项目运行后无法加载页面出现白屏情况
    export default {
        name:'App'
    }
</script>
<style>
    @import "./assets/css/main.css";
    /*@import "./assets/css/color-dark.css";     !*深色主题*!*/
    @import "./assets/css/theme-green/color-green.css";   /*浅绿色主题*/
</style>
