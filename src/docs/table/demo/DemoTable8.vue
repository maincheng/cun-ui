<script lang="ts" setup>
    import mvJson from './movie_hot_gaia.json';

    const data: any = ref(mvJson);
    const tableRef = ref();
    const columns = [
        {
            type: 'text',
            title: 'id',
            field: 'id',
            width: 100,
            fixed: 'left',
            x: 'center'
        },
        {
            type: 'text',
            title: '名称',
            field: 'title',
            width: 180
        },

        {
            type: 'text',
            title: '上线日期',
            field: 'release_date',
            width: 100,
            x: 'center'
        },
        {
            type: 'template',
            title: '在线观看',
            field: 'has_linewatch',
            width: 100,

            x: 'center'
        },
        {
            type: 'html',
            title: '导演',
            field: 'directors',
            width: 140
        },
        {
            type: 'text',
            title: '简介',
            field: 'info',
            width: 120
        },
        {
            type: 'template',
            title: '类型',
            field: 'type',
            width: 100,
            x: 'center'
        },
        {
            type: 'template',
            title: '主演',
            align: 'start',
            field: 'actors',
            width: 450
        },

        {
            type: 'template',
            title: '执行',
            field: 'action',
            width: 150,
            align: 'center',
            fixed: 'right',
            x: 'center'
        }
    ];

    const get = (e: any) => {
        if (e.column.field === 'action') {
            CunMessage.info(`点击了 id=>${e.row.id}`);
        }
    };

    const getSelectedKeys = () => {
        const keys = tableRef.value.getSelectedKeys();
        if (keys.length > 0) {
            CunMessage.info(`已选择：${keys}`);
        } else {
            CunMessage.info('未选择');
        }
    };
</script>

<template>
    <cun-button style="margin-bottom: 10px" @click="getSelectedKeys">获取选择</cun-button>
    <cun-table
        ref="tableRef"
        checkable
        single-select
        :data-source="data"
        :columns="columns"
        :max-height="400"
        row-key="id"
    >
        <template #release_date="{ row }"> {{ row.release_date }} </template>
        <template #directors="{ row }">
            <cun-tag
                v-for="(item, index) in row.directors"
                :key="index"
                round
                size="small"
                type="light"
                color="gray"
            >
                {{ item }}</cun-tag
            >
        </template>
        <template #info="{ row }">
            <cun-text-trim style="width: 100%" :text="row.info"></cun-text-trim>
        </template>

        <template #action="{ row, column }">
            <cun-button size="small" text="管理" type="text" @click.stop="get({ row, column })" />
            <cun-popok
                title="删除确认"
                content="删除之后无法恢复，请确认！"
                placement="left"
                width="200px"
                @click.stop
            >
                <cun-button size="small" text="删除" type="text" />
            </cun-popok>
        </template>
        <template #type="{ row }">
            <cun-tag color="green" type="light" round size="small"
                >{{ row.type === 'movie' ? '电影' : '电视剧' }}
            </cun-tag>
        </template>
        <template #has_linewatch="{ row }">
            <span>{{ row.has_linewatch ? '是' : '否' }}</span>
        </template>
        <template #actors="{ row }">
            <cun-flex
                v-tooltip="{
                    content: row.actors.join(' <br /> '),
                    placement: 'left',
                    trigger: 'mouseenter',
                    allowHtml: true
                }"
                x="start"
                gap="5"
            >
                <cun-tag
                    v-for="(actor, index) in row.actors"
                    :key="index"
                    type="light"
                    color="blue"
                    size="small"
                    >{{ actor }}
                </cun-tag>
            </cun-flex>
        </template>
    </cun-table>
</template>

<style lang="scss" scoped>
    .title,
    .info {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
