<script lang="ts" setup>
    const data: any = [
        {
            id: 1,
            name: '小明',
            age: '14',
            sex: 1,
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
            hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野'],
            // 定义这一单元格的样式
            tdStyle: {
                age: 'background:var(--cun-color-primary-light);color:var(--cun-color-primary-dark)'
            }
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
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
            hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野'],
            // 定义这一单元格的样式
            tdStyle: {
                sex: 'color:var(--cun-color-warning-dark);',
                intro: 'background:var(--cun-color-warning);color:#fff'
            }
        },
        {
            id: 4,
            name: '小贝',
            age: '22',
            sex: 0,
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
            hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野'],
            tdStyle: {
                sex: 'background:var(--cun-color-error);color:#fff'
            }
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
            width: 300,
            field: 'hobby'
        },
        {
            title: '介绍',
            width: 300,
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
                    >{{ item }}
                </cun-tag>
            </cun-flex>
        </template>
        <template #intro="{ row }"> {{ row.intro }} </template>
        <template #action>
            <cun-flex gap="5">
                <cun-button size="small" text="管理" type="text" />
                <cun-button size="small" text="删除" type="text" />
            </cun-flex>
        </template>
    </cun-table>
</template>
