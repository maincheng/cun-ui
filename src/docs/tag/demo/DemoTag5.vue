<script setup lang="ts">
    const close = () => {
        CunMessage.success('你点击了关闭');
    };
</script>
<template>
    <cun-flex x="start" wrap>
        <cun-tag type="light" color="blue" closable @close="close">
            <template #left> 🦄 </template>
            <template #right> 🎉 </template>
            primary
        </cun-tag>
        <cun-tag type="light" color="success" size="large" round>
            <template #left>🦄 </template>
            primary
        </cun-tag>
        <cun-tag type="light" color="red" size="large" round>
            <template #right> 🎉 </template>
            primary
        </cun-tag>
    </cun-flex>
</template>
