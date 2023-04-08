<template>
    <div>
        <mavon-editor 
            v-model="content" 
            ref="md" 
            @change="change" 
            style="min-height: 825px"
        />
    </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
    name: 'ForumFeMovenEditor',

    data() {
        return {
            content:'', // 输入的markdown
            html:'',    // 及时转的html
        };
    },

    mounted() {
        
    },

    methods: {
        // 所有操作都会被解析重新渲染
        change(value, render){
            // render 为 markdown 解析后的结果[html]
            this.html = render;
        },
        // 提交
        submit(){
            console.log(this.content);
            console.log(this.html);
        }
    },
    components: {
        mavonEditor,
    },
};
</script>

<style lang="scss" scoped>

</style>