<script lang="ts" setup>
    const data: any = [
        {
            id: 1,
            name: '小明',
            age: '14',
            sex: 1,
            intro: '从小独立呼吸。',
            hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野']
        },
        {
            id: 2,
            name: '小卢',
            age: '24',
            sex: 1,
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
            hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野']
        },
        {
            id: 3,
            name: '小娟',
            age: '25',
            sex: 0,
            intro: '不会随便捡地上的东西吃。',
            hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野']
        },
        {
            id: 4,
            name: '小贝',
            age: '22',
            sex: 0,
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
            hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野']
        },
        {
            id: 5,
            name: '小飞',
            age: '13',
            sex: 3,
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
            hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野']
        }
    ];

    const columns = [
        {
            title: 'id',
            width: 50,
            field: 'id',
            x: 'center',
            fixed: 'left'
        },
        {
            title: '姓名',
            width: 100,
            field: 'name',
            x: 'center',
            fixed: 'left'
        },
        {
            title: '年龄',
            width: 120,
            field: 'age',
            x: 'center'
        },
        {
            title: '性别',
            width: 120,
            field: 'sex',
            x: 'center'
        },
        {
            title: '爱好',
            width: 400,
            field: 'hobby'
        },
        {
            title: '介绍',
            width: 240,
            field: 'intro'
        },
        {
            title: '操作',
            width: 120,
            field: 'action',
            fixed: 'right',
            x: 'center'
        }
    ];

    const formatSex = (sex: number) => {
        switch (true) {
            case sex === 0:
                return '女';
            case sex === 1:
                return '男';
            default:
                return '未知';
        }
    };

    const v = ref('');

    const submit = () => {
        CunMessage.error(v.value || '密码不可为空');
        v.value = '';
    };
    const success = (e: any) => {
        e.hide();
        CunMessage.success('删除成功');
    };
    const error = (e: any) => {
        e.hide();
        CunMessage.error('取消');
    };
</script>

<template>
    <cun-table :data-source="data" :columns="columns">
        <template #sex="{ row }"> {{ formatSex(row.sex) }} </template>
        <template #hobby="{ row }">
            <cun-flex gap="5" x="start">
                <cun-tag
                    v-for="(item, index) in row.hobby"
                    :key="index"
                    type="light"
                    color="blue"
                    size="small"
                    >{{ item }}</cun-tag
                >
            </cun-flex>
        </template>
        <template #intro="{ row }">
            <cun-text-trim style="width: 100%" :text="row.intro"> </cun-text-trim>
        </template>
        <template #action>
            <cun-flex gap="5">
                <cun-popover trigger="click" placement="top">
                    <template #trigger>
                        <cun-button size="small" text="录入" type="text" />
                    </template>
                    <template #popover-body="{ hide }">
                        <cun-flex direction="y" gap="20" class="popover-body">
                            <cun-input v-model="v" />
                            <cun-flex x="end" gap="5">
                                <cun-button text="取消" type="text" size="small" @click="hide()" />
                                <cun-button text="提交" size="small" @click="hide(), submit()" />
                            </cun-flex>
                        </cun-flex>
                    </template>
                </cun-popover>
                <cun-popok
                    title="删除确认"
                    content="删除之后无法恢复，请确认！"
                    placement="top"
                    width="200px"
                    @ok="success"
                    @cancel="error"
                >
                    <cun-button size="small" text="删除" type="text" />
                </cun-popok>
            </cun-flex>
        </template>
    </cun-table>
</template>
<style lang="scss" scoped>
    .popover-body {
        padding: 15px;
        box-sizing: border-box;
    }
</style>
