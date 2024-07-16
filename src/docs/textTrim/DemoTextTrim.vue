<script setup lang="ts">
    import { DemoTextTrim1, DemoTextTrim2, DemoTextTrim1Code, DemoTextTrim2Code } from './demo';
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
    <div class="demo=wrapper">
        <cun-title>TextTrim</cun-title>
        <p class="sub-title">虽然这小家伙看起来很简单，但是我觉得它非常有用，在我看来。</p>
        <cun-demo-box title="不换行" :code="DemoTextTrim1Code" codeType="js">
            <demo-text-trim1 />
        </cun-demo-box>
        <cun-demo-box title="多行省略" :code="DemoTextTrim2Code" codeType="js">
            <demo-text-trim2 />
        </cun-demo-box>
    </div>
</template>