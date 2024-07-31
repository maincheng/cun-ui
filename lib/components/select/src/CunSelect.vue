<script setup lang="ts">
    import { useDebounceFn } from '@vueuse/core';
    import { CunPopover, CunFlex, CunIcon, CunToolTip } from 'cun-ui';
    import { objectClass, numFormat } from 'cun-ui/utils';
    import { UseVirtualList } from '@vueuse/components';
    import { selectProps, SelectOptions } from './props';
    import _ from 'lodash';

    // 获取app
    const app = getCurrentInstance()?.appContext.app;
    if (app && !app.directive('tooltip')) {
        app.use(CunToolTip);
    }
    const props = defineProps(selectProps);
    const emit = defineEmits(['change', 'blur', 'clear']);
    const selectValue: any = defineModel<string | number | undefined>();

    const cunSelectRef = ref();
    const inputRef = ref();
    const cunPopoverRef = ref();

    const state = reactive({
        selectWidth: 0,
        visible: false,
        loading: false,
        options: props.options,
        hideBySelect: false, // 记录是否通过选择隐藏
        keyword: props.defaultValue || (selectValue.value as any),
        backupKeyword: props.defaultValue as any
    });

    const getSelectWidth = () => {
        state.selectWidth = cunSelectRef.value?.clientWidth - 12;
    };

    const show = () => {
        cunPopoverRef.value.show();
    }

    const hide = () => {
        cunPopoverRef.value.hide();
    }

    const searchDebounce = useDebounceFn(async (e: any) => {
        search(e);
    }, props.searchDelay);

    const search = async (e: any) => {
        state.loading = true;
        const keyword = e.target.value;
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
        selectValue.value = undefined;
        emit('clear');
        emit('change');
    };

    const selectHandle = (item: SelectOptions) => {
        if (item.disabled) {
            return;
        }
        state.hideBySelect = true;
        state.keyword = item.label;
        selectValue.value = item.value;
        emit('change', item.value);
        hide();
    };

    const getChecked = computed(() => (value: string | number) => {
        return selectValue.value === value;
    });

    const getValueStyle = computed(() => {
        return state.visible ? 'opacity:0.6' : '';
    });

    const findKeyword = () => {
        if (state.options) {
            const option = state.options.find((e: any) => {
                if (e) {
                    return e.value === selectValue.value;
                }
            });

            if (option && JSON.stringify(option) !== '{}') {
                return (state.keyword = option.label);
            }
        }
        return (state.keyword = props.defaultValue);
    };
    findKeyword();

    const getSelectClassName = computed(() => {
        let { clearable, size, align } = props;
        clearable = clearable ? !!selectValue.value : false;
        return objectClass('cun-select', {clearable, size, align});
    });

    const getBodyClassName = computed(() => {
        const { size, disabled } = props;
        return objectClass('cun-select-body', {size, disabled});
    })

    const getSelectViewClassName = computed(() => {
        const { disabled, readonly, searchable } = props;
        const focus = state.visible;
        return objectClass('cun-select-view', { focus, searchable, disabled, readonly });
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

    const getVirtualHeight = computed(() => {
        let height = state.options.length * props.itemHeight;
        height = height >= 240 ? 240 : height;
        return `${height}px`;
    });

    const showHandle = () => {
        state.visible = true;
        state.backupKeyword = _.cloneDeep(state.keyword);
        if (props.searchable) {
            state.keyword = '';
        }
        state.hideBySelect = false; // 重置
        getSelectWidth();
        if (props.searchable) {
            search({ target: { value: '' } });
        }
    };

    const hideHandle = () => {
        state.visible = false;
        if (!state.hideBySelect) {
            findKeyword();
        }
        inputRef.value.blur();
        emit('blur');
    };

    watch(
        () => selectValue.value,
        () => {
            findKeyword();
        }
    );

    defineExpose({ show, hide });
</script>

<template>
    <cun-popover
        ref="cunPopoverRef"
        popover-body-class-name="cun-select-popover-body"
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
                    :class="{ 'icon-select-hide': clearable && state.keyword }"
                />
                <transition name="cun-form-icon-ani">
                    <cun-icon
                        v-if="clearable && state.keyword && !readonly"
                        :size="getIconSize"
                        type="x"
                        class="cun-form-icon-clear"
                        :class="{
                            'cun-form-icon-clear-focus': state.visible
                        }"
                        @click.stop="clearHandle"
                    />
                </transition>
                <input
                    ref="inputRef"
                    v-model="state.keyword"
                    class="value"
                    :style="getValueStyle"
                    :readonly="!searchable"
                    :placeholder="placeholder"
                    @input="searchDebounce"
                />
            </div>
        </template>
        <template #popover-body>
            <div
                class="cun-select-body"
                :class="getBodyClassName"
                :style="`width:${state.selectWidth}px`"
            >
                <slot name="header"></slot>

                <div class="cun-select-options-box">
                    <template v-if="state.options && state.options.length === 0">
                        <slot v-if="$slots.empty" name="empty" />
                        <cun-flex v-else direction="y" class="not-found">
                            <cun-empty title="暂无结果" />
                        </cun-flex>
                    </template>
                    <div
                        v-if="searchable && state.options && state.options.length > 0"
                        class="result-count"
                    >
                        共
                        {{ numFormat(state.options && state.options.length) }}
                        条结果
                    </div>
                    <use-virtual-list
                        v-if="state.options.length > 0"
                        :key="state.options.length"
                        class="cun-select-options-list cun-scrollbar"
                        :list="state.options"
                        :options="{
                            itemHeight
                        }"
                        :height="getVirtualHeight"
                    >
                        <template #default="{ data: templateProps }">
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
                                    class="cun-select-item"
                                    :class="getSelectItemClassName(templateProps)"
                                >
                                    <div class="cun-select-label">
                                        {{ templateProps.label }}
                                    </div>
                                    <cun-icon
                                        v-if="getChecked(templateProps.value) && showCheckIcon"
                                        class="icon-check"
                                        size="14"
                                        type="check"
                                    />
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
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
            user-select: none;
            box-sizing: border-box;

            .icon-select {
                position: absolute;
                top: 50%;
                right: 9px;
                transform: translateY(-50%) rotate(0deg);
                transition: var(--cun-form-transition);
                padding: 2px;
            }

            .icon-select {
                opacity: var(--cun-form-icon-opacity);
            }

            .icon-select-hide {
                opacity: 0;
                transform: translate(100%, -50%);
            }

            .value {
                width: calc(100% - 24px);
                display: inline-flex;
                align-items: center;
                box-sizing: border-box;
                transition: all 0.2s;
                border: none;
                outline: none;
                background: none;
                cursor: pointer;
                color: var(--cun-text-color-1);
            }

            .value::placeholder {
                color: rgb(165, 165, 165);
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

        .cun-select-placeholder {
            color: rgb(165, 165, 165);
        }

        .cun-select-size-small {
            .value {
                padding: var(--cun-form-input-padding-small);
                height: var(--cun-form-item-height-small);
                line-height: var(--cun-form-input-line-height-small);
                font-size: var(--cun-form-font-size-small);
            }
        }

        .cun-select-size-medium {
            .value {
                padding: var(--cun-form-input-padding-medium);
                line-height: var(--cun-form-input-line-height-medium);
                height: var(--cun-form-item-height-medium);
                font-size: var(--cun-form-font-size-medium);
            }
        }

        .cun-select-size-large {
            .value {
                padding: var(--cun-form-input-padding-large);
                height: var(--cun-form-item-height-large);
                line-height: var(--cun-form-input-line-height-large);
                font-size: var(--cun-form-font-size-large);
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

    .cun-select-view-disabled {
        opacity: var(--cun-disabled-opacity);
        pointer-events: none; //鼠标点击不可修改
    }

    .cun-select-view-readonly {
        pointer-events: none; //鼠标点击不可修改

        .cun-select {
            user-select: text;
        }
    }
    .cun-select-view-searchable {
        .cun-select {
            .value {
                cursor: text;
            }
        }
    }
    .cun-select-view-disabled:hover {
        background-color: var(--cun-form-bgcolor);
        outline: 0px var(--cun-color-primary-light) solid;
        border: var(--cun-form-border-width) transparent solid;
    }
</style>
<style lang="scss">
    .cun-select-popover-body {
        padding: 6px;
    }
    .cun-select-body {
        width: 100%;
        box-sizing: border-box;
        .cun-select-options-list {
            padding: 2px 0px;
        }
        .result-count {
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
            margin-top: -2px;
            margin-bottom: -2px;

            .cun-select-item {
                position: relative;
                display: inline-flex;
                align-items: center;
                width: 100%;
                font-size: 14px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                cursor: pointer;
                color: var(--cun-text-color-1);
                box-sizing: border-box;
                border-radius: 6px;
                height: 30px;
            }

            .cun-select-item-disabled {
                opacity: 0.3;
                cursor: no-drop;
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

            .cun-select-slot-item {
                width: 100%;
                border-radius: 6px;
            }

            .cun-select-slot-item:hover {
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
</style>