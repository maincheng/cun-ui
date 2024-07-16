<script setup lang="ts">
    import { useCunTo } from '../../../hooks';
    import { getColorType } from 'cun-ui/utils';
    import { markProps } from './props';

    const props = defineProps(markProps);
    const { cunTo } = useCunTo();
    
    const getStyle = computed(() => {
        const { color, round, bold, to } = props;
        let styleObj = {} as any;
        let _color = getColorType(color);
        styleObj.borderRadius = round ? '20px' : '4px';
        styleObj.fontWeight = bold ? bold : '';
        styleObj.color = `var(--cun-color-${_color}-dark)`;
        styleObj.backgroundColor = `var(--cun-color-${_color}-light)`;
        styleObj.cursor = to ? 'pointer' : '';
        return styleObj;
    })
</script>

<template>
    <span class="cun-mark" :style="getStyle" @click="cunTo(to)">
        <slot />
    </span>
</template>

<style lang="scss" scoped>
    .cun-mark {
        display: inline;
        border-radius: 4px;
        padding: 2px 6px;
        margin: 0px 3px;
        box-decoration-break: clone;
        -webkit-box-direction-break: clone;
    }
    .cun-mark-to {
        cursor: pointer;
    }

    .cun-mark-round {
        border-radius: 20px;
    }
</style>