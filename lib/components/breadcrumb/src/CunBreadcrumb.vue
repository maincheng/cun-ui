<script setup lang="ts">
    import { breadcrumbProps } from './props';
    import { useCunTo } from '../../../hooks';
    const { cunTo } = useCunTo();
    defineProps(breadcrumbProps);
</script>

<template>
    <div class="cun-breadcrumb">
        <div
            v-for="(item, index) in options"
            :key="index"
            class="cun-breadcrumb-item"
            :class="{ 'cun-breadcrumb-active': item.active }"
        >
            <span :class="{'cun-breadcrumb-isPath': !!item.to}" @click="cunTo(item.to)">{{ item.label }}</span>
            <div v-if="index != options.length - 1" class="cun-breadcrumb-parting">
                <svg
                    v-if="iconType === 'sprit'"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    stroke-width="4"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                >
                    <path d="M29.506 6.502 18.493 41.498"></path>
                </svg>
                <svg
                    v-if="iconType === 'shoulder'"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    stroke-width="4"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                >
                    <path d="m16 39.513 15.556-15.557L16 8.4"></path>
                </svg>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .cun-breadcrumb {
        display: inline-block;
        align-items: center;
        .cun-breadcrumb-item {
            display: inline-flex;
            align-items: center;
            font-size: 14px;
            font-weight: 400;
            color: var(--cun-text-color-5);
            user-select: none;
            span {
                cursor: default;
                padding: 2px 4px;
                border-radius: 6px;
            }
            .cun-breadcrumb-isPath:hover {
                cursor: pointer;
                background-color: var(--cun-bgcolor-2);
            }
            .cun-breadcrumb-parting {
                display: inline-flex;
                align-items: center;
                svg {
                    margin: 0px 5px;
                    height: 1em;
                    color: var(--cun-text-color-5);
                    opacity: 0.3;
                }
            }
        }
    }
</style>