<!--
 * @Author: hayyot
 * @Date: 2023-04-08 20:50:19
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\components\Index-content.vue
-->
<template>
    <div class="index">
        <div>
            <div class="index-left">
                <ul>
                    <li :class="[(currentClick === item.sname) ? 'aActive' :'aNormal']" @click="ChangeLeftitem(item)"  v-for="item , index in SectionList" :key="index">
                      <a href="#" v-if="item.sid == 0">{{ item.sname }}</a>
                      <a href="#" v-else>{{ item.sname }}&nbsp;&nbsp;—&nbsp;&nbsp;{{item.scount}}篇</a>
                    </li>
                </ul>
            </div>`
        </div>
        <div>
            <div class="index-mid_top" ref="carousel">
                <el-carousel trigger="click" :height="carouselHeight" :interval="3000" arrow="always" style="border-radius: 5px">
                  <el-carousel-item v-for="item in 4" :key="item">
                    <h3 class="small">{{ item }}</h3>
                  </el-carousel-item>
                </el-carousel>
            </div>
            <div class="index-mid_content">
              <ul class="imc-list">
                <li v-for="item,index in data_list" :key="index" @click="to_page(item.tid)">
                  <div class="title">{{ item.biaoTi }}</div>
                  <div class="biaoqian">{{ item.section.sname }}</div>
                  <div class="user">
                    <img :src="item.user.headImage" alt="" srcset="">
                    <span>{{ item.user.username }}</span>
                  </div>
                  <div class="des">{{ item.jianjie }}</div>
                  <div class="date">{{ item.createTime | bltime }}</div>
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
              <div style="height: 20px;">

              </div>
              <!-- <div class="infinite-list-wrapper" style="overflow:auto">
                <ul
                    class="list"
                    v-infinite-scroll="load"
                    infinite-scroll-disabled="disabled">
                  <li v-for="i in count" class="list-item" :key="i">{{ i }}</li>
                </ul>
                <p v-if="loading">加载中...</p>
                <p v-if="noMore">没有更多了</p>
              </div> -->
            </div>
        </div>
        <div>
            <div class="index-right">
              <div>
                
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getSection} from "@/api/api";
import { getAllContent, getSectionBysid } from "@/api/home";

export default {
    name: 'ForumFeIndexContent',

    data() {
        return {
            indexLeft: ["1","2","3"],
            // indexLeft: [],
            currentClick: "全部",
            SectionList: [
              {
                sid: 0,
                scount:0,
                sjianjie:'主页简介',
                sname:'全部'
              }
            ],
            carouselHeight: "200px",
            count: 0,
            loading: false,
            data_list:[],//主页数据列表
            current:1,//分页：当前页
            limit:10,//分页：限制数量
            total:0,
            item_sid:0,
            uid:0
        };
    },
  computed: {
    noMore () {
      return this.count >= 20
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
    mounted() {
      if(localStorage.getItem('uid')){
        this.uid = localStorage.getItem('uid')
      }
      this.getList();
      // 获取div的ref=“carousel”的高度
      let carousel_height = window.getComputedStyle(this.$refs.carousel).height;
      // 赋值给 el-carousel中height动态绑定的carouselHeight
      this.carouselHeight = carousel_height

      getAllContent(this.current,this.limit).then(res => {
        this.data_list = res.data.records
        // console.log(res);
        this.total = res.data.total
      }) 
    },

    methods: {
        ChangeLeftitem(item) {
            this.item_sid = item.sid
            this.currentClick = item.sname;
            this.current = 1;
            this.limit = 10;
            if(item.sid == 0){
              getAllContent(this.current,this.limit).then(res => {
                this.data_list = res.data.records
                // console.log(res);
                this.total = res.data.total
              })
            }
            else{
              getSectionBysid(this.current,this.limit,{sid:item.sid}).then(res => {
                this.data_list = res.data.records
                // console.log(res);
                this.total = res.data.total
              })
            }
            
        },
        getList(){
            getSection().then((res) =>{
              res.data.forEach(item => {
                this.SectionList.push(item);
              });
              console.log(this.SectionList);
              // this.SectionList = res.data;
              console.log(res.data)
            })
        },
        load () {
          this.loading = true
          setTimeout(() => {
            this.count += 2
            this.loading = false
          }, 2000)
        },
        to_page(index){
          // console.log(index);
          this.$router.push("/forum/"+index)
          this.$router.go(0)
          document.documentElement.scrollTop = document.body.scrollTop =0; 
        },
        // 改变每页条数
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        // 当前页
        async handleCurrentChange(val) {
          // console.log(`当前页: ${val}`);
          if(this.item_sid == 0){
            await getAllContent(val,this.limit).then(res => {
              this.data_list = res.data.records
              console.log(res);
              this.total = res.data.total
            })
          }
          else {
            await getSectionBysid(val,this.limit,{sid:this.item_sid}).then(res => {
              // console.log(res);
              this.data_list = res.data.records
              // console.log(this.data_list);
            })
          }
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
.index{
    padding-top: 20px;
    height: 80%;
    display: grid;
    // grid-template-columns: repeat(auto-fit, 380px);
    grid-template-columns: 2fr 4fr 2fr;
}
.index-left{
    width: 40%;
    // height: 60px;
    border-radius: 5px;
    min-width: 200px;
    background: #ffffff;
    // margin-right: 5%;
    float: right;
    ul {
        li{
            // border: 1px solid #000000;
            margin: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            line-height: 3rem;
            vertical-align: middle;
            height: 3rem;
            // background-color: aquamarine;
            a {
              display: block;
              width: 100%;
              height: 3rem;
              text-decoration: none;
              color: #000000;
            }
            a:hover {
              border-radius: 5px;
              background-color: #eeeeee;
              color: #66CCCC;
            }
            li:hover{
              background-color: #eeeeee;
              color: #66CCCC;
            }
        }
    }
}
.aActive {
    // margin: 5px;
    border-radius: 7.5px;
    background: #CCFFCC;
    color: #66CCCC;
}
.aNormal {
    color: #71777c;
}

// 中间
.index-mid_top {
    // height: 20%;
    border-radius: 7.5px;
    // width: 100%;
    min-width: 500px;
    margin:0px 20px 20px 20px;
    background: #ffffff;
}
.index-mid_content {
    // height: 80%;
    min-width: 500px;
    margin:0px 20px 20px 20px;
    border-radius: 7.5px;
    background: #ffffff;
}
.index-right {
    height: 30%;
    width: 60%;
    float: left;
    min-width: 200px;
    border-radius: 7.5px;
    background-color: #ffffff;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.pagination {
  margin-top: 20px;
  // margin-bottom: 20px;
}
.imc-list {
  text-align: left  ;
  padding: 10px;
  padding-top: 20px;
  // background-color: #CCFFCC;
  cursor: pointer;
  li {
    // border: 1px solid black;
    border-bottom: 2px solid gainsboro;
    height: 110px;
    padding: 10px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    & > .title {
      display: inline-block;
      font-size: 18px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #66CCCC;
    }
    & .biaoqian {
      display: inline-block;
      margin-left: 10px;
      // border: 1px solid black;
      padding: 5px 5px 5px 5px;
      background-color: #66CCCC;
      color: white;
      font-weight: 600;
      border-radius: 5px;
    }
    & .user {
      position: relative;
      left: 20px;
      top: 10px;
      display: inline-block;
      img {
        height: 30px;
        width: 30px;
        border: 1px solid #71777c;
        border-radius: 50%;
      }
      span {
        position: relative;
        bottom: 10px;
        left: 10px;
        color: #71777c;
      }
    }
    & .des {
      margin-top: 10px;
      height: 48px;
      font-size: 16px;
      // font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #858585;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    & .date {
      // margin-bottom: 30px;
      //   width: 152px;
      // display: inline-block;
      font-size: 16px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #cdcdcd;
    }
  }
}
</style>
