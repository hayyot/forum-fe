<!--
 * @Author: hayyot
 * @Date: 2023-04-09 19:21:36
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\views\Study\StudyIndex.vue
-->
<template>
    <div class="StudyIndex-bg">
<!--      <el-table-->
<!--          :data="list"-->
<!--          style="width: 100%"-->
<!--          row-key="sid"-->
<!--          border-->
<!--          lazy-->
<!--          :load="getChildrens"-->
<!--          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"-->
<!--      >-->
<!--        <el-table-column-->
<!--            label=""-->
<!--            width="230"-->
<!--            align="left"-->
<!--        >-->
<!--          <template slot-scope="scope">-->
<!--            <span>{{ scope.row.sname }}</span>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
        <el-row class="tac">
            <el-col :span="3">
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
<!--                    <template v-for="route of list">-->
<!--                        <el-submenu :key="route.sid" :index="route.sid">-->
<!--                            <template slot="title" >-->
<!--                                <span>{{ route.sname }}</span>-->
<!--                            </template>-->
<!--                            <template v-for="item in childrenList">-->
<!--                                <el-menu-item  :key="item.sid" :index="item.sid">-->
<!--                                    <span slot="title">{{ item.sname }}</span>-->
<!--                                </el-menu-item>-->
<!--                            </template>-->
<!--                        </el-submenu>-->
<!--                        <template >-->
<!--                            <el-menu-item :index="route.path" :key="route.path">-->
<!--                                <span slot="title">{{ route.sname }}</span>-->
<!--                            </el-menu-item>-->
<!--                        </template>-->
<!--                    </template>-->

                </el-menu>

            </el-col>
<!--            <div v-html="message">-->

<!--            </div>-->
            <div class="markdown-body" v-html="message"></div>
        </el-row>

    </div>
</template>

<script>
import {getStudyList} from '@/api/api';
import Prismjs from 'prismjs';
import axios from "axios";
import 'github-markdown-css'

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
      // Prismjs.highlightAll()
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
    position: absolute;
    width: 100%;
    height: 100%;
}
.tac{
  text-align: left;
}
::v-deep .markdown-body{
    margin-left: 20%;
    width: 70%;
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
</style>
