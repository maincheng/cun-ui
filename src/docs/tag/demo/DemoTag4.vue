<script setup lang="ts">
    const close = () => {
        CunMessage.success('你点击了关闭');
    };
</script>
<template>
    <cun-flex x="start" wrap>
        <cun-tag closable @close="close"> closable </cun-tag>
        <cun-tag closable disabled> disabled </cun-tag>
    </cun-flex>
</template>
