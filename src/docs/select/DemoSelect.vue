<script setup lang="ts">
    import {
        DemoSelect1,
        DemoSelect2,
        DemoSelect3,
        DemoSelect4,
        DemoSelect5,
        DemoSelect6,
        DemoSelect7,
        DemoSelect1Code,
        DemoSelect2Code,
        DemoSelect3Code,
        DemoSelect4Code,
        DemoSelect5Code,
        DemoSelect6Code,
        DemoSelect7Code
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
        <cun-title>Select</cun-title>
        <p class="sub-title"> 一个自带搜索的、支持异步请求、支持虚拟列表、支持插槽的选择器 </p>
        <cun-demo-box title="常规" :code="DemoSelect1Code">
            <demo-select1 />
        </cun-demo-box>
        <cun-demo-box title="触发方式" :code="DemoSelect2Code">
            <demo-select2 />
        </cun-demo-box>
        <cun-demo-box title="支持搜索" :code="DemoSelect3Code">
            <demo-select3 />
        </cun-demo-box>
        <cun-demo-box title="插槽" :code="DemoSelect4Code">
            <demo-select4 />
        </cun-demo-box>
        <cun-demo-box title="禁用项" :code="DemoSelect5Code">
            <demo-select5 />
        </cun-demo-box>
        <cun-demo-box title="其他" :code="DemoSelect6Code">
            <demo-select6 />
        </cun-demo-box>
        <cun-demo-box title="空状态插槽" :code="DemoSelect7Code">
            <demo-select7 />
        </cun-demo-box>
        <cun-docs-tables :options="options"></cun-docs-tables>
    </div>
</template>