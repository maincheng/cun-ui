<script setup lang="ts">
    import { schools } from './schools';

    const schoolsOptions = schools.map((e) => {
        return { label: e, value: e };
    });
    const options = ref(schoolsOptions);

    const disabled = ref(true);
    const value = ref([]);
</script>

<template>
    <cun-flex style="width: 320px" direction="y">
        <cun-select-multiple v-model="value" :options="options" clearable placeholder="支持清空" />
        <cun-select-multiple v-model="value" :options="options" placeholder="只读" readonly />
        <cun-select-multiple
            v-model="value"
            :options="options"
            :disabled="disabled"
            placeholder="禁用"
        />
    </cun-flex>
</template>
