<script lang="ts" setup>
    const data: any = ref([
        {
            id: 2,
            name: '小卢',
            avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=2111013571',
            age: '24',
            fraction: 82,
            mail: 'div@kamtao.com',
            sex: '男',
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。'
        },
        {
            id: 3,
            name: '小娟',
            avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=2111013571',
            age: '25',
            fraction: 91,
            mail: 'div@kamtao.com',
            sex: '女',
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。'
        },
        {
            id: 4,
            name: '小贝',
            avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=2111013571',
            age: '22',
            mail: 'div@kamtao.com',
            fraction: 31,
            sex: '女',
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。'
        },
        {
            id: 4,
            name: '小贝',
            avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=2111013571',
            age: '22',
            mail: 'div@kamtao.com',
            fraction: 31,
            sex: '女',
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。'
        },
        {
            id: 4,
            name: '小贝',
            avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=2111013571',
            age: '22',
            mail: 'div@kamtao.com',
            fraction: 31,
            sex: '女',
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。'
        },
        {
            id: 4,
            name: '小贝',
            avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=2111013571',
            age: '22',
            mail: 'div@kamtao.com',
            fraction: 31,
            sex: '女',
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。'
        },
        {
            id: 4,
            name: '小贝',
            avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=2111013571',
            age: '22',
            mail: 'div@kamtao.com',
            fraction: 31,
            sex: '女',
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。'
        },
        {
            id: 4,
            name: '小贝',
            avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=2111013571',
            age: '22',
            mail: 'div@kamtao.com',
            fraction: 31,
            sex: '女',
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。'
        },
        {
            id: 4,
            name: '小贝',
            avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=2111013571',
            age: '22',
            mail: 'div@kamtao.com',
            fraction: 31,
            sex: '女',
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。'
        },
        {
            id: 4,
            name: '小贝',
            avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=2111013571',
            age: '22',
            mail: 'div@kamtao.com',
            fraction: 31,
            sex: '女',
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。'
        },
        {
            id: 4,
            name: '小贝',
            avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=2111013571',
            age: '22',
            mail: 'div@kamtao.com',
            fraction: 31,
            sex: '女',
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。'
        },
        {
            id: 4,
            name: '小贝',
            avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=2111013571',
            age: '22',
            mail: 'div@kamtao.com',
            fraction: 31,
            sex: '女',
            intro: '从小独立呼吸，讲卫生懂礼貌，不会随便捡地上的东西吃。'
        }
    ]);

    const columns = [
        {
            title: 'id',
            field: 'id',
            width: 60,
            x: 'center'
        },
        {
            title: '信息',
            width: 150,
            field: 'info'
        },
        {
            title: '年龄',
            field: 'age',
            width: 120,
            x: 'center'
        },
        {
            title: '性别',
            field: 'sex',
            width: 120,
            x: 'center'
        },
        {
            title: '成绩',
            width: 120,
            field: 'fraction',
            x: 'center'
        },
        {
            title: '介绍',
            width: 480,
            field: 'intro'
        }
    ];
</script>

<template>
    <div style="height: 300px">
        <cun-table :data-source="data" :columns="columns">
            <template #info="{ row }">
                <cun-flex class="info">
                    <cun-avatar :src="row.avatar" round />
                    <cun-flex class="right" direction="y" x="start" gap="0px">
                        <div class="name">{{ row.name }}</div>
                        <div class="mail">{{ row.mail }}</div>
                    </cun-flex>
                </cun-flex>
            </template>
            <template #fraction="{ row }">
                <cun-flex>
                    <cun-badge v-if="row.fraction >= 60" round color="green" />
                    <cun-badge v-else round color="red" />
                    <span>{{ row.fraction >= 60 ? '良好' : '很差' }}</span>
                </cun-flex>
            </template>
        </cun-table>
    </div>
</template>

<style lang="scss" scoped>
    .info {
        line-height: 22px;

        .cun-avatar {
            flex-shrink: 0;
            width: 35px;
            height: 35px;
        }

        .right {
            flex-shrink: 0;
            width: calc(100% - 50px);
        }

        .name {
            font-weight: bold;
        }

        .mail {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 12px;
            white-space: nowrap;
            color: var(--cun-text-color-9);
        }
    }
</style>
