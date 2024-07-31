<script setup lang="ts">
    import { useDebounceFn } from '@vueuse/core';
    import { CunPopover, CunIcon, CunToolTip } from 'cun-ui';
    import { objectClass, numFormat } from 'cun-ui/utils';
    import { UseVirtualList } from '@vueuse/components';
    import { selectMultipleProps, SelectMultipleOptions } from './props';

    // 获取app
    const app = getCurrentInstance()?.appContext.app;
    if (app && !app.directive('tooltip')) {
        app.use(CunToolTip);
    }
    const props = defineProps(selectMultipleProps);
    const emit = defineEmits(['change', 'select', 'clear', 'delete', 'blur']);
    const selectValue: any = defineModel<any[]>();

    const cunSelectRef = ref();
    const cunPopverRef = ref();
    const searchInputRef = ref();

    const state = reactive({
        selectWidth: 0,
        visible: false,
        loading: false,
        options: props.options,
        keyword: ''
    });

    const getSelectWidth = () => {
        state.selectWidth = cunSelectRef.value?.clientWidth - 12;
        if (props.searchable) {
            setTimeout(() => {
                searchInputRef.value && searchInputRef.value.focus();
            }, 200);
        }
    };

    const show = () => {
        cunPopverRef.value.show();
    };

    const hide = () => {
        cunPopverRef.value.hide();
    };

    const searchDebounce = useDebounceFn(async (e: any) => {
        search(e);
    }, props.searchDelay);

    const search = async (e?: any) => {
        // loading
        state.loading = true;
        const keyword = e?.target.value;
        if (props.searchable) {
            let result: any = [];
            // 如果没输入关键词
            if (!keyword && props.options.length > 0) {
                result = props.options;
            } else {
                result = await props.searchMethod({
                    options: props.options,
                    keyword
                });
            }
            state.options = result;
        }
        state.loading = false;
    };

    const clearHandle = () => {
        selectValue.value = [];
        emit('clear');
        // 刷新位置
        nextTick(() => {
            cunPopverRef.value.refresh();
            emit('change', selectValue.value);
        });
    };

    const deleteTag = (index: number) => {
        const item = selectValue.value[index];
        selectValue.value && selectValue.value.splice(index, 1);
        emit('delete', item);
        // 刷新位置
        nextTick(() => {
            cunPopverRef.value.refresh();
            emit('change', selectValue.value);
        });
    };

    const selectHandle = (item: SelectMultipleOptions) => {
        if (item.disabled) {
            return;
        }

        const _value = selectValue.value || [];

        const index = _value.findIndex((e: string | number) => e === item.value);

        if (index >= 0) {
            _value.splice(index, 1);
        } else {
            _value.push(item.value);
        }

        selectValue.value = _value;
        emit('select', item);
        // 刷新位置
        nextTick(() => {
            cunPopverRef.value.refresh();
            emit('change', selectValue.value);
        });
    };

    const getChecked = computed(() => (value: string | number) => {
        if (selectValue.value) {
            return JSON.parse(JSON.stringify(selectValue.value.includes(value)));
        }
        return false;
    });

    const getLabels = computed(() => {
        if (state.options.length > 0) {
            const labels =
                selectValue.value &&
                selectValue.value.map((v: number | string) => {
                    return state.options.find((e: SelectMultipleOptions) => v === e.value)?.label;
                });
            return labels || [];
        }
        return props?.defaultValue || selectValue.value || [];
    });

    const getSelectClassName = computed(() => {
        let { clearable, size, align } = props;
        clearable = clearable ? !!selectValue.value : false;
        return objectClass('cun-select', { clearable, size, align });
    });

    const getBodyClassName = computed(() => {
        const { size, disabled } = props;
        return objectClass('cun-select-body', { size, disabled });
    });

    const getSelectViewClassName = computed(() => {
        const { disabled, readonly } = props;
        const focus = state.visible;
        return objectClass('cun-select-view', { focus, disabled, readonly });
    });

    const getSelectItemClassName = (e: any) => {
        const { disabled } = e;
        const active = getChecked.value(e.value);
        const { align } = props;

        return objectClass('cun-select-item', {
            disabled,
            align,
            active
        });
    };

    const getIconSize = computed(() => {
        const size: any = {
            small: 14,
            medium: 15,
            large: 16
        };
        return size[props.size];
    });

    const showHandle = () => {
        state.visible = true;
        getSelectWidth();
        if (state.options && state.options.length === 0 && props.searchable) {
            search({ target: { value: '' } });
        }
    };
    const getVirtualHeight = computed(() => {
        let height = state.options.length * props.itemHeight;
        height = height >= 240 ? 240 : height;
        return `${height}px`;
    });

    const hideHandle = () => {
        state.visible = false;
        emit('blur');
    };
    onMounted(() => {
        getSelectWidth();
    });

    defineExpose({ show, hide });
