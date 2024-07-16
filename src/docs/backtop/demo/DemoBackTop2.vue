<template>
    <cun-flex gap="20">
        往下滑，右下角有好东西！
        <cun-back-top target="component-main" @click="getEvent"></cun-back-top>
        <cun-back-top :bottom="100" target="component-main">
        <div>UP</div>
        </cun-back-top>
    </cun-flex>
</template>
<script setup lang="ts">
    const getEvent = () => {
        console.log('回到顶部');
    }
</script>