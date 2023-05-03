<!--
 * @Author: hayyot
 * @Date: 2023-04-09 19:18:14
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\views\Resource\ResourceIndex.vue
-->
<template>
    <div class="ResourceIndex-bg">
        <el-row>
            <el-button class="el-btn" :class="elActive[index] ? 'el-btn_focus' : ''" v-for="item,index in topic_list" :key="index" @click="changeTopic(index)">{{ item }}</el-button>
        </el-row>
        <div style="width: 100%;display: flex;justify-content: center;">
            <div class="ResourceIndex-content">
                <div class="ResourceIndex-content_data" v-for="item,index in data_list" :key="index">
                    <a :href="item.link">
                        <div class="ResourceIndex-content_data-head">
                            <img :src="item.logo" alt="">
                            <p>{{ item.resourceName }}</p>
                        </div>
                        <div class="ResourceIndex-content_data-body">
                            {{ item.desc }}
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { ceshi } from '@/api/api';
import data from './resource.json'
export default {
    name: 'ForumFeResourceIndex',

    data() {
        return {
            data_list: [],
            topic_list: ['全部资源','图片','视频','音频','插画','线框图','图标','纹理','背景图片','工具','设计灵感','Mockup','色彩工具'],
            topic_listIndex: '全部资源',
            topic_listFocus: true,
            elActive: []
        };
    },

    mounted() {
        console.log(this.data_list);
        this.data_list = data.data.list
        this.elActive.push(true)
        for(let i=1;i<13;i++){
            this.elActive.push(false)
        }
    },

    methods: {
        changeTopic(index){
            // console.log(index);
            for(let i=0;i<13;i++){
                this.elActive[i] = false;
            }
            this.elActive[index] = true
            this.data_list = []
            if(index == 0){
                this.data_list = data.data.list
            }else{
                data.data.list.forEach(item => {
                    if(item.category == this.topic_list[index]){
                        console.log(item.category)
                        this.data_list.push(item)
                    }
                });
            }
        }
    },
};
</script>

<style lang="scss" scoped>
*{
    margin: 0px;
    padding: 0px;
}
.ResourceIndex-bg {
    // z-index: -1;
    // margin-top: 0rem;
    overflow:auto;
    position: absolute;
    width: 100%;
    min-height: 100%;
    margin-bottom: 100px;
    background: #f1f1f1;
}
.el-btn {
    margin-top: 40px;
    font-size: 1em;
    color: #66CCCC;
    background: #ecf5ff;
    border-color: #66CCCC;
}
.el-btn:hover {
    background-color: #66CC99;
    color: #fff;
    border-color: #66CCCC;
}

.el-btn:focus {
    color: #ecf5ff;
    background: #66CC99;
    border-color: #66CC99;
}
.el-btn_focus {
    color: #ecf5ff;
    background: #66CC99;
    border-color: #66CC99;
}
.ResourceIndex-content {
    width: 80%;
    // height: 120%;
    margin-top: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    // grid-template-columns: repeat(auto-fit, 380px);
}
.ResourceIndex-content_data {
    height: 100px;
    // width: 23.6%;
    min-width: 300px;
    border-radius: 10px;
    background-color: #ffffff;
    margin: 10px;
    a:link {
        color: #000000;
    }
    a:visited {
        color: #000000;
    }
    
    .ResourceIndex-content_data-head{
        width: 100%;
        padding: 2%;
        height: 50px;
        line-height: 40px;
        vertical-align: middle;
        img {
            // display: flex;
            // justify-content: flex-start;
            // margin-left: 25px;
            // margin-top: 10px;
            float: left;
            margin-top: 5px;
            margin-left: 30px;
            height: 50px;
            width: 50px;
            border-radius: 50%;
            display: inline;
        }
        p {
            // display: inline;
            position: relative;
            top: 7.5px;
            // right: 40px;
            left: 20px;
            text-align: left;
            // margin-bottom: 20px;
            font-size: 18px;
            font-weight: 800;
        }
    }
    .ResourceIndex-content_data-body {
        font-size: 14px;
        color: #858585;
        font-weight: 600;
        text-align: left;
        margin-top: 5px;
        margin-left: 40px;
    }
}
// .ResourceIndex-content_data:hover {
//     box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
// }
// ::-webkit-scrollbar {
//   background: transparent;
//   width: 0px;
//   height: 10px
// }

// ::-webkit-scrollbar-thumb {
//   -webkit-border-radius: 5px;
//   -moz-border-radius: 5px;
//   border-radius: 5px;
//   background-color: #e1e1e1;
//   width: 0px;
//   height: 6px;
//   border: 2px solid transparent;
//   background-clip: content-box
// }

</style>