<script setup lang="ts">
    import {
        DemoBadge1,
        DemoBadge2,
        DemoBadge3,
        DemoBadge1Code,
        DemoBadge2Code,
        DemoBadge3Code,
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
        <cun-title>Badge</cun-title>
        <cun-demo-box title="普通" :code="DemoBadge1Code" codeType="js">
            <demo-badge1 />
        </cun-demo-box>
        <cun-demo-box title="点" :code="DemoBadge2Code" codeType="js">
            <demo-badge2 />
        </cun-demo-box>
        <cun-demo-box title="直接使用" :code="DemoBadge3Code" codeType="js">
            <demo-badge3 />
        </cun-demo-box>
    </div>
</template>