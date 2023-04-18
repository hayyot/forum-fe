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
                <ul v-for="item , index in SectionList" :key="index">
                    <li :class="[(currentClick === item) ? 'aActive' :'aNormal']" @click="ChangeLeftitem(item)">
                      <a href="#">{{ item.sname }}   {{item.scount}}篇</a>
                    </li>
                </ul>
            </div>`
        </div>
        <div>
            <div class="index-mid_top">

            </div>
            <div class="index-mid_content">

            </div>
        </div>
        <div>
            <div class="index-right">

            </div>
        </div>
    </div>
</template>

<script>
import {getSection} from "@/api/api";

export default {
    name: 'ForumFeIndexContent',

    data() {
        return {
            indexLeft: ["1","2","3"],
            // indexLeft: [],
            currentClick: "java",
            SectionList: [],
        };
    },

    mounted() {
      this.getList();
    },

    methods: {
        ChangeLeftitem(index) {
            this.currentClick = index
        },
      getList(){
          getSection().then((res) =>{
            this.SectionList = res.data;
            console.log(res.data)
          })
      }
    },
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
    height: 15%;
    border-radius: 7.5px;
    // width: 100%;
    min-width: 500px;
    margin:0px 20px 20px 20px;
    background: #ffffff;
}
.index-mid_content {
    height: 80%;
    min-width: 500px;
    margin:0px 20px 20px 20px;
    border-radius: 7.5px;
    background: #ffffff;
}
.index-right {
    height: 60%;
    width: 40%;
    float: left;
    min-width: 200px;
    border-radius: 7.5px;
    background-color: #ffffff;
}
</style>
