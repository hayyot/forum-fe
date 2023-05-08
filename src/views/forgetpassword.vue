
<!--
 * @Author: hayyot
 * @Date: 2023-04-11 16:38:39
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\views\forgetpassword.vue
-->
<template>
    <div>
        <el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose" title="忘记密码" 
                   :close-on-click-modal="false" append-to-body width="30%">
            <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="100px">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="formData.email" placeholder="请输入邮箱" clearable :style="{width: '100%'}">
                        <el-button slot="append" @click="getVerify" :disabled="formData.email==undefined || !canClick">{{ getCode }}</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="yzm">
                    <el-input v-model="formData.yzm" placeholder="请输入验证码" clearable :style="{width: '100%'}" @input="pdYzm">
                    </el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                    <el-input v-model="formData.password" placeholder="请输入密码" clearable show-password
                              :style="{width: '100%'}"></el-input>
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

export default {
    name: "mForget",
    inheritAttrs: false,
    components: {},
    props: [],
    data() {
        return {
            okRegister:false,
            formData: {
                password: undefined,
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
            this.$refs['elForm'].validate((valid) => {
                if (valid) {
                    this.okRegister = false
                    let userList = {
                        email: this.formData.email,
                        password:this.formData.password,
                        yzm:this.formData.yzm
                    };
                    var config = {
                        method: 'post',
                        url: 'http://47.107.225.176:8808/updatePasswoerd2',
                        headers: {
                            // 'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)',
                            'Content-Type': 'application/json'
                        },
                        data : JSON.parse(JSON.stringify(userList))
                    };
                    axios(config).then(res=>{
                        // console.log(res.data)
                        if(res.data.code == 200){
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            // this.$router.push('/')
                        }
                        else {
                            this.$message.error('修改失败，请检查信息');
                        }
                        this.close();
                    })
                }
            else {
                    // console.log('error submit!!');
                    this.$message.error('登录失败，请检查表单')
                    return false;
                }
            })
            // var userList = [];
            // userList.push({username: this.formData.username, email: this.formData.email,yzm:this.formData.yzm});
            // axios.post(`http://47.107.225.176:8080/insertUser1`, userList).then()
        },
        getVerify() {
                // console.log(this.formData.username)
                let userList = {
                    email: this.formData.email
                };
                
                
                var config = {
                    method: 'get',
                    url: 'http://47.107.225.176:8808/updatePassword1',
                    params : JSON.parse(JSON.stringify(userList))
                };
                axios(config).then(res=>{
                    // console.log(res.data)
                    if(res.data.code==200){
                        this.$message({
                            showClose: true,
                            message: '验证码发送成功',
                            type: 'success'
                        });
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
                    }
                    else {
                        this.$message.error('验证码发送失败，请检查邮箱是否正确');
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
        // pdYzm(){
        //     this.okRegister = this.formData.yzm.length !== 6;
        // }
    }
}

</script>
<style>
</style>
