<template>
    <div class="item-bg">
        <div class="item-left">
            <div>
                <img src="@/assets/thumb-before.svg" />
            </div>
            <div>
                <img src="@/assets/star-before.svg" />
            </div>
            <div>
                <img src="@/assets/remark-before.svg" />
            </div>
        </div>
        <div class="item-content">
            <div v-html="content" v-highlight>

            </div>
        </div>
        <div class="item-right">

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
        };
    },
    beforeCreate() {
        getItemById({tid:this.$route.params.id,uid:1}).then(res => {
            // console.log(res);
            this.content_list = res.data
            this.content = res.data.wenzhang.neiRong
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
}
.item-left {
    border-radius: 5px;
    margin-top: 20px;
    margin-right: 20px;
    width: 48px;
    // background: #ffffff;
    div {
        margin-bottom: 20px;
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
    width: 300px;
    height: 200px;
    margin-left: 20px;
    background: #ffffff;
}
</style>