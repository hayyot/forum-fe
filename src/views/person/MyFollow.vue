<!--
 * @Author: hayyot
 * @Date: 2023-04-19 15:41:44
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\views\person\MyFollow.vue
-->
<template>
    <div class="myart1">
      <!-- <article-item v-for="a in allData" :key="a.id" v-bind="a"/> -->
      <h2 style="text-align: left;margin-top: 20px;margin-left: 20px;">关注</h2>
      <el-empty
          v-if="data_list.length <= 0"
          :image-size="250"
          description="暂未关注任何人"
        ></el-empty>
        <div class="index-mid_content">
          <ul class="imc-list">
            <li v-for="item,index in data_list" :key="index" style="margin-top: 20px;">
                <div class="imc-img" @click="to_page(item.userList[0].uid)">
                    <img :src="item.userList[0].headImage" alt="">
                    
                </div>
                <div class="imc-details" @click="to_page(item.userList[0].uid)">
                    <p>{{ item.userList[0].username }}</p>
                    <p>{{ item.userList[0].motto != null ? item.userList[0].motto : '座右铭未设置' }}</p>
                </div>
                <div class="imc-btn" v-if="uuid == uid">
                    <button @click="concelfollow(item.userList[0].uid)">取消关注</button>
                </div>
            </li>
          </ul>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            class="pagination"
            background
            layout="prev, pager, next, jumper"
            :total="total"
            :page-size="limit">
          </el-pagination>
        </div>
    </div>
  </template>
  
  <script>
  import { getDianzanById,getAllFollows,cancelFollow } from "@/api/user";
  
  export default {
    name: "MyFanAndFollow",
    data() {
      return {
        data_list:[],//主页数据列表
        current:1,//分页：当前页
        limit:10,//分页：限制数量
        total:0,
        item_sid:0,
        uuid: 0,
        uid: 0
      };
    },
    mounted() {
        // this.$router.go(0)
        this.uuid = localStorage.getItem('uid')
        this.uid = this.$route.params.id
        getAllFollows(this.current,this.limit,this.$route.params.id).then(res => {
            // console.log(res);
            this.data_list = res.data.records
            this.total = res.data.total
            console.log(this.data_list);
      })
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      async handleCurrentChange(val) {
        getAllFollows(val,this.limit,this.$route.params.id).then(res => {
          console.log(res);
          this.data_list = res.data.records
          console.log(this.data_list);
        })
      },
      to_page(index){
        console.log(index);
        this.$router.push("/user/personal/info/"+index)
        setTimeout(() => {
          this.$router.go(0)
        }, 500);
        // window.location.reload()
        document.documentElement.scrollTop = document.body.scrollTop =0; 
      },
      concelfollow(uid) {
        cancelFollow(localStorage.getItem('uid'),uid).then(res => {
            console.log(res);
            this.$message({
                showClose: true,
                message: "取消关注成功",
                type: "success",
            });
            this.$router.go(0)
        })
      }
    },
    filters: {
          bltime(item){
              item = item.replace("T"," ")
              return item.slice(0,19)
          }
      }
  };
  </script>
  
  <style lang="scss" scoped>
  .el-card {
    border-radius: 0;
  }
  
  .el-card:not(:first-child) {
    margin-top: 5px;
  
  }
  .myart1{
    line-height: 30px;
  }
  .index-mid_content {
      height: 80%;
      min-width: 500px;
      margin:-15px 20px 20px 20px;
      border-radius: 7.5px;
      background: #ffffff;
  }
  .imc-list {
    text-align: left  ;
    padding: 10px;
    padding-top: 20px;
    cursor: pointer;
    li {
      // border: 1px solid black;
      border-bottom: 2px solid gainsboro;
      // height: 100px;
      padding: 10px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      .imc-img {
        display: inline-block;
        img {
            height: 48px;
            width: 48px;
            border: 2px solid #a1a1a1;
            border-radius: 50%;
        }
      }
      .imc-details {
        display: inline-block;
        margin-left: 20px;
        width: 425px;
        position: relative;
        top: -5px;
        :nth-child(1) {
            font-size: 20px;
            font-weight: bold;
        }
        :nth-child(2) {
            color: #7b7b7b;
        }
      }
      .imc-btn {
        display: inline-block;
        position: relative;
        top: -20px;
        button {
            // margin-top: 10px;
            cursor: pointer;
            height: 40px;
            width: 100px;
            // left: 200px;
            border-radius: 5px;
            background-color: #66cc99;
            color: white;
            border: none;
        }
        button:hover {
            // margin-top: 10px;
            cursor: pointer;
            height: 40px;
            width: 100px;
            // left: 200px;
            border-radius: 5px;
            background-color: #66CCCC;
            color: white;
            border: none;
        }
      }
    }
  }
  </style>