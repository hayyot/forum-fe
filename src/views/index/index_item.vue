<!--
 * @Author: hayyot
 * @Date: 2023-04-25 15:29:21
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\views\index\index_item.vue
-->
<template>
    <div class="item-bg">
        <div class="item-left">
            <div @click="thumb = !thumb">
                <img src="@/assets/thumb-later.svg" v-if="thumb"/>
                <img src="@/assets/thumb-before.svg" v-else/>
            </div>
            <div @click="star = !star">
                <img src="@/assets/star-later.svg" v-if="star"/>
                <img src="@/assets/star-before.svg" v-else/>
            </div>
            <div @click="remark = !remark">
                <img src="@/assets/remark-later.svg" v-if="remark"/>
                <img src="@/assets/remark-before.svg" v-else/>
            </div>
        </div>
        <div class="item-content">
            <div v-html="content" v-highlight>

            </div>
        </div>
        <div class="item-right">
            <!-- 头像 -->
            <div>
                <img :src="user_info.headImage" alt="">
            </div>
            <!-- 发帖人信息 -->
            <div>
                <p>{{ user_info.username }}({{ user_info.job }})</p>
                <p>{{ user_info.motto }}</p>
            </div>
            <!-- btn -->
            <div style="margin-top: 10px;margin-bottom: 10px;display: flex;justify-content: center;">
                <button class="follow">关注</button>
            </div>
            <hr>
            <div class="ir-nr">
                <p style="display: block;">获得点赞:&nbsp;&nbsp;&nbsp;{{ content_wenzhang.tstart }}</p>
                <p style="display: block;">获得收藏:&nbsp;&nbsp;&nbsp;{{ content_wenzhang.tshou }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { getItemById } from '@/api/forum-item';
import Prismjs from 'prismjs';
export default {
    name: 'ForumFeIndexItem',

    data() {
        return {
            content_list:{},
            content:``,
            thumb:false,
            star:false,
            remark:false,
            user_info:{},
            content_wenzhang: {}
        };
    },
    beforeCreate() {
        getItemById({tid:this.$route.params.id,uid:1}).then(res => {
            console.log(res);
            this.content_list = res.data
            this.content = res.data.wenzhang.neiRong
            this.user_info = res.data.user
            this.content_wenzhang = res.data.wenzhang
        })
        
    },
    mounted() {
        this.$nextTick(() => {
            Prismjs.highlightAll()
        });
    },

    methods: {
        
    },

    
};
</script>

<style lang="scss" scoped>
.item-bg {
    overflow:auto;
    position: absolute;
    width: 100%;
    min-height: 100%;
    margin-bottom: 100px;
    background: #f1f1f1;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.item-content {
    text-align: left;
    padding: 20px;
    border-radius: 5px;
    margin-top: 20px;
    width: 50%;
    min-height: 1000px;
    background: #ffffff;
    min-width: 820px;
    line-height: 35px;
}
.item-left {
    position: fixed;
    top: 15%;
    left: 11%;
    border-radius: 5px;
    margin-top: 20px;
    margin-right: 20px;
    width: 48px;
    // background: #ffffff;
    div {
        cursor: pointer;
        margin-bottom: 30px;
        height: 48px;
        width: 48px;
        border-radius: 50%;
        background: #ffffff;
        img {
            // border-radius: 50%;
            margin-top: 10px;
            height: 25px;
            width: 25px;
        }
    }
}
.item-right {
    border-radius: 5px;
    margin-top: 20px;
    min-width: 250px;
    height: 200px;
    margin-left: 20px;
    background: #ffffff;
    padding: 10px;
    padding-left: 20px;
    text-align: left;
    font-family: -apple-system,system-ui,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial!important;
    div:nth-child(1) {
        margin-top: 10px;
        display: inline-block;
        
        img {
            height: 48px;
            width: 48px;
            border-radius: 50%;
        }
        
    }
    div:nth-child(2){
        margin: 10px;
        display: inline-block;
        width: 100px;
        p:nth-child(1) {
            font-size: 18px;
            font-weight: 600;
        }
        p:nth-child(2) {
            margin-top: 5px;
            font-size: 14px;
            color: rgb(114, 114, 114);
        }
    }
    .ir-nr {
        font-size: 14px;
        p {
            margin: 10px;
        }
    }
}
.follow {
    cursor: pointer;
    background-color: white;
    border-radius: 5px;
    height: 36px;
    width: 142px;
    border:1px solid #000000;
    background-color: #ccffcc;
}

</style>