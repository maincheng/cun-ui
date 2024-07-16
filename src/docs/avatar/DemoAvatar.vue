<script setup lang="ts">
    import { DemoAvatar1, DemoAvatar2, DemoAvatar1Code, DemoAvatar2Code } from './demo';
    import CunDemoBox from '../../layout/CunDemoBox.vue';
    // import CunDocsTables from '../../layout/CunDocsTables.vue';
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
        <cun-title>Avatar</cun-title>
        <p class="sub-title">
            如果你需要为你的头像加上消息的数量，你可以移步
            <!-- <cun-mark type="light" color="blue" to="/Badge">Badge</cun-mark> -->
        </p>
        <cun-demo-box title="普通" :code="DemoAvatar1Code" codeType="js">
            <demo-avatar1 />
        </cun-demo-box>
        <cun-demo-box title="状态" :code="DemoAvatar2Code" codeType="js">
            <demo-avatar2 />
        </cun-demo-box>
        <!-- <cun-docs-tables :options="options"></cun-docs-tables> -->
    </div>
</template>

<style lang="scss" scoped>
    .cun-avatar {
        margin: 10px;
    }
</style>
