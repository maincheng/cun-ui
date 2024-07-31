<script setup lang="ts">
    const value = ref('');
</script>

<template>
    <cun-flex style="width: 300px;" :gap="20" x="start" direction="y">
        <cun-input v-model="value" size="small" placeholder="小" />
        <cun-input v-model="value" size="medium" placeholder="中" />
        <cun-input v-model="value" size="large" placeholder="大" />
    </cun-flex>
</template>