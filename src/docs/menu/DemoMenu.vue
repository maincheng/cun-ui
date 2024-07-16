<script setup lang="ts">
    import { DemoMenu1, DemoMenu1Code } from './demo';
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
        <cun-title>Menu</cun-title>
        <p class="sub-title">一个简单的菜单</p>
        <cun-demo-box title="常规" :code="DemoMenu1Code" codeType="js">
            <demo-menu1 />
        </cun-demo-box>
    </div>
</template>