<script setup lang="ts">
    type Options = {
        label: string;
        value: string;
        activeIndex: number;
    };
    const provinces = [
        '北京市',
        '上海市',
        '天津市',
        '重庆市',
        '河北省',
        '山西省',
        '辽宁省',
        '吉林省',
        '黑龙江省',
        '江苏省',
        '浙江省',
        '安徽省',
        '福建省',
        '江西省',
        '山东省',
        '河南省',
        '湖北省',
        '湖南省',
        '广东省',
        '海南省',
        '四川省',
        '贵州省',
        '云南省',
        '陕西省',
        '甘肃省',
        '青海省',
        '台湾省',
        '内蒙古自治区',
        '广西壮族自治区',
        '西藏自治区',
        '宁夏回族自治区',
        '新疆维吾尔自治区',
        '香港特别行政区',
        '澳门特别行政区'
    ];

    const options = ref(
        provinces.map((e, i) => {
            return {
                label: e,
                value: i
            };
        })
    );

    const value = ref(1);

    const change = (e: Options) => {
        CunMessage.info(e.label);
    };
</script>

<template>
    <cun-flex direction="y" x="start">
        <cun-title :size="14">限制整体宽度</cun-title>
        <cun-tabs v-model="value" style="width: 300px" :options="options" @change="change" />
    </cun-flex>
</template>
