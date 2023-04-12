<!--
 * @Author: hayyot
 * @Date: 2023-04-09 19:21:36
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\views\Study\StudyIndex.vue
-->
<template>
    <div class="StudyIndex-bg">
      <el-table
          :data="list"
          style="width: 100%"
          row-key="sid"
          border
          lazy
          :load="getChildrens"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
            label=""
            width="230"
            align="left"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sname }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
import { getStudyList } from '@/api/api';

export default {
    name: 'ForumFeStudyIndex',

    data() {
        return {
          list: [],
        };
    },

    mounted() {
      this.getList(0);
    },

    methods: {
      // 获取根目录
      getList(id){
        getStudyList(id).then(res =>{
          this.list = res.data;
          console.log(res.data)
        })
      },
      //判断此目录下是否有子节点
      getChildrens(tree,treeNode,resolve){
        getStudyList(tree.sid).then(res => {
          resolve(res.data);
          console.log(res.data);
        })
      }
    },
};
</script>

<style lang="scss" scoped>
.StudyIndex-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f1f1f1;
}
</style>
