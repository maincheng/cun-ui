<script setup lang="ts">
    const value1 = ref('');
    const value2 = ref('这是一个只读文本');
    const value3 = ref('聚集后选中所有文本');
</script>

<template>
    <cun-flex style="width:300px" :gap="20" x="start" direction="y">
        <cun-input v-model="value1" placeholder="可清空的" clearable />
        <cun-input v-model="value1" placeholder="禁用" disabled />
        <cun-input v-model="value2" placeholder="只读" readonly />
        <cun-input v-model="value2" placeholder="只读并可复制" readonly size="small" copyable />
        <cun-input v-model="value2" placeholder="只读并可复制" readonly copyable />
        <cun-input v-model="value2" placeholder="只读并可复制" readonly size="large" copyable />
        <cun-input v-model="value1" placeholder="自动" auto-width />
        <cun-input v-model="value3" placeholder="聚集后选中所有文本" focus-select />
        <cun-input
            v-model="value1"
            type="password"
            placeholder="密码可见"
            show-password
            :max-length="30"
        />
    </cun-flex>
</template>