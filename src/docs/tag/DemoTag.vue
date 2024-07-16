<script setup lang="ts">
    import {
        DemoTag1,
        DemoTag2,
        DemoTag3,
        DemoTag4,
        DemoTag5,
        DemoTag6,
        DemoTag1Code,
        DemoTag2Code,
        DemoTag3Code,
        DemoTag4Code,
        DemoTag5Code,
        DemoTag6Code
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
        <cun-title>Tag</cun-title>
        <cun-demo-box title="基本用法" :code="DemoTag1Code" codeType="js">
            <demo-tag1 />
        </cun-demo-box>
        <cun-demo-box title="尺寸" :code="DemoTag2Code" codeType="js">
            <demo-tag2 />
        </cun-demo-box>
        <cun-demo-box title="色彩系统" :code="DemoTag3Code" codeType="js">
            <demo-tag3 />
        </cun-demo-box>
        <cun-demo-box title="禁用与关闭" :code="DemoTag4Code" codeType="js">
            <demo-tag4 />
        </cun-demo-box>
        <cun-demo-box title="前后插槽" :code="DemoTag5Code" codeType="js">
            <demo-tag5 />
        </cun-demo-box>
        <cun-demo-box v-if="false" title="Disabled" :code="DemoTag6Code" codeType="js">
            <demo-tag6 />
        </cun-demo-box>
        <!-- <cun-docs-tables :options="options"></cun-docs-tables> -->
    </div>
</template>
