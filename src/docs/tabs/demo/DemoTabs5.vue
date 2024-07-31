<script setup lang="ts">
    type Options = {
        label: string;
        value: string;
        activeIndex: number;
    };

    const options = ref([
        { label: 'Light', value: '1' },
        { label: 'Dark', value: '2' }
    ]);

    const options2 = ref([
        { label: 'red', value: '1' },
        { label: 'blue', value: '2' },
        { label: 'black', value: '3' },
        { label: 'white', value: '4' }
    ]);

    const value = ref('1');
    const value2 = ref('1');

    const change = (e: Options) => {
        console.log(e);
        CunMessage.info(e.label);
    };
</script>

<template>
    <cun-flex direction="y" x="start" y="start">
        <cun-tabs v-model="value" round :options="options" @change="change" />
        <cun-tabs
            v-model="value2"
            round
            width="300px"
            item-width="calc(300px / 4)"
            :options="options2"
            @change="change"
        />
    </cun-flex>
</template>
