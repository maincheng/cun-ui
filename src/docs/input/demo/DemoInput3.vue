<script setup lang="ts">
    const value = ref('');
</script>

<template>
    <cun-flex style="width: 300px;" :gap="20" x="start" direction="y">
        <cun-input v-model="value" size="small" clearable show-count :max-length="30" />
        <cun-input v-model="value" clearable show-count :max-length="30" />
        <cun-input v-model="value" size="large" clearable show-count :max-length="30" />
    </cun-flex>
</template>