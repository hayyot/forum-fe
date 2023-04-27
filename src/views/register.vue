<!--
 * @Author: hayyot
 * @Date: 2023-04-11 16:38:39
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\views\register.vue
-->
<template>
    <div>
        <el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose" title="注册" 
                   :close-on-click-modal="false" append-to-body width="30%">
            <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="100px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="formData.username" placeholder="请输入用户名" clearable :style="{width: '100%'}">
                    </el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password" placeholder="请输入密码" clearable show-password
                              :style="{width: '100%'}"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" prop="repassword" >
                    <el-input v-model="formData.repassword" placeholder="重复密码" clearable show-password blur="checkPassword"
                              :style="{width: '100%'}" @input="checkPassword"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="formData.email" placeholder="请输入邮箱" clearable :style="{width: '100%'}">
                        <el-button slot="append" @click="getVerify" :disabled="formData.email==undefined || !canClick">{{ getCode }}</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="yzm">
                    <el-input v-model="formData.yzm" placeholder="请输入验证码" clearable :style="{width: '100%'}" @input="pdYzm">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="handelConfirm" :disabled="okRegister">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import axios from "axios";
import { Toast } from "vant";

export default {
    name: "mRegister",
    inheritAttrs: false,
    components: {},
    props: [],
    data() {
        return {
            okRegister:true,
            formData: {
                username: undefined,
                password: undefined,
                repassword: undefined,
                email: undefined,
                yzm: undefined,
            },
            rules: {
                username: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }, {
                    pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9-]{2,16}$/,
                    message: '输入正确的用户名',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }, {
                    pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
                    message: '格式错误，6-16位由字母数字组成',
                    trigger: 'blur'
                }],
                repassword: [{
                    required: true,
                    message: '重复密码',
                    trigger: 'blur'
                },{
                    pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,16}$/,
                    message: '',
                    trigger: 'blur'
                }],
                email: [{
                    required: true,
                    message: '请输入邮箱',
                    trigger: 'blur'
                }, {
                    pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                    message: '请输入正确邮箱',
                    trigger: 'blur'
                }],
                yzm: [{
                    required: true,
                    message: '请输入验证码',
                    trigger: 'blur'
                }],
            },
            getCode:'获取验证码',
            canClick:true, // 验证码是否禁用
            totalTime:60
        }
    },
    computed: {

    },
    watch: {},
    created() {
    },
    mounted() {
        // this.$message({
        //     showClose: true,
        //     message: '验证码发送成功',
        //     type: 'success'
        // });
    },
    methods: {
        onOpen() {
        },
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
                    email: this.formData.email,
                    password:this.formData.password,
                    yzm:this.formData.yzm
                };
                var config = {
                    method: 'post',
                    url: 'http://47.107.225.176:8808/insertUser2',
                    headers: {
                        // 'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)',
                        'Content-Type': 'application/json'
                    },
                    data : JSON.parse(JSON.stringify(userList))
                };
                axios(config).then(res=>{
                    console.log(res.data)
                    if(res.message == "注册成功"){
                        Toast.success({
                            message: '注册成功',
                            forbidClick: true,
                        });
                        this.$router.push('/')
                    }
                    else {
                        Toast.fail({
                            message: '注册失败,请检查信息是否输入正确',
                            forbidClick: true,
                        });
                    }
                })
            })
            // var userList = [];
            // userList.push({username: this.formData.username, email: this.formData.email,yzm:this.formData.yzm});
            // axios.post(`http://47.107.225.176:8080/insertUser1`, userList).then()
        },
        getVerify() {
                // console.log(this.formData.username)
                let userList = {
                    username: this.formData.username,
                    email: this.formData.email
                };
                // axios.post(`http://47.107.225.176:8080/insertUser1`, userList).then((response) => {
                //     console.log(response.data)
                // })
                if (!this.canClick) return  
                this.canClick = false
                this.getCode = this.totalTime + 's后重新发送'
                let clock = window.setInterval(() => {
                    this.totalTime--
                    this.getCode = this.totalTime + 's后重新发送'
                    if (this.totalTime < 0) {
                    window.clearInterval(clock)
                    this.getCode = '重新发送验证码'
                    this.totalTime = 60
                    this.canClick = true  
                    }
                },1000)
                var config = {
                    method: 'post',
                    url: 'http://47.107.225.176:8808/insertUser1',
                    headers: {
                        'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)',
                        'Content-Type': 'application/json'
                    },
                    data : JSON.parse(JSON.stringify(userList))
                };
                axios(config).then(res=>{
                    // console.log(res.data)
                    if(res.data.code==201){
                        // console.log("1222222")
                        if(res.data.message=='用户名已经存在')
                            // alert('用户名已存在');
                            this.$alert('用户名已经存在', '出错啦', {
                                confirmButtonText: '确定',
                            });
                        else if(res.data.message=='邮箱已经存在')
                            // this.rules.email[1].message='邮箱已经存在'
                            // alert('邮箱已经存在')
                            this.$alert('邮箱已经存在', '出错啦', {
                                confirmButtonText: '确定',
                            });
                    }
                    else {
                        this.$message({
                            showClose: true,
                            message: '验证码发送成功',
                            type: 'success'
                        });
                    }
                })
        },
        open() {
            this.$alert('这是一段内容', '出错啦', {
                confirmButtonText: '确定',
            });
        },
        checkPassword() {
            // console.log("123333")
            if (this.formData.password !== this.formData.repassword) {
                // console.log("32111111")
                return this.rules.repassword[1].message = "两次输入密码不同";
            }
        },
        pdYzm(){
            this.okRegister = this.formData.yzm.length !== 6;
        }
    }
}

</script>
<style>
</style>
