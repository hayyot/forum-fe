<template>
  <div class="Personal-bg">
    <div class="PersonTop">
      <div class="PersonTop_img">
        <img style="cursor: pointer;" :src="userInfo.headImage" @click="uploadVisible = true"/>
      </div>
      
      <div class="PersonTop_text">
        <div class="user_text">
          <div class="user_name">
            <span> {{ userInfo.username }} </span>
          </div>
          <div class="user_anniu">
            <el-button
              v-if="editshow"
              class="el-icon-edit"
              type="primary"
              size="medium"
              plain
              @click="edit"
              >编辑</el-button
            >
            <!-- <el-button
              v-if="followshow"
              @click="follow"
              type="primary"
              size="medium"
              icon="el-icon-check"
              v-text="
                isfollowid.indexOf(this.$route.params.id) > -1
                  ? '已关注'
                  : '关注'
              "
            ></el-button> -->
          </div>
          <!-- <div class="user-v" v-if="v === 3">
            <img src="@/assets/logo.png" class="user-v-img" />
            <span class="user-v-font">优质创作者</span>
          </div> -->
          <div class="user_qianming">
            <span>{{ userInfo.email }}</span>
          </div>
          
        </div>
        <div class="user_num">
          <div style="cursor: pointer" @click="myfan">
            <div class="num_number">{{ fensi }}</div>
            <span class="num_text">粉丝</span>
          </div>
          <div style="cursor: pointer" @click="myfollow">
            <div class="num_number">{{ guanzhu }}</div>
            <span class="num_text">关注</span>
          </div>
          <div>
            <div class="num_number">{{ huozan }}</div>
            <span class="num_text">获赞</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
        title="头像上传"
        :visible.sync="uploadVisible"
        width="30%">
        <!-- <span>头像上传</span> -->
        <!-- <el-upload
          class="avatar-uploader"
          action="http://47.107.225.176:8808/updateImage"
          data="up_data1"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img style="border: 1px solid #424242;" v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> -->
        <!-- <div>{{ imageUrl }}</div> -->
        <input type="file" @change="changeFile">
        <br>
        <img style="width: 30%; margin-top: 20px;" :src="dialogImageUrl" alt="">
        <span slot="footer" class="dialog-footer">
          <el-button @click="uploadVisible = false">取 消</el-button>
          <el-button type="primary" @click="uploadImage()">确 定</el-button>
        </span>
      </el-dialog>
    <div class="person_body">
      <div class="person_body_left">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <span class="person_body_list" style="border-bottom: none"
              >个人中心</span
            >
          </div>
          <el-menu
            router
            active-text-color="#00c3ff"
            class="el-menu-vertical-demo"
          >
            <el-menu-item
              index="info"
              :route="{ name: 'info', params: $route.params.id }"
            >
              <i class="el-icon-user"></i>
              <span slot="title">个人简介</span>
            </el-menu-item>
            <el-menu-item
              index="myarticle"
              :route="{ name: 'myarticle', params: $route.params.id }"
            >
              <i class="el-icon-edit-outline"></i>
              <span slot="title">发帖</span>
            </el-menu-item>
            <el-menu-item
              index="myfan"
              :route="{ name: 'myfan', params: $route.params.id }"
            >
              <i class="el-icon-star-off"></i>
              <span slot="title">点赞</span>
            </el-menu-item>
            <el-menu-item
              index="mycollect"
              :route="{ name: 'mycollect', params: $route.params.id }"
            >
              <i class="el-icon-document"></i>
              <span slot="title">收藏</span>
            </el-menu-item>
            <el-menu-item
              index="myfollow"
              :route="{ name: 'myfollows', params: $route.params.id }"
            >
              <i class="el-icon-circle-plus-outline"></i>
              <span slot="title">关注</span>
            </el-menu-item>
          </el-menu>
        </el-card>
      </div>
      <div class="person_body_right" style="height: 100%;">
        <router-view></router-view>
      </div>
    </div>
    <personal-dia ref="dia" @flesh="reload" />
  </div>
