<template>
    <div class="tabBar" @click="handleTabBarClick">
        <div class="tabBarContent">
            <a href="#"><img style="height: 50px; width: 50px;" src="../assets/logo.png"></a>
            <ul class="navLeft">
                <li v-for="(item, index) in itemList" :key="index" @click="handleAClick(item.title)">
                    <a :href="item.url" :class="[(currentClick === item.title) ? 'aActive' :'aNormal']">{{item.title}}</a>
                </li>
            </ul>
            <ul class="navRight">
                <li @click.stop>
                    <a @click="handleMenuClick" href="#"><img class="userAvater" src="../assets/logo.png"></a>
                    <ul class="navRight-menu-group" v-if="isMenuShow">
                        <div class="navRight-menu-item" v-for="(items, index) in menuList" :key="index">
                            <li v-for="(subItem, index) in items" :key="index">
                                <a :href="subItem.url">
                                    {{subItem.title}}
                                </a>
                            </li>
                        </div>
                    </ul>
                </li>
                
                <li class="subNav writeArticle">
                    <div class="more" @click.stop>
                        <a href="/posted"><span>写文章</span></a>
                    </div>
                </li>
                
            </ul>
        </div>
        <!-- <div>
            <img src="../assets/logo.png" alt="">
        </div>
        <el-menu :default-active="activeIndex" class="el-menu-tabbar" mode="horizontal" text-color="#000000" @select="handleSelect">
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2">学习</el-menu-item>
            <el-menu-item index="3">知识</el-menu-item>
        </el-menu> -->
    </div>
</template>

<script>
export default {
    name: 'ForumFeTabBar',

    data() {
        return {
            activeIndex: '1',
            menuList: [
                [{
                    title: '写文章',
                    imageUrl: 'iconfont icon-message',
                    url: '/posted'
                }],
                [{
                    title: '我的主页',
                    imageUrl: 'iconfont icon-message',
                    url: '#'
                }, {
                    title: '我赞过的',
                    imageUrl: 'iconfont icon-message',
                    url: '#'
                }, {
                    title: '我的收藏集',
                    imageUrl: 'iconfont icon-message',
                    url: '#'
                }],
                [{
                    title: '个人设置',
                    imageUrl: 'iconfont icon-message',
                    url: '#'
                }, {
                    title: '关于',
                    imageUrl: 'iconfont icon-message',
                    url: '#'
                }],
                [{
                    title: '登出',
                    imageUrl: 'iconfont icon-message',
                    url: '#'
                }]
            ],
            itemList: [{
                    title: '首页',
                    url: '/'
                },
                {
                    title: '资源',
                    url: '/resource'
                },
                {
                    title: '学习',
                    url: '/study'
                },
                {
                    title: '关于我们',
                    url: '#'
                },
                {
                    title: 'github',
                    url: '#'
                }
            ],
            currentClick: '首页',
            isInputFocus: false,
            isShow: false,
            isMenuShow: false
        };
    },

    created() {
        console.log(this.$route.path);
        if(this.$route.path == '/resource'){
            this.currentClick = '资源'
        }
        else if(this.$route.path == '/study'){
            this.currentClick = '学习'
        }
    },

    methods: {
        handleAClick: function (title) {
            this.currentClick = title
        },
        inputFocus: function () {
            this.isInputFocus = true
        },
        inputBlur: function () {
            this.isInputFocus = false
        },
        handleWriteArticle: function () {
            this.isShow = !this.isShow
            if (this.isMenuShow) {
                this.isMenuShow = !this.isMenuShow
            }
        },
        handleTabBarClick: function () {
            if (this.isShow) {
                this.isShow = !this.isShow
            }
            if (this.isMenuShow) {
                this.isMenuShow = !this.isMenuShow
            }
        },
        handleMenuClick: function () {
            this.isMenuShow = !this.isMenuShow
            if (this.isShow) {
                this.isShow = !this.isShow
            }
        }
    },
};
</script>

<style scoped>
/* .tabbar {
    height: 4rem;
    width: 100%;
    background-color: #ffffff;
    div {
        display: inline-block;
        position: absolute;
        left: 10%;
        padding-top: 10px;
        padding-left: 50px;
        height: 50px;
        width: 50px;
        img {
            height: 100%;
            width: 100%;
        }
    }
    .el-menu-tabbar {
        display: inline-block;
        position: absolute;
        left: 20%;
        el-menu-item {
            padding-right: 50px;
            width: 200px;
        }
    }
} */
.icon {
    padding-top: 5px;
    width: 25px;
}
.tabBar {
    height: 60px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: #eeeeee;
    background-color: #ffffff;
}

