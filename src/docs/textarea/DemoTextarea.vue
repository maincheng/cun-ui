<script setup lang="ts">
    import {
        DemoTextarea1,
        DemoTextarea2,
        DemoTextarea3,
        DemoTextarea1Code,
        DemoTextarea2Code,
        DemoTextarea3Code
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
        <cun-title>Textarea</cun-title>
        <cun-demo-box title="尺寸" :code="DemoTextarea1Code" codeType="js">
            <demo-textarea1 />
        </cun-demo-box>
        <cun-demo-box title="字数限制" :code="DemoTextarea2Code" codeType="js">
            <demo-textarea2 />
        </cun-demo-box>
        <cun-demo-box title="其他" :code="DemoTextarea3Code" codeType="js">
            <demo-textarea3 />
        </cun-demo-box>
    </div>
</template>