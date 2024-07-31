<script setup lang="ts">
    const options = ref([
        {
            label: '修改头像',
            value: '1'
        },
        {
            label: '个人中心',
            value: '2'
        },
        {
            label: '开通会员',
            value: '3'
        },
        {
            label: '退出登陆',
            value: '4'
        }
    ]);

    const change = (e: any) => {
        CunMessage.info(e.label);
    };
</script>
<template>
    <cun-flex gap="30" x="start">
        <cun-dropdown :options="options" placement="bottom-start" @change="change">
            <cun-avatar src="https://q1.qlogo.cn/g?b=qq&s=100&nk=2111013571" />
        </cun-dropdown>

        <cun-dropdown :options="options" placement="top-start" @change="change">
            <cun-avatar src="https://q1.qlogo.cn/g?b=qq&s=100&nk=2111013571" />
        </cun-dropdown>

        <cun-dropdown :options="options" placement="left-start" @change="change">
            <cun-avatar src="https://q1.qlogo.cn/g?b=qq&s=100&nk=2111013571" />
        </cun-dropdown>

        <cun-dropdown :options="options" placement="right-start" @change="change">
            <cun-avatar src="https://q1.qlogo.cn/g?b=qq&s=100&nk=2111013571" />
        </cun-dropdown>
    </cun-flex>
</template>