</template>

<script>
import { getUserinfoById, userInfo,getUserCount } from "@/api/user";
import {
  myFollow,
  addFollow,
  deleteFollow,
  followAndFanCount,
} from "@/api/follow.js";
import { mygoodCount } from "@/api/good";
import PersonalDia from "./PersonalDia.vue";
import { Upload } from "element-ui";

export default {
  components: { PersonalDia },
  name: "mPersonal",
  inject: ["reload"],
  data() {
    return {
      avatar: "@/assets/logo.png",
      nickname: "",
      v: 1,
      design: "",
      followCounts: "",
      fanCounts: "",
      goodCounts: "",
      isfollow: true,
      followData: {
        fanId: "",
        followId: "",
      },
      isfollowid: [],
      userInfo:{},
      editshow: false,
      followshow: false,
      fensi: 0,
      guanzhu: 0,
      huozan: 0,
      uploadVisible: false,
      imageUrl: '',
      file: null ,
      dialogImageUrl: ''
    };
  },
  mounted() {
    // this.up_data1.uid = localStorage.getItem('uid')
    // this.load();
    // this.$router.go(0)
    if(this.$route.params.id == localStorage.getItem('uid')){
      this.editshow = true
    }
    else {
      this.followshow = true
    }
    getUserinfoById(this.$route.params.id).then(res => {
      // console.log(res);
      this.userInfo = res.data
    })
    getUserCount(this.$route.params.id).then(res => {
      // console.log(res);
      this.fensi = res.data.fansCount
      this.guanzhu = res.data.followCount
      this.dianzan = res.data.starCount
    })
  },
  methods: {
    changeFile(e){
        // 获取文件信息 e.target.files
        console.log(e.target.files[0]);
        this.file=e.target.files[0];
        var reader = new FileReader()
        reader.readAsDataURL(this.file)
        reader.onload = e => {
          console.log('读取成功');
          // e.target.result 获取 读取成功后的  文件DataURL
          this.dialogImageUrl = e.target.result
        }
    },
    handleCloseupload(){
      // this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
    },
    load() {
      userInfo(this.$route.params.id)
        .then((res) => {
          console.log(res);
          this.avatar = res.data.avatar;
          this.nickname = res.data.nickname;
          this.v = res.data.v;
          this.design = res.data.design;
        })
        .catch((err) => {
          console.log(err);
        });

      myFollow(this.$store.state.id)
        .then((res) => {
          res.data.forEach((res) => {
            this.isfollowid.push(res.id);
          });
        })
        .catch((err) => {
          console.log(err);
        });

      followAndFanCount(this.$route.params.id)
        .then((res) => {
          this.followCounts = res.data.followCounts;
          this.fanCounts = res.data.fanCounts;
        })
        .catch((err) => {
          console.log(err);
        });

      mygoodCount(this.$route.params.id)
        .then((res) => {
          this.goodCounts = res.data.goodCounts;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    myfan() {
      this.$router.push({
        path: `/user/personal/myfan/${this.$route.params.id}`,
      });
    },
    myfollow() {
      this.$router.push({
        path: `/user/personal/myfollow/${this.$route.params.id}`,
      });
    },
    follow() {
      if (!this.$store.state.id) {
        this.$message({
          showClose: true,
          message: "请登录后再进行操作哦",
          type: "warning",
        });
      } else {
        this.followData.followId = this.$route.params.id;
        this.followData.fanId = this.$store.state.id;
        if (this.isfollowid.indexOf(this.followData.followId) > -1) {
          this.isfollow = true;
        } else {
          this.isfollow = false;
        }
        if (this.isfollow) {
          deleteFollow(this.followData)
            .then(() => {
              this.isfollow = false;
              this.$message({
                showClose: true,
                message: "已取消关注",
                type: "success",
              });
              this.reload();
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (!this.isfollow) {
          addFollow(this.followData)
            .then(() => {
              this.isfollow = true;
              this.$message({
                showClose: true,
                message: "已成功关注",
                type: "success",
              });
              this.reload();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
    edit() {
      this.$refs.dia.open();
    },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    uploadImage() {
      let formData=new FormData()
      formData.append('file',this.file)
      formData.append('uid',localStorage.getItem('uid'))
      console.log(formData.get("file"));
      console.log(formData.get("uid"));
      this.axios({
          url:'http://47.107.225.176:8808/updateImage',
          method:'post',
          data:formData,
          // headers:{
          //     'Content-Type':'application/json'
          // }
      }).then(res => {
          // console.log(res);
          if(res.code == 200){
            this.$message({
                showClose: true,
                message: "修改成功",
                type: "success",
            });
            this.uploadVisible = false
          }
          // this.$router.go(0)
      })
    }
  },
};
</script>

<style scoped>
.me-video-player {
  background-color: transparent;
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
  position: fixed;
  left: 0;
  z-index: 0;
  top: 0;
}
.PersonTop {
  width: 1000px;
  height: 140px;
  padding-top: 20px;
  background-color: white;
  margin-top: 30px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  border-radius: 5px;
}

.PersonTop_img {
  width: 150px;
  height: 120px;
  background-color: #8c939d;
  margin-right: 24px;
  margin-left: 20px;
  overflow: hidden;
  border-radius: 20px;
}

.PersonTop_img img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

.PersonTop_text {
  height: 120px;
  width: 880px;
  display: flex;
}

.user_text {
  width: 60%;
  height: 100%;
  line-height: 30px;
  text-align: left;
}
.user_anniu {
  display: inline-block;
  margin-left: 40px;
  position: relative;
  top: -3px;
}
.user_name {
  margin-top: 20px;
  font-weight: bold;
  display: inline-block;
  font-size: 25px;
}
.user-v {
  margin-bottom: -5px;
}
.user-v-img {
  width: 15px;
  height: 15px;
}
.user-v-font {
  font-size: 15px;
  color: #00c3ff;
}
.user_qianming {
  font-size: 14px;
  color: #999;
  margin-top: 10px;
  /* display: inline; */
}

.user_num {
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
}

.user_num > div {
  text-align: center;
  border-right: 1px dotted #999;
  box-sizing: border-box;
  width: 80px;
  height: 40px;
  line-height: 20px;
}

.num_text {
  color: #999;
}

.num_number {
  font-size: 20px;
  color: #333;
  margin-bottom: 5px;
}
.el-menu-item>span {
  font-size: 16px;
  color: #999;
}

/*下面部分样式*/
.person_body {
  width: 1000px;
  margin-top: 210px;
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
}

.person_body_left {
  width: 27%;
  /* height: 600px; */
  height: 480px;
  border-radius: 5px;
  margin-right: 3%;
  text-align: center;
}

.person_body_list {
  width: 100%;
  height: 50px;
  margin-top: 25px;
  font-size: 22px;
  border-bottom: 1px solid #f0f0f0;
  background-image: -webkit-linear-gradient(
    left,
    rgb(42, 134, 141),
    #e9e625dc 20%,
    #3498db 40%,
    #e74c3c 60%,
    #09ff009a 80%,
    rgba(82, 196, 204, 0.281) 100%
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-background-size: 200% 100%;
  -webkit-animation: masked-animation 4s linear infinite;
}

.el-menu-item {
  margin-top: 22px;
}

.person_body_right {
  width: 70%;
  /* height: 500px; */
  border-radius: 5px;
  background-color: white;
  /* min-height: 280px; */
}

.box-card {
  /* min-height: 380px; */
  height: 100%;
}

/*ui样式*/
.el-button {
  width: 84px;
}
.Personal-bg {
  overflow:auto;
  position: absolute;
  width: 100%;
  min-height: 100%;
  margin-bottom: 100px;
  background: #f1f1f1;
  text-align: center;
}
.el-menu-vertical-demo{
  height: 460px;
}
.avatar-uploader .el-upload {
    /* border-color: #409EFF; */
    border: 1px solid #424242;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
