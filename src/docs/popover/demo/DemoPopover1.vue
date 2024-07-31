<script setup lang="ts">
    const v = ref('');
    const cunPopoverRef1 = ref();
    const cunPopoverRef2 = ref();
    const submit = () => {
        if (v.value) {
            CunMessage.warning(v.value);
            cunPopoverRef1.value.hide();
        } else {
            CunMessage.warning('密码不可为空');
        }
    };

    const data: any = [
    {
            id: 1,
            name: '小明',
            age: '14',
            sex: 1,
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
            hobby: ['唱', '跳', 'rap', '篮球', '爬山', '看电影', '越野']
        },
        {
            id: 2,
            name: '小卢',
            age: '24',
            sex: 1,
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
            hobby: ['唱', '跳', 'rap', '篮球', '爬山', '看电影', '越野']
        },
        {
            id: 3,
            name: '小娟',
            age: '25',
            sex: 0,
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
            hobby: ['唱', '跳', 'rap', '篮球', '爬山', '看电影', '越野']
        },
        {
            id: 4,
            name: '小贝',
            age: '22',
            sex: 0,
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
            hobby: ['唱', '跳', 'rap', '篮球', '爬山', '看电影', '越野']
        },
        {
            id: 5,
            name: '小飞',
            age: '13',
            sex: 3,
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
            hobby: ['唱', '跳', 'rap', '篮球', '爬山', '看电影', '越野']
        }
    ];

    const columns = [
    {
            title: 'id',
            field: 'id',
            width: 60,
            x: 'center'
        },
        {
            title: '姓名',
            width: 120,
            field: 'name'
        },
        {
            title: '年龄',
            field: 'age',
            width: 80,
            x: 'center'
        },
        {
            title: '性别',
            field: 'sex',
            width: 80,
            x: 'center'
        },
        {
            title: '成绩',
            width: 80,
            field: 'fraction',
            x: 'center'
        },
        {
            title: '介绍',
            width: 180,
            field: 'intro'
        }
    ];
</script>
<template>
    <cun-flex gap="20" x="start">
        <cun-popover ref="cunPopoverRef1" trigger="click" placement="bottom-start">
            <template #trigger>
                <cun-button text="进入保险箱" />
            </template>
            <template #popover-body>
                <div class="popover-body" style="width: 240px;">
                    <cun-input v-model="v" placeholder="请输入密码" />
                    <cun-flex x="end" style="margin-top: 15px;">
                        <cun-button
                            text="取消"
                            type="text"
                            color="normal"
                            size="small"
                            @click="cunPopoverRef1.hide()"
                        />
                        <cun-button text="提交" size="small" @click="submit()" />
                    </cun-flex>
                </div>
            </template>
        </cun-popover>

        <cun-popover ref="cunPopoverRef2" trigger="click" placement="bottom-start">
            <template #trigger>
                <cun-button text="展示表格" />
            </template>
            <template #popover-body>
                <div class="popover-body" style="width: 800px">
                    <cun-table :data-source="data" :columns="columns">
                        <template #fraction="{ row }">
                            <cun-flex>
                                <cun-badge v-if="row.fraction >= 60" round color="green" />
                                <cun-badge v-else round color="red" />
                                <span>{{ row.fraction >= 60 ? '良好' : '很差' }}</span>
                            </cun-flex>
                        </template>
                    </cun-table>
                    <br />
                    <cun-flex x="end">
                        <cun-button
                            text="取消"
                            color="normal"
                            type="text"
                            size="small"
                            @click="cunPopoverRef2.hide()"
                        />

                        <cun-button text="提交" size="small" @click="cunPopoverRef2.hide()" />
                    </cun-flex>
                </div>
            </template>
        </cun-popover>
    </cun-flex>
</template>

<style lang="scss" scoped>
    .popover-body {
        padding: 10px;
        box-sizing: border-box;
    }
</style>