<!--
 * @Author: hayyot
 * @Date: 2023-04-25 15:29:21
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\views\index\index_item.vue
-->
<template>
    <div class="item-bg">
        <div class="item-left">
            <div @click="thumb1">
                <img src="@/assets/thumb-later.svg" alt="点赞" v-if="thumb"/>
                <img src="@/assets/thumb-before.svg" alt="点赞" v-else/>
            </div>
            <div @click="star1">
                <img src="@/assets/star-later.svg" alt="收藏" v-if="star"/>
                <img src="@/assets/star-before.svg" alt="收藏" v-else/>
            </div>
            <div @click="remark = !remark">
                <img src="@/assets/remark-later.svg" alt="评论" v-if="remark"/>
                <img src="@/assets/remark-before.svg" alt="评论" v-else/>
            </div>
        </div>
        <div class="item-content">
            <h1>{{ biaoTi }}</h1>
            <div style="color: #7a7a7a;margin-top: 10px;">{{ createTime | timecl }} <span style="margin-left: 20px;">发帖人：{{ username }}</span></div>
            <hr style="margin-top: 10px;margin-bottom: 20px;">
            <div class="markdown-body" v-html="content" v-highlight></div>
            <hr>
            <div class="ic-remark_me">
                <p>我来评论:</p>
                <div>
                    <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="请输入内容"
                        v-model="remarkarea">
                    </el-input>
                    <div style="height: 1px;"></div>
                    <button @click="submitremark">发表评论</button>
                </div>
            </div>
            <hr>
            
            <div class="ic-remark">
                <p>热门评论🔥</p>
                <el-empty description="暂无评论" v-if="content_remark <= 0"></el-empty>
                <div v-else class="ic-remark_content" v-for="item,index in content_remark" :key="index">
                    <div>
                        <img :src="item.user.headImage" alt="">
                    </div>
                    <div>
                        <p>{{ item.user.username }} <span>{{ item.createTime | timecl }}</span></p>
                        <p>{{ item.pneirong }}</p>
                    </div>
                </div>
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
                <button class="follow" @click="follow()" v-if="!folled">关注</button>
                <button class="follow" @click="unfollow()" v-else>已关注</button>
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
import { Thumb, getItemById,Follow,isFollow,UnFollow } from '@/api/forum-item';
import { Toast } from 'vant';
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
            content_wenzhang: {},
            content_remark:[],
            textarea: ``,
            uid: 0,
            folled: false,
            remarkarea:'',
            biaoTi: '',
            createTime: '',
            username: ''
        };
    },
    async created() {
        // console.log(this.$route.params.id + " " + localStorage.getItem('uid'));
        await getItemById({tid:this.$route.params.id,uid:localStorage.getItem('uid')}).then(res => {
            console.log(res);
            this.content_list = res.data
            this.username = res.data.user.username
            this.biaoTi = res.data.wenzhang.biaoTi
            this.createTime = res.data.wenzhang.createTime
            this.content = res.data.wenzhang.neiRong
            this.user_info = res.data.user
            this.content_wenzhang = res.data.wenzhang
            this.thumb = res.data.wenzhang.startFlag
            this.star = res.data.wenzhang.shouFlag
            this.content_remark = res.data.pinglun
            // console.log(this.content_remark);
        })
        await isFollow(this.user_info.uid,localStorage.getItem('uid')).then(res => {
            // console.log(res);
            this.folled = res.data.followFlag
        })
    },
    mounted() {
        if(localStorage.getItem('uid')){
            this.uid = localStorage.getItem('uid')
        }
        this.$nextTick(() => {
            Prismjs.highlightAll()
        });
    },

    methods: {
        async thumb1(){
            // console.log(this.thumb);
            if(this.thumb){
                await this.axios({
                    url:"http://47.107.225.176:8808/dianzan",
                    method:'post',
                    data:{"tid":this.$route.params.id,"uid":this.uid,"count":-1},
                    headers:{
                        'Content-Type':'application/json'
                    }
                }).then(res => {
                    // console.log(res);
                    this.thumb = !this.thumb
                    this.$message({
                        message: '取消点赞成功',
                        type: 'success'
                    });
                })
            }
            else {
                this.axios({
                    url:"http://47.107.225.176:8808/dianzan",
                    method:'post',
                    data:{"tid":this.$route.params.id,"uid":this.uid,"count":1},
                    headers:{
                        'Content-Type':'application/json'
                    }
                }).then(res => {
                    // console.log(res);
                    this.thumb = !this.thumb
                    this.$message({
                        message: '点赞成功',
                        type: 'success'
                    });
                })
            }
            
        },
        star1(){
            // console.log(this.star);
            if(this.star){
                this.axios({
                    url:"http://47.107.225.176:8808/shoucang",
                    method:'post',
                    data:{"tid":this.$route.params.id,"uid":this.uid,"count":-1},
                    headers:{
                        'Content-Type':'application/json'
                    }
                }).then(res => {
                    // console.log(res);
                    this.star = !this.star
                    this.$message({
                        message: '取消收藏成功',
                        type: 'success'
                    });
                })
            }
            else{
                this.axios({
                    url:"http://47.107.225.176:8808/shoucang",
                    method:'post',
                    data:{"tid":this.$route.params.id,"uid":this.uid,"count":1},
                    headers:{
                        'Content-Type':'application/json'
                    }
                }).then(res => {
                    // console.log(res);
                    this.star = !this.star
                    this.$message({
                        message: '收藏成功',
                        type: 'success'
                    });
                })
            }
            
        },
        async follow() {
            await Follow(this.user_info.uid,localStorage.getItem('uid')).then(res => {
                console.log(res);
                if(res.code == 200){
                    this.$message({
                        message: '关注成功',
                        type: 'success'
                    });
                    this.folled = true
                }
            })
        },
        async unfollow() {
            await UnFollow(this.user_info.uid,localStorage.getItem('uid')).then(res => {
                if(res.code == 200){
                    this.$message({
                        message: '取消关注成功',
                        type: 'success'
                    });
                    this.folled = false
                }
            })
        },
        async submitremark(){
            await this.axios({
                    url:"http://47.107.225.176:8808/insertPL",
                    method:'post',
                    data:{"tid":this.$route.params.id,"uid":this.uid,"pneirong":this.remarkarea},
                    headers:{
                        'Content-Type':'application/json'
                    }
                }).then(res => {
                    // console.log(res);
                    if(res.code == 200){
                        this.$message({
                            message: '发布评论成功',
                            type: 'success'
                        });
                    }
                    // console.log(res);
                    // this.star = !this.star
                    // Toast.success({
                    //     message: '收藏成功',
                    //     forbidClick: true,
                    // });
                })
        }
    },
    filters: {
        timecl(item){
            item = item.replace("T"," ");
            return item.slice(0,19)
        }
    }
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
        // width: 150px;
        p:nth-child(1) {
            font-size: 18px;
            font-weight: 600;
            // width: 100px;
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
    border:1px solid #66CCCC;
    color: #ffffff;
    background-color: #66cc99;
    
}
.follow:hover {
    background-color: #66CCCC;
    color: white;
}
::v-deep .markdown-body{
    background-color: #fff;
    // margin-left: 20%;
    // width: 70%;
    margin-bottom: 40px;
    h1 {
        margin-bottom: 10px;
    }
    h2 {
        margin-top: 20px;
        margin-bottom: 10px;
    }
    h3 {
        margin-top: 20px;
        margin-bottom: 10px;
    }
    a:visited {
        color: blue;
    }
    p {
        font-size: 17px;
        line-height: 30px;
    }
    li {
        font-size: 17px;
        line-height: 30px;
    }
    svg {
        display: none;
    }
    .top {
        display: none;
    }
}
.ic-remark_me {
    margin-top: 20px;
    margin-bottom: 20px;
    p:nth-child(1) {
        font-size: 18px;
        font-weight: bold;
        // margin-bottom: 20px;
    }
    div{
        margin-top: 10px;
        // padding: 20px;
        // width: 800px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        el-input {
            margin-top: 10px;
            width: 400px;
            left: 200px;
        }
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
.ic-remark {
    margin-top: 20px;
    // margin-bottom: 20px;
    p:nth-child(1) {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .ic-remark_content {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        div {
            margin-bottom: 20px;
        }
        div:nth-child(1) {
            width: 50px;
            img {
                height: 48px;
                width: 48px;
                border-radius: 50%;
            }
        }
        div:nth-child(2) {
            width: 770px;
            // background-color: #66CCCC;
            p:nth-child(1) {
                margin-left: 10px;
                font-size: 18px;
                margin-bottom: 0px;
                span {
                    font-size: 14px;
                    color: #7a7a7a;
                    font-weight: 400;
                    margin-left: 10px;
                }
            }
            p:nth-child(2) {
                margin-left: 10px;
                font-size: 16px;
                font-weight: 400;
            }
        }
    }
}
</style>