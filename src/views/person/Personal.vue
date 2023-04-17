<template>
  <div>
    <div class="PersonTop">
      <div class="PersonTop_img">
        <img v-image-preview :src="avatar" />
      </div>
      <div class="PersonTop_text">
        <div class="user_text">
          <div class="user_name">
            <span> {{ nickname }} </span>
          </div>
          <div class="user-v" v-if="v === 3">
            <img src="@/assets/logo.png" class="user-v-img" />
            <span class="user-v-font">优质创作者</span>
          </div>
          <div class="user_qianming">
            <span> {{ design }}</span>
          </div>
          <div class="user_anniu">
            <el-button
              class="el-icon-edit"
              type="primary"
              size="medium"
              plain
              @click="edit"
              >编辑</el-button
            >
            <el-button
              @click="follow"
              type="primary"
              size="medium"
              icon="el-icon-check"
              v-text="
                isfollowid.indexOf(this.$route.params.id) > -1
                  ? '已关注'
                  : '关注'
              "
            ></el-button>
          </div>
        </div>
        <div class="user_num">
          <div style="cursor: pointer" @click="myfan">
            <div class="num_number">{{ fanCounts }}</div>
            <span class="num_text">粉丝</span>
          </div>
          <div style="cursor: pointer" @click="myfollow">
            <div class="num_number">{{ followCounts }}</div>
            <span class="num_text">关注</span>
          </div>
          <div>
            <div class="num_number">{{ goodCounts }}</div>
            <span class="num_text">获赞</span>
          </div>
        </div>
      </div>
    </div>
    <div class="person_body">
      <div class="person_body_left">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <span class="person_body_list" style="border-bottom: none"
              >个人中心</span
            >
          </div>
          <!-- <div
            class="person_body_list"
            v-for="(item, index) in person_body_list"
            :key="index"
          >
            <router-link :to="{ name: item.name, params: item.params }">{{
              item.label
            }}</router-link>
          </div> -->
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
              index="mycollect"
              :route="{ name: 'mycollect', params: $route.params.id }"
            >
              <i class="el-icon-document"></i>
              <span slot="title">收藏</span>
            </el-menu-item>
            <el-menu-item
              index="myfan"
              :route="{ name: 'myfan', params: $route.params.id }"
            >
              <i class="el-icon-tableware"></i>
              <span slot="title">粉丝</span>
            </el-menu-item>
            <el-menu-item
              index="myfollow"
              :route="{ name: 'myfollow', params: $route.params.id }"
            >
              <i class="el-icon-circle-plus-outline"></i>
              <span slot="title">关注</span>
            </el-menu-item>
          </el-menu>
        </el-card>
      </div>
      <div class="person_body_right">
        <router-view></router-view>
      </div>
    </div>
    <personal-dia ref="dia" @flesh="reload" />
  </div>
</template>

<script>
import { userInfo } from "@/api/user";
import {
  myFollow,
  addFollow,
  deleteFollow,
  followAndFanCount,
} from "@/api/follow.js";
import { mygoodCount } from "@/api/good";
import PersonalDia from "./PersonalDia.vue";

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
      // person_body_list: [
      //   {
      //     label: "个人简介",
      //     name: "info",
      //     params: { id: this.$route.params.id },
      //   },
      //   {
      //     label: "发帖",
      //     name: "myarticle",
      //     params: { id: this.$route.params.id },
      //   },
      //   {
      //     label: "收藏",
      //     name: "mycollect",
      //     params: { id: this.$route.params.id },
      //   },
      //   {
      //     label: "粉丝",
      //     name: "myfan",
      //     params: { id: this.$route.params.id },
      //   },
      //   {
      //     label: "关注",
      //     name: "myfollow",
      //     params: { id: this.$route.params.id },
      //   },
      // ],
    };
  },
  mounted() {
    this.load();
  },
  watch: {
    $route(to) {
      if (to.path == `/newsuser/personal/${this.$store.state.id}`) {
        // this.load();
        // this.person_body_list.forEach((res) => {
        //   res.params.id = this.$store.state.id;
        // });
        this.reload();
      } else if (to.path == `/newsuser/personal/${this.$route.params.id}`) {
        this.reload();
      }
    },
  },
  methods: {
    load() {
      // this.$store //必须使用此种方法，否则response拦截器会拦截
      //   .dispatch("getUserInfo", this.$store.state.token) //利用vuex
      //   .then((res) => {})
      //   .catch((error) => {
      //     console.log(error);
      //   });
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
}

.user_name {
  font-weight: bold;
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
  height: 600px;
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
}

.box-card {
  height: 500px;
}

/*ui样式*/
.el-button {
  width: 84px;
}
</style>
