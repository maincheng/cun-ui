<script lang="ts" setup>
    import { CunInput, CunSelect, CunFlex, CunIcon } from 'cun-ui';
    import { paginationProps } from './props';

    const props = defineProps(paginationProps);
    const emit = defineEmits(['change', 'update:currentPage', 'update:pageSize']);

    const total: any = defineModel('total', { default: 0 });
    const currentPage: any = defineModel('currentPage', { default: 1 });
    const pageSize: any = defineModel('pageSize', { default: 10 });
    const pageSizeOptions: any = defineModel('pageSizeOptions', {
        default: [
            {
                label: '10 / 页',
                value: 10
            },
            {
                label: '20 / 页',
                value: 20
            },
            {
                label: '30 / 页',
                value: 30
            },
            {
                label: '50 / 页',
                value: 50
            },
            {
                label: '100 / 页',
                value: 100
            }
        ]
    });

    const state = reactive({
        toPage: undefined,
        pageSize: pageSize.value,
        visiblePagesCount: props.visiblePagesCount
    });

    onMounted(() => {
        // Ensure that the number of visible pages is at least 5 and at most 12.
        state.visiblePagesCount = Math.max(state.visiblePagesCount, 5);
        state.visiblePagesCount = Math.min(state.visiblePagesCount, 12);
    });

    const totalPages = computed(() => Math.ceil(total.value / state.pageSize));

    const visiblePages = computed(() => {
        const _currentPage = currentPage.value;
        const totalPages = Math.ceil(total.value / state.pageSize);

        let startPage = _currentPage - Math.floor(state.visiblePagesCount / 2);
        if (_currentPage < state.visiblePagesCount / 2 + 2) {
            startPage = 1;
        }

        if (startPage < 1) {
            startPage = 1;
        }
        let endPage = startPage + state.visiblePagesCount - 1;
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = endPage - state.visiblePagesCount + 1;
            if (startPage < 1) {
                startPage = 1;
            }
        }
        const visiblePages = [];
        for (let i = startPage; i <= endPage; i++) {
            visiblePages.push(i);
        }
        return visiblePages;
    });

    const changePage = (page: number) => {
        page = Math.floor(page);

        if (page < 1 || page > totalPages.value) {
            return;
        }

        currentPage.value = page;
        pageSize.value = state.pageSize;
        emit('change', {
            currentPage: currentPage.value,
            pageSize: state.pageSize
        });
    };

    // 是否显示省略号
    const startEllipsis = computed(() => visiblePages.value[0] > 2 + 1);
    const endEllipsis = computed(
        () => visiblePages.value[visiblePages.value.length - 1] < totalPages.value - 2
    );

    // 是否显示最大和最小页码
    const showOne = computed(() => visiblePages.value[0] > 1);
    const showMax = computed(
        () => visiblePages.value[visiblePages.value.length - 1] < totalPages.value
    );

    const checkPageSize = (value: any) => {
        state.pageSize = value;
        changePage(currentPage.value);
    };

    const checkPageNum = (value: any) => {
        const page = Number(value);
        state.toPage = undefined;
        if (page > totalPages.value || page < 1) {
            return;
        }
        currentPage.value = page;
        changePage(value);
    };
</script>

<template>
    <div class="cun-pagination">
        <cun-flex class="control" gap="10">
            <slot name="left" />

            <cun-flex class="cun-pagination-page-box" gap="5">
                <div class="btn" @click="changePage(currentPage - 1)">
                    <cun-icon size="14" type="chevron-left" />
                </div>
                <div v-if="showOne" class="btn cun-pagination-page-btn" @click="changePage(1)">
                    1
                </div>
                <div
                    v-if="startEllipsis"
                    class="btn control-btn"
                    @click="changePage(visiblePages[0] - 1)"
                >
                    <cun-icon size="14" type="more-horizontal" />
                </div>
                <div
                    v-else-if="currentPage > visiblePages.length / 2 + 2"
                    class="btn"
                    @click="changePage(2)"
                >
                    2
                </div>
                <div
                    v-for="(page, index) in visiblePages"
                    :key="index"
                    class="btn"
                    :class="{
                        active: Number(page) === Number(currentPage)
                    }"
                    @click="changePage(page)"
                >
                    {{ page }}
                </div>
                <div
                    v-if="endEllipsis"
                    class="btn control-btn"
                    @click="changePage(visiblePages[visiblePages.length - 1] + 1)"
                >
                    <cun-icon size="14" type="more-horizontal" />
                </div>
                <div
                    v-else-if="currentPage < totalPages - visiblePages.length / 2 - 1"
                    class="btn"
                    @click="changePage(2)"
                >
                    {{ totalPages - 1 }}
                </div>
                <div
                    v-if="showMax"
                    class="btn cun-pagination-page-btn"
                    @click="changePage(totalPages)"
                >
                    {{ totalPages }}
                </div>
                <div class="btn" @click="changePage(currentPage + 1)">
                    <cun-icon size="14" type="chevron-right" />
                </div>
            </cun-flex>
            <cun-select
                v-model="state.pageSize"
                style="width: 100px"
                align="center"
                size="small"
                :show-check-icon="false"
                :options="pageSizeOptions"
                @change="checkPageSize"
            />
            <cun-input
                v-model="state.toPage"
                size="small"
                align="center"
                placeholder="跳转至"
                auto-width
                @change="checkPageNum"
            />
            <slot name="right" />
        </cun-flex>
    </div>
</template>

<style lang="scss">
    .cun-pagination {
        display: inline-block;
        box-sizing: border-box;
        height: 40px;
        border-radius: var(--cun-border-radius-small);
        user-select: none;
        font-size: 14px;

        .control {
            height: 100%;
        }

        .btn {
            position: relative;
            z-index: 2;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 26px;
            line-height: 1;
            min-width: 26px;
            padding: 0px 4px;
            box-sizing: border-box;
            border-radius: var(--cun-border-radius-small);
            text-align: center;
            cursor: pointer;
        }

        .btn:hover {
            background-color: var(--cun-color-primary-light);
            color: var(--cun-color-primary-dark);
        }

        .cun-pagination-page-box {
            width: auto;
            position: relative;
            height: 100%;
            color: var(--cun-text-color-1);

            .active {
                background-color: var(--cun-color-primary);
                color: var(--cun-color-white-text);
            }

            .active:hover {
                background-color: var(--cun-color-primary);
                color: var(--cun-color-white-text);
            }

            .control-btn {
                padding: 0px;
            }
        }

        .page-label {
            white-space: nowrap;
            padding: 0px 5px;
        }
    }
</style>
