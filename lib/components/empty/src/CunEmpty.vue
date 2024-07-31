<script setup lang="ts">
    import { emptyProps } from './props';
    import { any2px } from 'cun-ui/utils';

    const props = defineProps(emptyProps);

    let src = new URL(`../icon/icon_${props.type}.svg`, import.meta.url).href;

    const emptyStyleObject = computed(() => {
        return {
            width: any2px(props.width),
            height: any2px(props.height)
        };
    });
</script>

<template>
    <div class="cun-empty" :style="emptyStyleObject">
        <img :src="src" alt="" srcset="" />
        <div class="title">{{ title }}</div>
    </div>
</template>

<style lang="scss">
    .cun-empty {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
        img {
            width: 100%;
            height: auto;
        }
        .title {
            color: var(--cun-text-color-8);
        }
    }
    .cun-dark {
        .cun-empty {
            img {
                opacity: 0.6;
            }
        }
    }
</style>