<script setup lang="ts">
    import { titleProps } from './props';
    import { any2px } from 'cun-ui/utils';

    const props = defineProps(titleProps);

    const titleStyle = computed(() => {
        const { bold, color } = props;
        const size = any2px(props.size);
        const colorStyle = color
            ? `
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    color: transparent;background-image: linear-gradient(-252deg, var(--cun-color-${color}-dark),var(--cun-color-${color}))`
            : '';
        return `font-weight:${bold};font-size:${size};${colorStyle}`;
    })
</script>

<template>
    <div class="cun-title" :style="titleStyle">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
    .cun-title {
        display: flex;
        align-items: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: var(--cun-text-color-0);
        margin-bottom: 10ox;
    }
</style>