<template>
    <div class="main1">
        <div class="aside">
            <div class="logo">
            </div>
            <div class="meun">
                <el-col>
                    <el-menu router default-active="1" class="el-menu-vertical-demo">
                        <el-menu-item :index="'/user'">
                            <i class="el-icon-menu"></i>
                            <span slot="title">员工信息管理</span>
                        </el-menu-item>
                        <el-menu-item :index="'/car'">
                            <i class="el-icon-setting"></i>
                            <span slot="title">汽车信息管理</span>
                        </el-menu-item>
                        <el-menu-item :index="'/car'">
                            <i class="el-icon-setting"></i>
                            <span slot="title">llllllysssss</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </div>
        </div>
        <div class="contain">
            <div class="head">
                <Header></Header>
            </div>
            <div class="center">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>


<script>
import Header from './header.vue';
export default {
    data() {
        return {

        }
    }, methods: {
    },
    components: {
        Header,
    }

}
</script>


<style>
* {
    box-sizing: border-box;
}

.main1 {
    height: 100%;
    width: 100%;
    display: flex;
}

.aside {
    width: 20%;
}

.contain {
    width: 100%;
    height: 100%;
}

.head {
    height: 15%;
    width: 100%;
    text-align: center;
}


.center {
    height: 85%;
    width: 100%;
}

.logo {
    height: 15%;
    background-image: url(../assets/top-left.png);
    height: 15%;
}
</style>