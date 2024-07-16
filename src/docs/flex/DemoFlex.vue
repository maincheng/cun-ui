<script setup lang="ts">
    import {
        DemoFlex1,
        DemoFlex1Code,
        DemoFlex2,
        DemoFlex2Code,
        DemoFlex3,
        DemoFlex3Code
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
        <cun-title>Flex</cun-title>
        <p class="sub-title">弹性布局的组件</p>
        <cun-demo-box title="row" :code="DemoFlex1Code" codeType="js">
            <DemoFlex1 />
        </cun-demo-box>
        <cun-demo-box title="column" :code="DemoFlex2Code" codeType="js">
            <DemoFlex2 />
        </cun-demo-box>
        <cun-demo-box title="mode" :code="DemoFlex3Code" codeType="js">
            <DemoFlex3 />
        </cun-demo-box>
    </div>
</template>