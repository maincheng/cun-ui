<script setup lang="ts">
    const value = ref(false);
    const mockFn = (v: boolean) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(v);
                resolve(true);
                CunMessage.success('发送成功');
            }, 1000);
        });
    };
    const change = (e: unknown) => {
        console.log(e);
        console.log(value.value);
    };
</script>

<template>
    <cun-switch v-model="value" :request="mockFn" @change="change" />
</template>
