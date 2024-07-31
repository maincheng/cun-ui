<script setup lang="ts">
    const value = ref('');
</script>

<template>
    <cun-flex style="width: 300px" gap="20px" x="start" direction="y">
        <cun-textarea v-model="value" placeholder="展示字数" show-count />
        <cun-textarea v-model="value" placeholder="限制字数" show-count :max-length="300" />
    </cun-flex>
</template>
