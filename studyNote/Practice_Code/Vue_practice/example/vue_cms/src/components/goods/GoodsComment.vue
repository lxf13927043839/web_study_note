<template>
    <comment :id="id"></comment>
</template>

<script>
import comment from '../../components/sub_components/Comment.vue'
export default {
    props: ['id'],
    components: {
        comment: comment,
    }
}
</script>

<style lang="less" scoped>

</style>