<template>
    <div class="container">
        <div class="content">
            <div class="image">
                <!-- <img src="../assets/taxi.jpg"> -->
            </div>
            <div style="width: 50%;" class="lgn">
                <div class="from">
                    <el-form label-width="50px" class="demo-ruleForm">
                        <el-form-item style="width: 70%;">
                            <el-input type="name" v-model="loginForm.username" placeholder="请输入账号"></el-input>
                        </el-form-item>
                        <el-form-item style="width: 70%;">
                            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item style="width: 70%;">
                            <el-button type="primary" style="width:100%;margin-bottom:40px;"
                                @click="submitClick">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { postRequest } from '../utils/api'
export default {
    data() {
        return {
            loginForm: {
                username: null,
                password: null
            }
        }
    }, methods: {
        submitClick: function () {
            let _this = this;
            this.loading = true;
            postRequest('/login', {
                username: this.loginForm.username,
                password: this.loginForm.password
            }).then(resp => {
                _this.loading = false;
                if (resp.code == 1)
                    _this.$router.replace({ path: '/user' });
                else
                    _this.$alert('登录失败!', '失败!');
            }, resp => {
                _this.loading = false;
                _this.$alert('找不到服务器⊙﹏⊙∥!', '失败!');
            });
        }
    },
    beforeMount() {

    }
}


</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-image: url("../assets/bgc.png");
}

.content {
    display: flex;
    width: 60%;
    padding-top: 200px;
    margin: 0 auto;
    justify-content: center;
}

.image {
    width: 50%;
    background-image: url("../assets/taxi_login.png");
    border-radius: 15px 0 0 15px;
}

.image img {
    border-radius: 1px 0 0 10px;
    width: 100%;
}

.lgn {
    box-sizing: border-box;
    background-color: white;
    border-radius: 0px 15px 15px 0px;
}

.from {
    box-sizing: border-box;
    padding-top: 100px;
    padding-left: 30px;
}
</style>