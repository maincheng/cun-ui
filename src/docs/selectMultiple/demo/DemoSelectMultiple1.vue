<script setup lang="ts">
    import { schools } from './schools';

    const schoolsOptions = schools.map((e, i) => {
        return { label: e, value: i + 1 };
    });

    const options = ref(schoolsOptions);

    const value = ref([]);
</script>

<template>
    <cun-flex style="width: 320px" direction="y">
        <cun-select-multiple
            v-model="value"
            size="small"
            :options="options"
            placeholder="小"
            clearable
        />
        <cun-select-multiple
            v-model="value"
            value-layout="tag"
            :options="options"
            placeholder="中"
            clearable
        />
        <cun-select-multiple
            v-model="value"
            size="large"
            :options="options"
            placeholder="大"
            clearable
        />
    </cun-flex>
</template>
