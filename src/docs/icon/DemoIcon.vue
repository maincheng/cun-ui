<script setup lang="ts">
    import { DemoIcon1 , DemoIcon1Code, DemoIcon2, DemoIcon2Code} from './demo';
    import CunDemoBox from '../../layout/CunDemoBox.vue';
</script>
<template>
    <div class="demo-wrapper">
        <cun-title>Icon</cun-title>
        <p class="sub-title">
            由
            <cun-mark type="light" color="blue" to="https://fengyuanchen.github.io/vue-feather/">vue-feather</cun-mark>驱动
        </p>
        <cun-demo-box title="图标" :code="DemoIcon1Code" codeType="js">
            <demo-icon1 />
        </cun-demo-box>
        <cun-demo-box title="旋转动画" :code="DemoIcon2Code" codeType="js">
            <demo-icon2 />
        </cun-demo-box>
    </div>
</template>

<style lang="scss" scoped>
    .icon {
        --bg-color: rgba(255, 255, 255);
        background-image: radial-gradient(transparent 1px, var(--bg-color) 1px);
        background-size: 4px 4px;
    }
</style>