<script setup lang="ts">
    import { DemoMark1, DemoMark1Code } from './demo';
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
        <cun-title>Mark</cun-title>
        <p class="sub-title">虽然这个小东西看起来很小很简单，但是却非常有趣且有用，不是吗？</p>
        <cun-demo-box title="文本标记" :code="DemoMark1Code" codeType="js">
            <demo-mark1></demo-mark1>
        </cun-demo-box>
    </div>
</template>