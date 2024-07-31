<script setup lang="ts">
    const value = ref('');
    const ok = () => {
        CunMessage.success('提交成功');
    };
</script>

<template>
    <cun-flex style="width: 300px" gap="20px" x="start" direction="y">
        <cun-textarea
            v-model="value"
            placeholder="可清空的"
            :max-length="300"
            show-count
            clearable
        />
        <cun-textarea
            v-model="value"
            placeholder="只读"
            :max-length="300"
            show-count
            readonly
            clearable
        />
        <cun-textarea
            v-model="value"
            placeholder="禁用"
            :max-length="300"
            show-count
            disabled
            clearable
        />
        <cun-textarea
            v-model="value"
            placeholder="按enter触发"
            :max-length="300"
            show-count
            clearable
            ok-by-enter
            @ok="ok"
        />
    </cun-flex>
</template>
