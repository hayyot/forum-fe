<!--
 * @Author: hayyot
 * @Date: 2023-04-04 11:05:34
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\views\Posted.vue
-->
<template>
    <div id="posted">
        <div>
            <el-input class="input_topic" size="100px" width="600px" v-model="topic" placeholder="请输入文章标题.."></el-input>
            <el-button type="success">发布</el-button>
            <div class="input_topic-img">
                <el-avatar icon="el-icon-user-solid" :src="imgurl"></el-avatar>
            </div>
        </div>
        <Editor></Editor>
    </div>
</template>

<script>
import Editor from '../components/moven-editor.vue'
export default {
    name: 'ForumFePosted',

    data() {
        return {
            topic: '',
            imgurl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        };
    },

    mounted() {
        
    },

    methods: {
        
    },

    components: {
    Editor,
}
};
</script>

<style scoped>
#posted{
    margin-top: 0px;
}
.input_topic{
    /* height: 200px; */
    width: 90%;
    padding-bottom: 20px;
    padding-right: 20px;
}
.input_topic-img{
    padding-left: 20px;
    position: relative;
    top: 15px;
    height: 50px;
    width: 50px;
    display: inline-block;
}
.input_topic-img img{
    height: 50px;
    width: 50px;
    display: inline-block;
}
</style>