</script>

<template>
    <cun-popover
        ref="cunPopverRef"
        popover-body-class-name="cun-select-multiple-popover-body"
        class="cun-select-view"
        :class="getSelectViewClassName"
        :trigger="trigger"
        :disabled="disabled"
        placement="bottom-start"
        style="width: 100%"
        :offset="[-1, 10]"
        :loading="state.loading"
        @show="showHandle"
        @hide="hideHandle"
    >
        <template #trigger>
            <div ref="cunSelectRef" class="cun-select" :class="getSelectClassName">
                <cun-icon
                    v-if="!readonly"
                    :size="getIconSize"
                    type="chevron-down"
                    class="icon-select"
                    :class="{
                        'icon-select-hide': clearable && getLabels && getLabels.length > 0
                    }"
                />
                <transition name="cun-form-icon-ani">
                    <cun-icon
                        v-if="clearable && getLabels && getLabels.length > 0 && !readonly"
                        :size="getIconSize"
                        type="x"
                        class="cun-form-icon-clear"
                        :class="{
                            'cun-form-icon-clear-focus': state.visible
                        }"
                        @click.stop="clearHandle"
                    />
                </transition>
                <template v-if="getLabels && getLabels.length > 0">
                    <cun-flex
                        v-if="valueLayout === 'tag'"
                        style="padding: 3px"
                        x="start"
                        y="center"
                        :gap="3"
                        wrap
                        class="value"
                    >
                        <TransitionGroup name="list">
                            <cun-tag
                                v-for="(item, index) in getLabels"
                                :key="index"
                                type="light"
                                :size="size"
                                closable
                                @close="deleteTag(index)"
                            >
                                {{ item }}
                            </cun-tag>
                        </TransitionGroup>
                    </cun-flex>
                    <template v-else>
                        <cun-popover
                            ref="cunPopverValueRef"
                            trigger="hover"
                            popover-body-class-name="cun-select-multiple-popover-tag"
                            placement="top-start"
                            style="width: 100%"
                        >
                            <template #trigger>
                                <div class="cun-select-multiple-text-value">
                                    {{ getLabels.join('，') }}
                                </div>
                            </template>
                            <template #popover-body>
                                <cun-flex
                                    x="start"
                                    y="center"
                                    :gap="3"
                                    wrap
                                    :style="`max-width:${state.selectWidth + 12}px`"
                                    class="cun-select-multiple-tag-value"
                                >
                                    <cun-tag
                                        v-for="(item, index) in getLabels"
                                        :key="index"
                                        type="light"
                                        :size="size"
                                        closable
                                        @close="deleteTag(index)"
                                    >
                                        {{ item }}
                                    </cun-tag>
                                </cun-flex>
                            </template>
                        </cun-popover>
                    </template>
                </template>
                <div v-show="getLabels && getLabels.length === 0" class="placeholder">
                    {{ placeholder }}
                </div>
            </div>
        </template>
        <template #popover-body>
            <div
                class="cun-select-body"
                :class="getBodyClassName"
                :style="`width:${state.selectWidth}px`"
            >
                <slot name="header"></slot>
                <div v-if="searchable" class="search-input">
                    <input
                        ref="searchInputRef"
                        v-model="state.keyword"
                        placeholder="输入搜索关键词"
                        @input="searchDebounce"
                    />
                </div>
                <div class="cun-select-options-box">
                    <template v-if="state.options && state.options.length === 0">
                        <slot v-if="$slots.empty" name="empty" />
                        <cun-flex v-else direction="y" class="not-found">
                            <cun-empty title="暂无结果" />
                        </cun-flex>
                    </template>
                    <div
                        v-if="searchable && state.options && state.options.length > 0"
                        class="reslut-count"
                    >
                        共
                        {{ numFormat(state.options && state.options.length) }}
                        条结果
                    </div>

                    <use-virtual-list
                        v-if="state.options.length > 0"
                        :key="getVirtualHeight"
                        class="cun-select-options-list cun-scrollbar"
                        :list="state.options"
                        :options="{
                            itemHeight
                        }"
                        :overscan="100"
                        :height="getVirtualHeight"
                    >
                        <template #default="{ data: templateProps }">
                            <!-- you can get current item of list here -->
                            <div
                                :style="{ height: itemHeight + 'px' }"
                                @click="selectHandle(templateProps)"
                            >
                                <slot
                                    v-if="$slots.item"
                                    name="item"
                                    :props="{
                                        ...templateProps,
                                        checked: getChecked(templateProps.value)
                                    }"
                                />
                                <div
                                    v-else
                                    class="cun-select-item cun-select-item-mul"
                                    :class="getSelectItemClassName(templateProps)"
                                >
                                    <cun-checkbox
                                        :key="templateProps.value"
                                        class="cun-select-checkbox"
                                        :checked="getChecked(templateProps.value)"
                                    />
                                    <div class="cun-select-label">
                                        {{ templateProps.label }}
                                    </div>
                                </div>
                            </div>
                        </template>
                    </use-virtual-list>
                </div>
                <slot name="footer"></slot>
            </div>
        </template>
    </cun-popover>
