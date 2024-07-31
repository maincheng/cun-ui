<script setup lang="ts">
    import { schools } from './schools';

    const schoolsOptions = schools.map((e) => {
        return { label: e, value: e };
    });
    const options = ref(schoolsOptions);

    const value = ref('');
</script>

<template>
    <cun-flex style="width: 320px" direction="y">
        <cun-select v-model="value" :options="options" placeholder="可清空的" clearable />
        <cun-select v-model="value" :options="options" placeholder="只读" readonly />
        <cun-select v-model="value" :options="options" placeholder="禁用" disabled />
    </cun-flex>
</template>
