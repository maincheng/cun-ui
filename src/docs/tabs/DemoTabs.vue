<script setup lang="ts">
    import {
        DemoTabs1,
        DemoTabs2,
        DemoTabs3,
        DemoTabs4,
        DemoTabs5,
        DemoTabs1Code,
        DemoTabs2Code,
        DemoTabs3Code,
        DemoTabs4Code,
        DemoTabs5Code
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
        <cun-title>Tabs</cun-title>
        <p class="sub-title">可切换选项卡</p>
        <cun-demo-box title="常规" :code="DemoTabs1Code">
            <demo-tabs1 />
            <cun-alert
                style="margin-top: 20px"
                :size="16"
                :list="[
                    {
                        type: 'info',
                        title: '提示',
                        content: `值得注意的是，按住Shift，上下滑动滚轮，可以实现横向滑动。`
                    }
                ]"
            />
        </cun-demo-box>
        <cun-demo-box title="自适应宽度" :code="DemoTabs2Code"> <demo-tabs2 /></cun-demo-box>
        <cun-demo-box title="自定义item宽度" :code="DemoTabs3Code"> <demo-tabs3 /></cun-demo-box>
        <cun-demo-box title="线" :code="DemoTabs4Code"> <demo-tabs4 /></cun-demo-box>
        <cun-demo-box title="圆形" :code="DemoTabs5Code"> <demo-tabs5 /></cun-demo-box>
    </div>
</template>