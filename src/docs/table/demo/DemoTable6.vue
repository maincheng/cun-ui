<script lang="ts" setup>
    const data: any = [
        {
            id: 1,
            name: '小卢',
            age: '24',
            sex: '男',
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
            hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野']
        },
        {
            id: 2,
            name: '小娟',
            age: '25',
            sex: '女',
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
            hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野']
        },
        {
            id: 3,
            name: '小贝',
            age: '22',
            sex: '男',
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。',
            hobby: ['唱', '跳', 'rap', '游泳', '爬山', '看电影', '越野']
        }
    ];

    const columns = [
        {
            title: 'id',
            width: 50,
            field: 'id',
            x: 'center'
        },
        {
            title: '姓名',
            width: 100,
            field: 'name',
            x: 'center'
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
            width: 450,
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
    const set = (row: any, column: any) => {
        console.log(row, column);
    };
    const del = (row: any, column: any) => {
        console.log(row, column);
    };
    const tableRef = ref();

    const getSelectedKeys = () => {
        const keys = tableRef.value.getSelectedKeys();
        if (keys.length > 0) {
            CunMessage.info(`已选择：${keys}`);
        } else {
            CunMessage.info('未选择');
        }
    };
    const setSelectedKeys = () => {
        tableRef.value.setSelectedKeys([2, 3]);
    };
</script>

<template>
    <cun-flex style="width: 100%" direction="y" x="start">
        <cun-button style="margin-bottom: 10px" @click="setSelectedKeys"> 设置已选项 </cun-button>
        <cun-button style="margin-bottom: 10px" @click="getSelectedKeys"> 获取选择 </cun-button>
        <cun-table ref="tableRef" :data-source="data" :columns="columns" checkable row-key="id">
            <template #hobby="{ row }">
                <cun-flex gap="5" x="start">
                    <cun-tag
                        v-for="(item, index) in row.hobby"
                        :key="index"
                        type="light"
                        color="blue"
                        >{{ item }}
                    </cun-tag>
                </cun-flex>
            </template>
            <template #action="{ row, column }">
                <cun-flex>
                    <cun-button size="small" text="管理" type="text" @click="set(row, column)" />
                    <cun-button size="small" text="删除" type="text" @click="del(row, column)" />
                </cun-flex>
            </template>
        </cun-table>
    </cun-flex>
</template>
