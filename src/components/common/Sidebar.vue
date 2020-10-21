<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            unique-opened
            router
        >
            <template v-for="item in myMenu">
                <template v-if="item.children.length !== 0">
                    <el-submenu :index="item.url" :key="item.url">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.name }}</span>
                        </template>
                        <template v-for="subItem in item.children">
                            <el-submenu
                                v-if="subItem.children.length !== 0"
                                :index="subItem.url"
                                :key="subItem.url"
                            >
                                <template slot="title">{{ subItem.name }}</template>
                                <el-menu-item
                                    v-for="threeItem in subItem.children"
                                    :key="threeItem.url"
                                    :index="threeItem.url"
                                >{{ threeItem.name }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.url"
                                :key="subItem.url"
                            >{{ subItem.name }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.url" :key="item.url">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            myMenu:[]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
        this.menuInit();
    },
    methods: {
        menuInit(){
            //获取菜单
            this.$axios
                .get('/menu/getMenuByRole')
                .then(response => {
                    this.myMenu = response.data.data;
                    console.log(this.myMenu)
                })
                .catch(failmessage => {
                    this.$message.error(("菜单获取失败！错误信息："+failmessage))
                })
        }
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