</template>

<style lang="scss" scoped>
    .cun-select-view {
        width: 100%;
        border-radius: var(--cun-border-radius-small);
        background-color: var(--cun-form-bgcolor);
        transition: all 0.15s ease;
        box-sizing: border-box;
        outline: 0px var(--cun-color-primary-light) solid;
        border: var(--cun-form-border-width) transparent solid;

        > div {
            width: 100%;
        }

        .cun-select {
            position: relative;
            width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
            user-select: none;
            box-sizing: border-box;
            overflow: hidden;

            .icon-select {
                position: absolute;
                top: 50%;
                right: 9px;
                transform: translateY(-50%) rotate(0deg);
                transition: var(--cun-form-transition);
                opacity: var(--cun-form-icon-opacity);
                padding: 2px;
            }

            .icon-select-hide {
                opacity: 0;
                transform: translate(100%, -50%);
            }

            .placeholder {
                color: rgb(165, 165, 165);
            }

            .cun-select-label-multiple {
                width: 100%;
                display: flex;
                align-items: center;

                .cun-popover {
                    display: flex;
                    align-items: center;

                    > div {
                        display: flex;
                        align-items: center;
                    }
                }
            }

            .placeholder,
            .value {
                width: calc(100% - 24px);
                transition: all 0.2s;
                height: 100%;
            }
            .cun-select-multiple-text-value {
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }

        .cun-select-align-left {
            text-align: left;
        }

        .cun-select-align-center {
            text-align: center;
        }

        .cun-select-align-right {
            text-align: right;
        }

        .cun-select-size-small {
            min-height: var(--cun-form-item-height-small);

            .placeholder,
            .cun-select-multiple-text-value {
                font-size: var(--cun-form-font-size-small);
                line-height: var(--cun-form-item-height-small);
                margin-left: 8px;
            }
            .cun-select-multiple-text-value {
                padding-right: 24px;
            }
        }

        .cun-select-size-medium {
            min-height: var(--cun-form-item-height-medium);

            .placeholder,
            .cun-select-multiple-text-value {
                font-size: var(--cun-form-font-size-medium);
                line-height: var(--cun-form-item-height-medium);
                margin-left: 10px;
            }
            .cun-select-multiple-text-value {
                padding-right: 28px;
            }
        }

        .cun-select-size-large {
            min-height: var(--cun-form-item-height-large);

            .placeholder,
            .cun-select-multiple-text-value {
                font-size: var(--cun-form-font-size-large);
                line-height: var(--cun-form-item-height-large);
                margin-left: 12px;
            }
            .cun-select-multiple-text-value {
                padding-right: 32px;
            }
        }
    }

    .cun-select-view:hover {
        background-color: var(--cun-form-bgcolor-hover);
    }

    .cun-select-view:active {
        background-color: var(--cun-form-bgcolor-active);
    }

    .cun-select-view.cun-select-view-focus {
        background-color: var(--cun-form-bgcolor-focus);
        border: var(--cun-form-border-width) var(--cun-form-border-color-focus) solid;
        outline: var(--cun-form-ouline);

        .icon-select {
            transform: translateY(-50%) rotate(180deg);
            color: var(--cun-text-color-1);
        }

        .icon-select-hide {
            opacity: 0;
            transform: translate(100%, -50%) rotate(180deg);
        }
    }

    .cun-select-view-readonly {
        pointer-events: none; //鼠标点击不可修改

        .cun-select {
            user-select: text;
        }
    }

    .cun-select-view-disabled {
        opacity: var(--cun-disabled-opacity);
        pointer-events: none; //鼠标点击不可修改
    }

    .cun-select-view-disabled:hover {
        border-radius: var(--cun-border-radius-small);
        background-color: var(--cun-form-bgcolor);
        outline: 0px var(--cun-color-primary-light) solid;
        border: var(--cun-form-border-width) transparent solid;
    }

    .list-enter-active,
    .list-leave-active {
        transition: all 0.15s ease-in-out;
    }

    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateX(-5px);
    }
