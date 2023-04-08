<template>
    <div class="index-bg">
        <TabBar></TabBar>
    </div>
</template>

<script>
import TabBar from '@/components/Tab-bar.vue';
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
        TabBar
    }
};
</script>

<style lang="scss" scoped>
.index-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f1f1f1;
}
</style>