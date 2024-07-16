<script setup lang="ts">
    import { useClipboard } from '@vueuse/core';

    const iconArr = ref(['rotate-ccw', 'loader', 'settings', 'sun']);
    const { copy, isSupported } = useClipboard();
    const handleCopy = (text: string) => {
        if (!isSupported) {
            CunMessage.error('您的浏览器不支持Clipboard API');
            return;
        }
        const htmlText = `<cun-icon type="${text}" />`;
        copy(htmlText);
        CunMessage.success('复制成功');
    };
</script>

<template>
    <cun-flex wrap gap="20">
        <cun-flex
            v-for="(item, index) in iconArr"
            :key="index"
            v-tooltip="{
                content: '点击复制',
                placement: 'bottom',
                trigger: 'mouseenter'
            }"
            direction="y"
            class="icon-box"
            @click="handleCopy(item)"
        >
            <cun-icon size="36" :type="item" animation="spin" animation-speed="fast" />
            <div class="name">
                {{ item }}
            </div>
        </cun-flex>
    </cun-flex>
</template>

<style lang="scss" scoped>
    .icon-box {
        margin-top: 40px;
        width: 140px;
        border-radius: var(--cun-border-radius-small);
        transition: all 0.15s;
        cursor: pointer;

        .name {
            white-space: nowrap;
            color: #999;
        }
    }

    .icon-box:hover {
        transform: translateY(-3px);
    }
</style>
