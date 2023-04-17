<template>
  <div class="myart1">
    <article-item v-for="a in allData" :key="a.id" v-bind="a"/>
    <el-empty
        v-if="allData.length == 0"
        :image-size="250"
        description="暂未收藏任何文章额"
      ></el-empty>
  </div>
</template>

<script>
import { myCollect } from "@/api/collect.js";
import ArticleItem from '../../components/article/ArticleItem.vue';
export default {
  components: { ArticleItem },
  name: "MyCollect",
  data() {
    return {
      allData:[]
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      myCollect(this.$route.params.id)
        .then((res) => {
          console.log(res);
          res.data.forEach(element => {
          element.createDate=this.$options.filters['formatDate'](parseInt(element.createDate))
          });
          this.allData=res.data
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.el-card {
    border-radius: 0;
  }

  .el-card:not(:first-child) {
    margin-top: 5px;

  }
  .myart1{
    line-height: 30px;
  }
</style>