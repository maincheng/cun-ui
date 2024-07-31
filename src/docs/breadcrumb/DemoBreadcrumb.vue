<script setup lang="ts">
    import {
        DemoBreadcrumb1,
        DemoBreadcrumb2,
        DemoBreadcrumb3,
        DemoBreadcrumb1Code,
        DemoBreadcrumb2Code,
        DemoBreadcrumb3Code
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
        <cun-title>Breadcrumb</cun-title>
        <cun-demo-box title="常规" :code="DemoBreadcrumb1Code" codeType="js">
            <demo-breadcrumb1 />
        </cun-demo-box>
        <cun-demo-box title="自定义当前选中" :code="DemoBreadcrumb2Code" codeType="js">
            <demo-breadcrumb2 />
        </cun-demo-box>
        <cun-demo-box title="图标类型" :code="DemoBreadcrumb3Code" codeType="js">
            <demo-breadcrumb3 />
        </cun-demo-box>
    </div>
</template>