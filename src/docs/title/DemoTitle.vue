<script setup lang="ts">
    import {
        DemoTitle1,
        DemoTitle2,
        DemoTitle3,
        DemoTitle1Code,
        DemoTitle2Code,
        DemoTitle3Code
    } from './demo';
    import CunDemoBox from '../../layout/CunDemoBox.vue';
    import * as API from './api';

    const options = ref(
        Object.keys(API).map((key: any) => {
            // @ts-ignore
            return API[key];
        })
    );
</script>
<template>
    <div class="demo-wrapper">
        <cun-title>Title</cun-title>
        <cun-demo-box title="普通" :code="DemoTitle1Code" codeType="js">
            <demo-title1 />
        </cun-demo-box>
        <cun-demo-box title="粗体" :code="DemoTitle2Code" codeType="js">
            <demo-title2 />
        </cun-demo-box>
        <cun-demo-box title="主题色" :code="DemoTitle3Code" codeType="js">
            <demo-title3 />
        </cun-demo-box>
    </div>
</template>
