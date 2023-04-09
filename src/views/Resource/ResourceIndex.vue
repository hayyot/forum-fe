<template>
    <div class="ResourceIndex-bg">
        
    </div>
</template>

<script>
import { ceshi } from '@/api/api';
export default {
    name: 'ForumFeResourceIndex',

    data() {
        return {
            content:{
                currentPage: '1',
                pageSize: '32'
            }
        };
    },

    mounted() {
        this.axios.get('../../assets/resource.json')
        ceshi().then(res => {
            console.log(res);
        })
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.ResourceIndex-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f1f1f1;
}
</style>