</style>
<style lang="scss">
    .cun-select-multiple-popover-body {
        padding: 6px;
    }
    .cun-select-multiple-popover-tag {
        .cun-select-multiple-tag-value {
            padding: 3px;
            box-sizing: border-box;
        }
    }

    .cun-select-body {
        width: 100%;
        box-sizing: border-box;
        .search-input {
            margin-bottom: 5px;

            input {
                outline: none;
                border: none;
                background-color: var(--cun-bgcolor-2);
                width: 100%;
                height: 30px;
                border-radius: var(--cun-border-radius-small);
                padding: 0px 10px;
                box-sizing: border-box;
                color: var(--cun-form-color);
                transition: var(--cun-form-transition);
            }

            input:focus {
                background-color: var(--cun-bgcolor-3);
            }
        }

        .reslut-count {
            padding-left: 8px;
            margin: 5px 0px;
            opacity: 0.4;
            font-size: 13px;
        }

        .cun-select-options-box {
            overflow-y: auto;
            overflow-x: hidden;
            height: auto;
            box-sizing: border-box;
            transition: all 0.25s ease;

            .cun-select-item-mul {
                position: relative;
                display: inline-flex;
                align-items: center;
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                cursor: pointer;
                color: var(--cun-text-color-1);
                box-sizing: border-box;
                border-radius: 6px;

                .cun-select-checkbox {
                    position: absolute;
                    left: 0px;
                    top: 50%;
                    transform: translateY(-50%);
                    padding-left: 12px;
                }

                .cun-select-label {
                    position: relative;
                    z-index: 5;
                    height: 30px;
                    display: inline-flex;
                    align-items: center;
                    padding-left: 35px;
                }
            }

            .cun-select-item-disabled {
                opacity: var(--cun-disabled-opacity);
                pointer-events: none; //鼠标点击不可修改
            }

            .cun-select-item-align-left {
                text-align: left;
            }

            .cun-select-item-align-center {
                text-align: center;
            }

            .cun-select-item-align-right {
                text-align: right;
            }

            .cun-select-label {
                width: 100%;
                user-select: none;
                font-size: 14px;
                padding: 0px 8px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                box-sizing: border-box;
            }

            .cun-select-item:hover {
                color: var(--cun-text-color-0);
                background-color: var(--cun-backdrop-bg-active);
            }

            .cun-select-item-active {
                color: var(--cun-checkbox-color);
                font-weight: bold;
                background-color: var(--cun-backdrop-bg-active);

                .icon-check {
                    margin-right: 10px;
                }
            }

            .cun-select-item-active:hover {
                color: var(--cun-checkbox-color);
                font-weight: bold;
                background-color: var(--cun-backdrop-bg-active);
            }
        }
    }

    .cun-select-item:hover {
        .cun-checkbox {
            .icon-checkbox-box {
                border: var(--cun-form-border-width) var(--cun-checkbox-border-color-hover) solid;
                outline: var(--cun-form-ouline);
                background: var(--cun-form-bgcolor);
            }
        }
    }

    .cun-select-item-active:hover {
        .cun-checkbox {
            .icon-checkbox-box {
                border: var(--cun-form-border-width) var(--cun-checkbox-color) solid;
                background: var(--cun-checkbox-color);

                .icon-checkbox {
                    transform: translate(-50%, -50%) rotate(0deg) scale(1);
                    opacity: 1;
                }
            }
        }
    }
</style>
