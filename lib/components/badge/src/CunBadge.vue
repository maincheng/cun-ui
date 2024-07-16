<script setup lang="ts">
    import { badgeProps } from './props';
    import { getColorType } from 'cun-ui/utils';

    const props = defineProps(badgeProps);
    
    const getStyle = computed(() => {
        const { color } = props;
        let styleObj: Record<string, string> = {};
        let _color = getColorType(color);
        styleObj.backgroundColor = `var(--cun-color-${_color})`
        return styleObj;
    })
</script>

<template>
    <div class="cun-badge">
        <div v-if="value" class="cun-badge-value" :style="getStyle">
            {{ value }}
        </div>
        <div v-if="!value" class="cun-badge-dot" :style="getStyle"></div>
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .cun-badge {
        position: relative;

        .cun-badge-value {
            position: absolute;
            display: inline-flex;
            align-items: center;
            left: 100%;
            bottom: calc(100% - 9px);
            transform: translateX(-50%);
            border-radius: 25px;
            min-width: 18px;
            height: 18px;
            text-align: center;
            padding: 0px 5px;
            font-size: 12px;
            cursor: normal;
            z-index: 1;
            font-weight: normal;
            box-sizing: border-box;
            color: var(--cun-color-white-text);
            background-color: var(--cun-color-error-dark);
        }

        .cun-badge-dot {
            position: absolute;
            left: 100%;
            width: 10px;
            height: 10px;
            bottom: calc(100% - 5px);
            transform: translateX(-50%);
            z-index: 1;
            cursor: normal;
            border-radius: 50%;
            border: 1px var(--cun-color-white) solid;
            box-sizing: border-box;
        }
    }

    .cun-badge-value {
        border-radius: 25px;
    }

    .cun-badge-dot {
        border-radius: 50%;
    }
</style>