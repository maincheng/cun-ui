<script setup lang="ts">
    import {
        DemoDropdown1,
        DemoDropdown2,
        DemoDropdown3,
        DemoDropdown1Code,
        DemoDropdown2Code,
        DemoDropdown3Code
    } from './demo';
    import CunDemoBox from '../../layout/CunDemoBox.vue'
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
        <cun-title>Dropdown</cun-title>
        <p class="sub-title">
            你可以使用
            <cun-mark to="/Popover" type="light" color="blue">Popover</cun-mark>
            进行高度自定义下拉菜单
        </p>
        <cun-demo-box title="常规" :code="DemoDropdown1Code" codeType="js">
            <demo-dropdown1 />
        </cun-demo-box>
        <cun-demo-box title="不仅仅是按钮" :code="DemoDropdown2Code" codeType="js">
            <demo-dropdown2 />
        </cun-demo-box>
        <cun-demo-box title="无箭头" :code="DemoDropdown3Code" codeType="js">
            <demo-dropdown3 />
        </cun-demo-box>
        <p class="demo-tips">
            你可以在
            <cun-mark to="/Tooltip" type="light" color="blue">Tooltip</cun-mark>
            找到你需要的位置参数。
        </p>
    </div>
</template>