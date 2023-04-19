<template>
    <div>
        <el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose" title="登录享受更多权限" :close-on-click-modal ="false" append-to-body width="30%">
            <el-button class="cta" type="text" @click="outerVisible = true,showDialog = !showDialog">
                <span class="hover-underline-animation">点击注册</span>
                <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                    <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                </svg>
                <cardCustomRightsDialog :visible.sync="showDialog"></cardCustomRightsDialog>
            </el-button>
            <el-form ref="elForm" :model="formData" :rules="rules" size="medium" >
                <el-form-item label="" prop="username">
                    <el-input v-model="formData.username" placeholder="用户名/邮箱" clearable :style="{width: '100%'}">
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input v-model="formData.password" placeholder="请输入密码" clearable show-password
                              :style="{width: '100%'}"></el-input>
                </el-form-item>
                <el-form-item label="" prop="yzm">
                    <el-input v-model="formData.yzm" placeholder="请输入验证码" clearable :style="{width: '100%'}" >
                        <el-button slot="append" @click="pdYzm" v-show="flag">验证</el-button>
                    </el-input>
                </el-form-item>
                <verify v-show="flag" ref="verify" @changeOkLogin="callback"></verify>
            </el-form>
            <div slot="footer">
                <el-button type="primary" @click="handelConfirm" :disabled="okLogin">登录</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import verify from "@/views/Verify.vue";
import axios from "axios";
export default {
    name:"mRegisters",
    inheritAttrs: false,
    components: { cardCustomRightsDialog: () => import('@/views/register.vue'),verify },
    props: [],
    data() {
        return {
            showDialog: false,
            formData: {
                username: undefined,
                password: undefined,
                yzm: undefined,
            },
            rules: {
                username: [{
                    required: true,
                    message: '用户名/邮箱',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }],
                yzm: [{
                    required: true,
                    message: '请输入验证码',
                    trigger: 'blur'
                }],
            },
            flag:true,
            okLogin:true,
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
        onOpen() {},
        onClose() {
            this.$refs['elForm'].resetFields()
        },
        close() {
            this.$emit('update:visible', false)
        },
        handelConfirm() {
            this.$refs['elForm'].validate(() => {
                let userList = {
                    username: this.formData.username,
                    password:this.formData.password,
                };
                var config = {
                    method: 'post',
                    url: 'http://47.107.225.176:8080/login',
                    headers: {
                        'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)',
                        'Content-Type': 'application/json'
                    },
                    data : JSON.parse(JSON.stringify(userList))
                };
                axios(config)
                    .then(function (response) {
                        console.log(JSON.stringify(response.data));
                        this.$emit('hasLogin',this.flag)
                        this.close()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
        },
        pdYzm(){
            this.$refs.verify.checkCode(this.formData.yzm)
        },
        callback(flag){
            if(flag==1)this.okLogin = !this.okLogin
        }
    }
}

</script>
<style>
.cta {
    border: none;
    background: none;
}

.cta span {
    padding-bottom: 7px;
    letter-spacing: 4px;
    font-size: 14px;
    padding-right: 15px;
    text-transform: uppercase;
}

.cta svg {
    transform: translateX(-8px);
    transition: all 0.3s ease;
}

.cta:hover svg {
    transform: translateX(0);
}
、
.cta:active svg {
    transform: scale(0.9);
}

.hover-underline-animation {
    position: relative;
    color: black;
    padding-bottom: 20px;
}

.hover-underline-animation:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #000000;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
}

.cta:hover .hover-underline-animation:after {
    transform: scaleX(1);
    transform-origin: bottom left;
}
</style>