.tabBarContent {
    width: 970px;
    margin: auto;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
}

a {
    text-decoration: none;
}

li {
    list-style: none;
}

.navLeft {
    margin-left: 25px;
}

.navLeft li {
    width: 70px;
    float: left;
}

.navLeft li a {
    display: block;
    height: 60px;
    line-height: 60px;
    text-align: center;
}

.aNormal {
    color: #71777c;
}

.navLeft li a:hover,
.aActive {
    color: #66CCCC;
}


.navRight {
    display: flex;
    flex: 1;
    flex-direction: row-reverse;
    align-items: center;
}

.subNav {
    margin-right: 25px;
}

.navRight>li:first-child {
    height: 30px;
    position: relative;
}

.userAvater {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}

.navRight-menu-group {
    border: #eeeeee solid 1px;
    background-color: #ffffff;
    box-shadow: 0 2px 2px #eeeeee;
    margin-top: 13px;
    border-radius: 3px;
    right: 0px;
    /* left: 50px;   */
    z-index: 9999;
    position: relative;
}

.navRight-menu-item {
    width: 150px;
    padding: 10px 0;
    border-bottom-width: 1px;
    border-bottom-color: #eeeeee;
    border-bottom-style: solid;
    
}
.navRight-menu-item li {
    width: 100%;
    /* text-align: center; */
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.navRight-menu-item li a {
    display: flex;
    align-items: center;
    height: 40px;
    color: #71777c;
}

.navRight-menu-item li a:hover {
    background-color: #f2f2f2;
}

.navRight-menu-item li a i{
    margin: 0 10px;
}

.bell i {
    color: #797575;
}

.bell:hover i {
    color: #66CC99;
}

.writeArticle {
    height: 33px;
}

.writeArticle ul {
    height: 70px;
    border: #eeeeee solid 1px;
    background-color: #ffffff;
    box-shadow: 0 2px 2px #eeeeee;
    border-radius: 3px;
}

.writeArticle ul li a{
    display: block;
    height: 30px;
    line-height: 30px;
    color: #66CC99;
    font-size: 13px;
    text-align: center;
}

.writeArticle ul>li:first-child a{
    margin-top: 5px;
}

.writeArticle ul li a:hover{
    background-color: #f2f2f2;
}

.more {
    height: 33px;
    display: flex;
    align-items: center;
    border-radius: 3px;
    background-color: #66CC99;
}

.more p {
    height: 100%;
    width: 1px;
    background-color: #fff;
    opacity: 0.2;
}

.more>a:first-child{
    height: 33px;
    padding: 0 8px;
    line-height: 33px;
}

.more span {
    display: block;
    font-size: 15px;
    color: #ffffff;
}

.more>a:first-child:hover {
    background-color: #66CC99;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
}

.more>a:last-child {
    display: block;
    height: 33px;
    line-height: 33px;
}

.more>a:last-child:hover {
    background-color: #66CCCC;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
}

.inputSearch {
    width: 144px;
    height: 33px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    padding:0 6px;
    border: 1px solid #eeeeee;
    background-color: rgba(227,231,236,.2);
    border-radius: 2px;
}

.inputSearchFocus {
    width: 144px;
    height: 33px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    padding:0 6px;
    border: 1px solid #66CCCC;
    background-color: rgba(255, 255, 255);
    border-radius: 2px;
}

.inputSearch input, .inputSearchFocus input{
    width: 100%;
    background: none;
    border: 0px;
    flex: 1;
    color: #666666;
    padding-right: 20px;
    font-size: 13px;
    outline: none;
}

::-webkit-input-placeholder {
    color: #a1a1a1;
}

::-moz-placeholder {
    color: #a1a1a1;
}

/* firefox 19+ */
:-ms-input-placeholder {
    color: #a1a1a1;
}

/* ie */
input:-moz-placeholder {
    color: #a1a1a1;
}



.iconfont {
    font-family: "iconfont" !important;
    font-size: 18px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.icon-down:before {
    font-size: 16px;
    color: #ffffff;
}

</style>