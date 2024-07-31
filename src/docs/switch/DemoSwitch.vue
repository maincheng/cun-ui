<script setup lang="ts">
    import {
        DemoSwitch1,
        DemoSwitch2,
        DemoSwitch3,
        DemoSwitch4,
        DemoSwitch1Code,
        DemoSwitch2Code,
        DemoSwitch3Code,
        DemoSwitch4Code
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
        <cun-title>Switch</cun-title>
        <cun-demo-box title="圆的" :code="DemoSwitch1Code">
            <demo-switch1 />
        </cun-demo-box>
        <cun-demo-box title="方的" :code="DemoSwitch2Code">
            <demo-switch2 />
        </cun-demo-box>
        <cun-demo-box title="异步" :code="DemoSwitch3Code">
            <demo-switch3 />
        </cun-demo-box>
        <cun-demo-box title="加载" :code="DemoSwitch4Code">
            <demo-switch4 />
        </cun-demo-box>
    </div>
</template>