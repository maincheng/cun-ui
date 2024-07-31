<script setup lang="ts">
    import { DemoPopover1, DemoPopover1Code } from './demo';
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
        <cun-title>Popover</cun-title>
        <p class="sub-title">
            如果你需要信息提示，请可以尝试一下
            <cun-mark type="light" color="blue" to="/Tooltip">Tooltip</cun-mark>
        </p>
        <cun-demo-box title="询问校验" badge="自定义 HTML" :code="DemoPopover1Code" codeType="js">
            <demo-popover1></demo-popover1>
        </cun-demo-box>
    </div>
</template>
