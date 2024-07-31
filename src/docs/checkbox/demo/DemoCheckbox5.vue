<script setup lang="ts">
    const checked = ref(false);
</script>

<template>
    <cun-flex x="start" gap="15" direction="y">
        <cun-checkbox v-model="checked" size="small" label="同意" />
        <cun-checkbox v-model="checked" disabled round label="是否付款" />
        <cun-checkbox v-model="checked" size="large" round label="是否少数民族" />
        <cun-checkbox v-model="checked" readonly size="large" round label="是否少数民族" />
    </cun-flex>
</template>
