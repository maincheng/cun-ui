<script setup lang="ts">
    const options = ref([
        {
            label: '首页',
            to: '/'
        },
        {
            label: 'Vue',
            to: 'https://vuejs.org'
        },
        {
            label: '商品',
            to: ''
        },
        {
            label: '商品详情',
            to: ''
        }
    ]);
</script>
<template>
    <cun-breadcrumb :options="options" />
</template>