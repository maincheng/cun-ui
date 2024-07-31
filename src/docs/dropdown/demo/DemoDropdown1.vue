<script setup lang="ts">
    import type { DropdownOptions } from 'cun-ui';

    type Options = typeof DropdownOptions;

    const options: Options = ref([
        {
            label: '西游记',
            value: '1'
        },
        {
            label: '水浒传',
            value: '2'
        },
        {
            label: '三国演义',
            value: '3'
        },
        {
            label: '红楼梦',
            value: '4'
        }
    ]);

    const change = (e: Options) => {
        CunMessage.info(e.label);
    };
</script>
<template>
    <cun-flex gap="30" x="start">
        <cun-dropdown :options="options" @change="change">
            <cun-button text="hover" />
        </cun-dropdown>
        <cun-dropdown :options="options" trigger="click" @change="change">
            <cun-button text="click" />
        </cun-dropdown>
    </cun-flex>
</template>