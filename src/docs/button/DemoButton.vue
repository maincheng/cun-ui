<script setup lang="ts">
    import {
        DemoButton1,
        DemoButton1Code
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
        <cun-title>Button</cun-title>
        <p class="sub-title">赏心悦目的异步效果</p>
        <cun-demo-box title="基本用法" tag="normal" :code="DemoButton1Code" codeType="js">
            <demo-button1 />
        </cun-demo-box>
    </div>
</template>

<style lang="scss" scoped>
    .cun-button {
        margin: 10px;
    }
</style>