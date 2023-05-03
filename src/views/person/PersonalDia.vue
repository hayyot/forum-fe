<!--
 * @Author: hayyot
 * @Date: 2023-04-19 15:41:44
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\views\person\PersonalDia.vue
-->
<template>
  <div>
      <el-dialog
  title="修改个人信息"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="handleClose">
  <el-form :model="form" :rules="rules" ref="form" label-width="150px">
      <div class="updateinfo">
  <div class="left">
      <el-form-item label="头像">
            <img style="width:150px;height:110px" :src="userInfo.headImage">
          </el-form-item>
                    <!-- <el-form-item label="账号密码" prop="password">
            <el-input v-model="form.password"></el-input>
          </el-form-item> -->
          <el-form-item label="昵称">
            <el-input v-model="userInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="userInfo.age"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-switch
              v-model="userInfo.gender"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="男"
              inactive-text="女"
              :active-value= "1"
              :inactive-value= "0"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          
  </div>
  <div class="right">
      <el-form-item label="用户编号">
            <el-input v-model="userInfo.uid" disabled></el-input>
          </el-form-item>
          <el-form-item label="账号">
            <el-input v-model="userInfo.email" disabled></el-input>
          </el-form-item>
          <!-- <el-form-item label="地区" prop="area">
            <el-input v-model="form.area"></el-input>
          </el-form-item> -->
          <el-form-item label="兴趣爱好">
            <el-input v-model="userInfo.hobby"></el-input>
          </el-form-item>
          <el-form-item label="职业">
            <el-input v-model="userInfo.job"></el-input>
          </el-form-item>
          <el-form-item label="座右铭">
            <el-input v-model="userInfo.motto"></el-input>
          </el-form-item>
          <!-- <el-form-item label="手机号码" prop="mobilePhoneNumber">
            <el-input v-model="userInfo.mobilePhoneNumber"></el-input>
          </el-form-item> -->
  </div>
  </div>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="submit">提 交</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import { getUserinfoById } from "@/api/user.js";

export default {
  name: "PersonalDia",
  data() {
    return {
      dialogVisible: false,
      form: {
        avatar: "",
        password: "",
        nickname: "",
        age: Number,
        email: "",
        mobilePhoneNumber: "",
        sex: Number,
        id: Number,
        account: "",
        area: "",
        hobby: "",
        work: "",
        design: "",
      },
      userInfo: {
        
      },
      rules: {
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "账号密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  async mounted() {
    await getUserinfoById(localStorage.getItem('uid')).then(res => {
      // console.log(res); 
      this.userInfo = res.data
    })
    // this.load();
  },
  methods: {
    open() {
      this.dialogVisible = true;
    },
    // load() {
    //   userInfo(this.$store.state.id)
    //     .then((res) => {
    //       console.log(res);
    //       Object.assign(this.form, res.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    submit() {
      // console.log(this.userInfo.gender);
      // console.log(this.userInfo);
      this.axios({
          url:'http://47.107.225.176:8808/updateUser',
          method:'post',
          data:this.userInfo,
          headers:{
              'Content-Type':'application/json'
          }
      }).then(res => {
          // console.log(res);
          if(res.code == 200){
            this.$message({
                showClose: true,
                message: "修改成功",
                type: "success",
            });
          }
          this.$router.go(0)
      })
      /*updateUser(this.form)
        .then((res) => {
          // console.log(res);
          this.dialogVisible = false;
          this.$emit("flesh");
        })
        .catch((err) => {
          // console.log(err);
        });*/
    },
    handleClose() {
      this.dialogVisible = false;
      this.$emit("flesh");
    },
  },
  watch:{
    
  }
};
</script>

<style scoped>
.updateinfo {
  height: 350px;
  overflow: auto;
}
.left {
  /* width: 330px; */
  float: left;
}
.right {
  overflow: hidden;
}
</style>