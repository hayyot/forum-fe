<!--
 * @Author: hayyot
 * @Date: 2023-04-08 18:56:27
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\views\Index.vue
-->
<template>
    <div class="index-bg">
        <IndexContent></IndexContent>
    </div>
</template>

<script>

import IndexContent from '@/components/Index-content.vue';
export default {
    name: 'ForumFeIndex',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
    
    components:{
        IndexContent
    }
};
</script>

<style lang="scss" scoped>
.index-bg {
    overflow:auto;
    position: absolute;
    width: 100%;
    min-height: 100%;
    margin-bottom: 100px;
    background: #f1f1f1;
}

</style>