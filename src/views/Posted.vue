<!--
 * @Author: hayyot
 * @Date: 2023-04-04 11:05:34
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\views\Posted.vue
-->
<template>
    <div id="posted">
        <div style="height: 180px; display: flex; flex-direction: column; justify-content: center; flex-wrap: nowrap;">
            <div>
                <span style="font-size: 30px;">标题：</span><input class="posted-topic" type="text" v-model="input_topic" placeholder="请输入标题">
                <span style="font-size: 30px; margin-left: 20px;">板块：</span><el-select class="posted-select" v-model="value" placeholder="请选择板块" size="20">
                    <el-option
                        class="posted-option"
                        v-for="item in sections"
                        :key="item.sid"
                        :label="item.sname"
                        :value="item.sid">
                    </el-option>
                </el-select>
                
            </div>
            <div>
                <span style="font-size: 30px;position: relative;top: -45px;">简介：</span>
                <el-input
                    class="el-jianjie"
                    type="textarea"
                    :rows="3"
                    placeholder="请输入简介"
                    v-model="jianjie">
                </el-input>
                
            </div>
            
        </div>
        <div style="display: flex;">
            <WangEditor class="wangeditor" @change="changeWang" :value="WangValue"></WangEditor>
            <!-- <div class="content-display" v-html="WangValue"></div> -->
        </div>
        <div style="display: flex; justify-content: center; margin-top: 20px;">
            <el-button class="el-btn" @click="subbmit">
                提交
            </el-button>
            
        </div>
        <div style="height: 20px;"></div>
    </div>
</template>

<script>
import WangEditor from '../components/moven-editor.vue'
import { getSection } from '@/api/api';
import { Toast } from 'vant';
import { insertContent } from '@/api/posted'
import Prismjs from 'prismjs';
export default {
    name: 'ForumFePosted',

    data() {
        return {
            topic: '',
            WangValue:'',
            input_topic:'',
            sections: [],
            value: '',
            content_params:{},
            jianjie:'',
            uid: 0
        };
    },

    mounted() {
        this.uid = localStorage.getItem('uid')
        getSection().then(res => {
            this.sections = res.data
            // console.log(res);
        })

        this.$nextTick(() => {
            Prismjs.highlightAll()
        });
    },

    updated() {
        Prismjs.highlightAll()
    },

    methods: {
        changeWang(html){
            //这里的html是带有标签的
            this.WangValue=html
            // console.log(this.WangValue)
        },
        subbmit(){
            this.content_params.uid = this.uid;
            this.content_params.sid = this.value;
            this.content_params.biaoTi = this.input_topic;
            this.content_params.neiRong = this.WangValue;
            this.content_params.tstart = 0;
            this.content_params.tshou = 0;
            this.content_params.jianjie = this.jianjie
            // console.log(this.content_params);
            this.axios({
                url:'http://47.107.225.176:8808/insert',
                method:'post',
                data:this.content_params,
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(res => {
                // console.log(res);
                Toast.success({
                    message: '发布成功',
                    forbidClick: true,
                });
                this.$router.push('/')
            })
        }
    },

    components: {
        WangEditor,
}
};
</script>

<style lang="scss" scoped>
#posted{
    margin-top: 0px;
    text-align: center;
    overflow:auto;
    position: absolute;
    width: 100%;
    min-height: 100%;
    margin-bottom: 100px;
    background: #f1f1f1;
}
.wangeditor {
    display: inline-block;
    /* position: relative; */
    /* right: 25%; */
    width: 60%;
    z-index: 1;
}
.content-display {
    display: inline-block;
    position:absolute;
    height:680px;
    overflow:hidden;
    width: 49%;
    z-index: 0;
    overflow-y: scroll;
    border: 1px solid #a3a3a3;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 5px;
}
.posted-topic {
    height: 60px;
    width: 800px;
    border: none;
    border-radius: 10px;
    font-size: 30px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.posted-select{
    display: inline-block;
    position: relative;
    margin-left: 30px;
    width: 300px!important;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    ::v-deep {
    .el-input__inner {
        font-size: 30px;
        height: 60px;
    }

    .el-input__prefix, .el-input__suffix {
      height: 60px;
    }

    /* 下面设置右侧按钮居中 */
   .el-input__suffix {
      top: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap;
      flex-direction: row;
      align-content: flex-start;
    }
    .el-input__icon {
      line-height: 32px;
    }
  }
}
.el-btn {
    height: 60px!important;
    width: 160px!important;
    font-size: 30px;
    margin-left: 30px;
    color: white;
    background-color: #66cc99;
    
}
.el-btn:hover {
    color: white;
    background-color: #99CCCC;
}
.el-btn:focus {
    color: white;
    background-color: #99CCCC;
}
.el-jianjie {
    width: 800px;
    margin-top: 20px;
    font-size: 16px;
}
</style>