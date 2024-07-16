<script setup lang="ts">
    import {
        DemoBackTop1,
        DemoBackTop1Code,
        DemoBackTop2,
        DemoBackTop2Code,
        DemoBackTop3,
        DemoBackTop3Code
    } from './demo';
    import CunDemoBox from '../../layout/CunDemoBox.vue';
    import * as API from './api';

    const options = ref(
        Object.keys(API).map((key: any) => {
            // @ts-ignore
            return API[key];
        })
    )
</script>

<template>
    <div class="demo-wrapper">
        <cun-title>BackTop</cun-title>
        <cun-demo-box title="基本用法" :code="DemoBackTop1Code" codeType="js">
            <demo-back-top1 />
        </cun-demo-box>
        <cun-demo-box title="自定义内容" :code="DemoBackTop2Code" codeType="js">
            <demo-back-top2 />
        </cun-demo-box>
        <cun-demo-box title="指令" :code="DemoBackTop3Code" codeType="js">
            <demo-back-top3 />
        </cun-demo-box>
        <cun-flex gap="20" direction="y" x="center" y="center">
            <div><cun-title>我是空白</cun-title></div>
            <div><cun-title>我是空白</cun-title></div>
            <div><cun-title>我是空白</cun-title></div>
            <div><cun-title>我是空白</cun-title></div>
            <div><cun-title>我是空白</cun-title></div>
            <div><cun-title>我是空白</cun-title></div>
        </cun-flex>
    </div>
</template>

<style lang="scss" scoped>
    .main {
        width: 100%;
        margin: 0 auto;

        > div {
            margin-bottom: 40px;
        }
    }
</style>