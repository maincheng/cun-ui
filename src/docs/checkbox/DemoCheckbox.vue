<script setup lang="ts">
    import {
        DemoCheckbox1,
        DemoCheckbox2,
        DemoCheckbox3,
        DemoCheckbox4,
        DemoCheckbox5,
        DemoCheckbox1Code,
        DemoCheckbox2Code,
        DemoCheckbox3Code,
        DemoCheckbox4Code,
        DemoCheckbox5Code
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
        <cun-title>Checkbox</cun-title>
        <p class="sub-title">通过复选框选择一个或多个数据。</p>
        <cun-demo-box title="常规" :code="DemoCheckbox1Code">
            <demo-checkbox1 />
        </cun-demo-box>
        <cun-demo-box title="y 布局" :code="DemoCheckbox2Code"> <demo-checkbox2 /></cun-demo-box>
        <cun-demo-box title="块" :code="DemoCheckbox3Code" tag="方的">
            <demo-checkbox3 />
        </cun-demo-box>
        <cun-demo-box title="块" :code="DemoCheckbox4Code" tag="圆的">
            <demo-checkbox4 />
        </cun-demo-box>
        <cun-demo-box title="单个模式" :code="DemoCheckbox5Code">
            <demo-checkbox5 />
        </cun-demo-box>
    </div>
</template>
