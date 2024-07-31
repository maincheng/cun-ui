<script setup lang="ts">
    const options = ref([
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

    const change = (e: any) => {
        CunMessage.info(e.label);
    };
</script>
<template>
    <cun-flex gap="50" x="start">
        <cun-dropdown :options="options" @change="change">
            <cun-tag color="green">hover</cun-tag>
        </cun-dropdown>

        <cun-dropdown placement="bottom-start" :options="options" @change="change">
            <div>纯文本</div>
        </cun-dropdown>
    </cun-flex>
</template>
