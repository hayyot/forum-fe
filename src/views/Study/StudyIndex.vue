<!--
 * @Author: hayyot
 * @Date: 2023-04-09 19:21:36
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\views\Study\StudyIndex.vue
-->
<template>
    <div class="StudyIndex-bg">
        <el-row class="tac">
                <el-col :span="3">
                    <div class="left-gundong">
                        <el-menu
                                default-active="2"
                                class="el-menu-vertical-demo"
                                background-color="#fff"
                                text-color="#000000"
                                @open="getChildrens"
                                active-text-color="#66CC99"
                                v-loading="loading"
                                :unique-opened="true">
                            <el-submenu v-for="item in list" :key="item.sid" :index="item.sid+''">
                                <template slot="title">
                                    <span>{{item.sname}}</span>
                                </template>
                                <template v-for="item in childrenList">
                                    <el-menu-item :key="item.sid" :index="item.sid+''" @click="getMessage(item.value)">
                                        <span slot="title">{{ item.sname }}</span>
                                    </el-menu-item>
                                </template>
                            </el-submenu>
                        </el-menu>
                    </div>
                </el-col>
            <div class="markdown-body" v-html="message" v-if="message!=''"></div>
            <div class="index-content" v-else>
                <img src="@/assets/tushulogo.png" alt="">
                <h1>计算机基础学习</h1>
                <h2>内含30+内容:</h2>
                <p>Java、Python、前端、Go、C++、游戏开发、人工智能 、大数据、云计算、区块链、机器学习、深度学习 、自然语言处理、数据挖掘、数据可视化、图像处理 、网络安全、数据结构与算法、操作系统、数据库、物联网 、嵌入式系统、软件工程、机器人技术、计算机网络 、移动开发、测试、人机交互、编译原理、计算机图形学</p>
            </div>
        </el-row>
    </div>
</template>

<script>
import {getStudyList} from '@/api/api';
import Prismjs from 'prismjs';
import axios from "axios";

export default {
    name: 'ForumFeStudyIndex',

    data() {
        return {
            list: [],
            childrenList:[],
            message:'',
            loading: true
        };
    },

    mounted() {
      this.getList(0);
      Prismjs.highlightAll();
    },

    methods: {
      // 获取根目录
      getList(id){
        getStudyList(id).then(res =>{
          this.list = res.data;
          // console.log(res.data)
            this.loading=false;
        })
      },
      //判断此目录下是否有子节点
      getChildrens(id){
          this.loading=true;
          // console.log("12321")
        this.childrenList=[];
        getStudyList(id).then(res => {
          this.childrenList = res.data;
          // console.log(res.data);
            this.loading=false;
        })
      },
      getMessage(value){
          let _this=this;
          // getValue(value).then(res=>{
          //   this.message=res.data.sneirong
          //     console.log(res.data.sneirong)
          //     Prismjs.highlightAll()
          // })
          var config = {
              method: 'get',
              url: `http://47.107.225.176:8808/getValue/${value}`,
              headers: {
                  'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)'
              }
          };

          axios(config)
              .then(function (res) {
                  _this.message=res.data.data.sneirong;
                  console.log(res.data.data.sneirong)
                  Prismjs.highlightAll()
              })
              .catch(function (error) {
                  console.log(error);
              });
      }
    },
};
</script>

<style lang="scss" scoped>
.StudyIndex-bg {
    overflow:auto;
    position: absolute;
    width: 100%;
    min-height: 100%;
    margin-bottom: 100px;
    background: #f1f1f1;
    // min-height: 80%;
}
.tac{
  text-align: left;
  .left-gundong {
    
    float:left;
    overflow: auto;
    position: fixed;
    margin-bottom: 10px;
    height: 93.5%;
    width:  15%;
    overflow-y: scroll;
  }
}
::v-deep .markdown-body{
    background-color: #fff;
    margin-left: 20%;
    width: 70%;
    h1 {
        margin-bottom: 10px;
    }
    h2 {
        margin-top: 20px;
        margin-bottom: 10px;
    }
    h3 {
        margin-top: 20px;
        margin-bottom: 10px;
    }
    a:visited {
        color: blue;
    }
    p {
        font-size: 17px;
        line-height: 30px;
    }
    li {
        font-size: 17px;
        line-height: 30px;
    }
    svg {
        display: none;
    }
    .top {
        display: none;
    }
}
.markdown-body {
    border-radius: 15px;
    padding: 20px;
}

.index-content{
    background-color: #fff;
    margin-left: 20%;
    width: 70%;
    border-radius: 15px;
    padding: 20px;
    text-align: center;
    img {
        margin-top: 30px;
        height: 400px;
        // width: 400px;
    }
    h1 {
        margin-top: 30px;
        font-size: 80px;
    }
    h2 {
        margin-top: 30px;
        text-align: left;
        font-size: 40px;
    }
    p {
        margin-top: 30px;
        margin-left: 40px;
        text-align: left;
        font-size: 20px;
    }
}
</style>
