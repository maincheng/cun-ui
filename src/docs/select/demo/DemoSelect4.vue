<script setup lang="ts">
    import { schools } from './schools';
    import _ from 'lodash';

    const schoolsOptions = schools.map((e, i) => {
        return { label: e, value: _.padStart(String(i), 8, '0') };
    });

    const value = ref('');
</script>

<template>
    <cun-select
        v-model="value"
        style="width: 320px"
        :item-height="48"
        :options="schoolsOptions"
        placeholder="支持插槽"
    >
        <template #item="{ props }">
            <div class="custom-select-box" :class="{ 'custom-select-checked': props.checked }">
                <div class="custom-select-content">
                    <cun-avatar
                        round
                        width="30"
                        height="30"
                        :src="`https://q1.qlogo.cn/g?b=qq&s=100&nk=2111013571`"
                    />
                    <div class="info">
                        <div class="label">{{ props.label }}</div>
                        <div class="desc">
                            {{ props.value }}
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </cun-select>
</template>

<style lang="scss">
    .custom-select-box {
        width: 100%;
        height: 48px;
        user-select: none;
        padding: 2px 0px;
        box-sizing: border-box;
        cursor: pointer;
        overflow: hidden;
        .custom-select-content {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 0px 8px;
            height: 100%;
            border-radius: var(--cun-border-radius-small);
            box-sizing: border-box;
            .info {
                display: flex;
                flex-direction: column;
                justify-content: center;
                .label {
                    color: var(--cun-text-color-1);
                    font-size: 14px;
                }
                .desc {
                    color: var(--cun-text-color-8);
                    font-size: 12px;
                }
            }
        }
    }
    .custom-select-box:hover {
        .custom-select-content {
            background: var(--cun-color-primary-light);
        }
    }
    .custom-select-checked {
        .custom-select-content {
            background: var(--cun-color-primary-light);
        }
    }
</style>
