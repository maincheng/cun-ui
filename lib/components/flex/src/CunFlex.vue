<script setup lang="ts">
    import { flexProps } from './props';
    import { any2px } from 'cun-ui/utils';

    const props = defineProps(flexProps);

    const classObject = computed(() => {
        return {
            [`cun-flex-${props.direction}`]: props.direction,
            'cun-flex-wrap': props.wrap,
            [`cun-flex-x-${props.x}`]: props.x,
            [`cun-flex-y-${props.y}`]: props.y,
            [`cun-flex-mode-${props.mode}`]: props.mode
        };
    });

    const styleObject = computed(() => {
        const gap = any2px(props.gap);
        const width = any2px(props.width);
        return {
            gap: `${gap}`,
            width: `${width}`
        };
    });
</script>

<template>
    <div class="cun-flex" :class="classObject" :style="styleObject">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
    .cun-flex {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        box-sizing: border-box;
    }
    .cun-flex-wrap {
        flex-wrap: wrap;
    }
    .cun-flex-x {
        flex-direction: row;
    }
    .cun-flex-y {
        flex-direction: column;
    }
    .cun-flex-x.cun-flex-x-start {
        justify-content: flex-start;
    }
    .cun-flex-x.cun-flex-x-center {
        justify-content: center;
    }
    .cun-flex-x.cun-flex-x-end {
        justify-content: flex-end;
    }

    .cun-flex-x.cun-flex-y-start {
        align-items: flex-start;
    }
    .cun-flex-x.cun-flex-y-center {
        align-items: center;
    }
    .cun-flex-x.cun-flex-y-end {
        align-items: flex-end;
    }

    .cun-flex-y.cun-flex-x-start {
        align-items: flex-start;
    }
    .cun-flex-y.cun-flex-x-center {
        align-items: center;
    }
    .cun-flex-y.cun-flex-x-end {
        align-items: flex-end;
    }

    .cun-flex-y.cun-flex-y-start {
        justify-content: flex-start;
    }
    .cun-flex-y.cun-flex-y-center {
        justify-content: center;
    }
    .cun-flex-y.cun-flex-y-end {
        justify-content: flex-end;
    }

    .cun-flex-x.cun-flex-mode-between {
        justify-content: space-between;
    }
    .cun-flex-x.cun-flex-mode-around {
        justify-content: space-around;
    }
    .cun-flex-y.cun-flex-mode-between {
        justify-content: space-between;
    }
    .cun-flex-y.cun-flex-mode-around {
        justify-content: space-around;
    }
</style>