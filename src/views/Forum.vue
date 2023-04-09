<!--
 * @Author: hayyot
 * @Date: 2023-04-09 10:12:25
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\views\Forum.vue
-->
<template>
    <div class="Forum-bg">
        <el-row>
            <el-button size="small" v-for="item,index in type_list" :key="index">{{item.name}}</el-button>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'ForumFeForum',

    data() {
        return {
            type_list:[
                {
                    name:'内容1',
                },
                {
                    name:'内容2',
                },
                {
                    name:'内容3',
                },
                {
                    name:'内容4',
                },
                {
                    name:'内容5',
                },
            ]
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.Forum-bg{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f1f1f1;
}
</style>