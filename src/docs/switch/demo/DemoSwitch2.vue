<script setup lang="ts">
    const value = ref(false);

    const change = (e: unknown) => {
        console.log(e);
        console.log(value.value);
    };
</script>

<template>
    <cun-switch v-model="value" :round="false" @change="change"></cun-switch>
</template>
