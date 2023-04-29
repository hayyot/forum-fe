<template>
  <div class="myart1">
    <!-- <article-item v-for="a in allData" :key="a.id" v-bind="a"/> -->
      <el-empty
      v-if="data_list.length === 0"
      :image-size="250"
      description="暂未发表任何文章额"
    ></el-empty>
    <div class="index-mid_content">
        <ul class="imc-list">
          <li v-for="item,index in data_list" :key="index" @click="to_page(item.tid)">
            <div class="title">{{ item.biaoTi }}</div>
            <!-- <div class="user">
              <img :src="item.user.headImage" alt="" srcset="">
              <span>{{ item.user.username }}</span>
            </div> -->
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
      </div>
  </div>
</template>

<script>
import { findArticalByuid } from "@/api/user.js";
export default {
  name: "MyArticle",
  data() {
    return {
      data_list:[],
      current:1,//分页：当前页
      limit:10,//分页：限制数量
      total:0,
    };
  },
  mounted() {
    
    findArticalByuid(this.current,this.limit,this.$route.params.id).then(res => {
      console.log(res);
      this.data_list = res.data.records
      this.total = res.data.total
    })
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    async handleCurrentChange(val) {
      findArticalByuid(val,this.limit,this.$route.params.id).then(res => {
        // console.log(res);
        this.data_list = res.data.records
        // console.log(this.data_list);
      })
    },
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
  margin-top: 20px;
  text-align: left  ;
  padding: 10px;
  // padding-top: 20px;
  cursor: pointer;
  li {
    // border: 1px solid black;
    border-bottom: 2px solid gainsboro;
    // height: 100px;
    padding: 10px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    & > .title {
      font-size: 18px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #66CCCC;
      display: inline-block;
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
      font-size: 16px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #cdcdcd;
    }
    & .user {
      position: relative;
      left: 20px;
      top: 10px;
      display: inline-block;
      img {
        height: 30px;
        width: 30px;
        border: 1px solid black;
        border-radius: 50%;
      }
      span {
        position: relative;
        bottom: 10px;
        left: 10px;
      }
    }
  }
}
</style>