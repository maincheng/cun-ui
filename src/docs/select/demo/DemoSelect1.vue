<script setup lang="ts">
    import { schools } from './schools';

    const schoolsOptions = schools.map((e, i) => {
        return { label: e, value: i + 1 };
    });

    const options = ref(schoolsOptions);

    const value = ref('');
</script>

<template>
    <cun-flex style="width: 320px" direction="y">
        <cun-select v-model="value" clearable size="small" placeholder="小" :options="options" />
        <cun-select v-model="value" clearable size="medium" placeholder="中" :options="options" />
        <cun-select v-model="value" clearable size="large" placeholder="大" :options="options" />
    </cun-flex>
</template>
