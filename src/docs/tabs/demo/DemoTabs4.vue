<script setup lang="ts">
    const value = ref(1);
    type Options = {
        label: string;
        value: string;
        activeIndex: number;
    };
    const change = (e: Options) => {
        console.log(e);
        CunMessage.info(e.label);
    };
</script>

<template>
    <cun-flex direction="y" x="start" y="start">
        <cun-tabs
            v-model="value"
            style="width: 100%"
            type="line"
            :options="[
                {
                    label: '北京市',
                    value: 0
                },
                {
                    label: '广州市',
                    value: 1
                },
                {
                    label: '上海市',
                    value: 2
                }
            ]"
            @change="change"
        />
    </cun-flex>
</template>
