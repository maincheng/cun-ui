<script setup lang="ts">
    import { CunPopover, CunFlex, CunButton, CunIcon, CunToolTip, CunTextTrim } from 'cun-ui';
    import { objectClass } from 'cun-ui/utils';
    import { CascaderProps, CascaderOptions } from './props';
    import { UseVirtualList } from '@vueuse/components';
    import _ from 'lodash';

    const formatTree = (
        tree: CascaderOptions[],
        parentValuePaths: String[] = [],
        parentLabelPaths: String[] = []
    ): CascaderOptions[] => {
        return tree.map((node: CascaderOptions) => {
            const { value, label, children = [] } = node;
            const valuePaths: String[] = [...parentValuePaths, value];
            const labelPaths: String[] = [...parentLabelPaths, label];
            const level = valuePaths.length - 1;
            const _node = {
                ...node,
                valuePaths,
                labelPaths,
                level,
                parentValuePaths,
                parentLabelPaths
            };
            if ((children || []).length > 0) {
                return {
                    ..._node,
                    children: formatTree(children, valuePaths, labelPaths)
                };
            }
            return _node;
        }) as CascaderOptions[];
    };

    // 获取app
    const app = getCurrentInstance()?.appContext.app;
    if (app && !app.directive('tooltip')) {
        app.use(CunToolTip);
    }

    const props = defineProps(CascaderProps);
    const emit = defineEmits(['change', 'blur', 'clear']);
    const cascaderValue = defineModel<string>({
        default: undefined
    });

    const cunCascaderRef = ref()
    const cunPopoverRef = ref()

    const state = reactive({
        visible: false,
        loading: false,
        okLoading: false,
        optionsGroup: [] as CascaderOptions[][], // 分组
        optionsTree: [] as any, // 树
        activelabels: [] as string[], // 激活
        tobelabels: [] as string[], // 待确认
        tobeItem: {} as CascaderOptions,
        keyword: ''
    });

    // 通过值获取对象
    const findObjectByValue = (treeList: CascaderOptions[], value: string) => {
        for (let i = 0; i < treeList.length; i++) {
            const tree = treeList[i];
            if (tree.value === value) {
                return tree;
            }
            if (tree.children) {
                const foundObject: CascaderOptions = findObjectByValue(
                    tree.children,
                    value
                ) as CascaderOptions;
                if (foundObject) {
                    return foundObject;
                }
            }
        }
        return null;
    };
    
    // 通过值添加子集
    function findAndAddChildrenByValue(
        tree: CascaderOptions[],
        value: string,
        children: CascaderOptions[]
    ): CascaderOptions[] {
        for (const node of tree) {
            if (node.value === value) {
                if (!node.children) {
                    node.children = [];
                }
                node.children = children;
                return tree;
            }
            if (node.children && node.children.length > 0) {
                const result = findAndAddChildrenByValue(node.children, value, children);
                if (result && result.length > 0) {
                    return tree;
                }
            }
        }

        return [];
    }
    // 通过值查找子集
    function findChildrenByValue(tree: CascaderOptions[], value: string): CascaderOptions[] {
        for (const node of tree) {
            if (node.value === value) {
                return node.children || [];
            }

            if (node.children && node.children.length > 0) {
                const result = findChildrenByValue(node.children, value);
                if (result && result.length > 0) {
                    return result;
                }
            }
        }

        return [];
    }

    // 初始化
    const init = async () => {
        let _tree: CascaderOptions[] = [];
        if (props.onload && !state.loading) {
            state.loading = true;
            _tree = (await props.onload()) || [];
            state.loading = false;
        } else if (props.options && props.options.length > 0) {
            _tree =
                ((props.options &&
                    props.options.map((e: CascaderOptions) => {
                        return {
                            ...e,
                            isLeaf: !e.children || (e.children && e.children.length === 0) // 没有孩子
                        };
                    })) as CascaderOptions[]) || [];
        }
        const __tree: CascaderOptions[] = formatTree(_tree);
        state.optionsGroup = [__tree];
        state.optionsTree = __tree;
    };

    init();

    // 选择
    const selectItem = async (item: CascaderOptions, level: number) => {
        if (!item.isLeaf && item.labelPaths !== state.activelabels) {
            state.optionsGroup = state.optionsGroup.slice(0, level + 1);
            if (props.onload && !item.isLeaf) {
                item.loading = true;
                state.okLoading = true;
                const new_options = (await props.onload(_.cloneDeep({ ...item, level }))) || [];
                let _tree = findAndAddChildrenByValue(
                    _.cloneDeep(state.optionsTree),
                    _.cloneDeep(item.value),
                    new_options
                );
                state.optionsTree = formatTree(_tree);
                const _options = findChildrenByValue(state.optionsTree, item.value);
                state.optionsGroup.push(_options);
                item.loading = false;
                state.okLoading = false;
            } else if (!item.isLeaf) {
                const _options =
                    (item.children &&
                        item.children.map((e) => {
                            return {
                                ...e,
                                isLeaf: !e.children || (e.children && e.children.length === 0) // 没有孩子
                            };
                        })) ||
                    [];
                state.optionsGroup.push(_options);
            }
        }
        if (item.labelPaths === state.activelabels) {
            state.activelabels = item.parentLabelPaths as string[];
            if (level < state.optionsGroup.length - 1) {
                state.optionsGroup.pop();
            }
        } else {
            state.activelabels = item.labelPaths as string[];
        }
        state.tobeItem = { ...item, children: undefined };
        if (props.free) {
            checkItem(item);
        } else if (item.isLeaf) {
            checkItem(item);
            ok();
        }
    };

    // 检查Item
    const checkItem = (item: CascaderOptions) => {
        if (props.showAllLevels) {
            if (state.tobelabels === item.labelPaths) {
                state.tobelabels = item.parentLabelPaths as string[];
            } else {
                state.tobelabels = item.labelPaths as string[];
            }
        } else if (state.tobelabels[0] === (item.label as string)) {
            state.tobelabels = [] as string[];
        } else {
            state.tobelabels = [item.label] as any;
        }
    };

    const show = async () => {
        cunPopoverRef.value.show();
    };

    const hide = () => {
        cunPopoverRef.value.hide();
    };

    const clearHandle = () => {
        cascaderValue.value = undefined as any;
        state.tobelabels = [];
        state.activelabels = [];
        hide();
        init();
        emit('clear');
        emit('change');
    };

    const getValueStyle = computed(() => {
        return state.visible ? 'opacity:0.4' : '';
    });

    const getCascaderClassName = computed(() => {
        let { clearable, size } = props;
        clearable = clearable ? !!cascaderValue.value : false;
        return objectClass('cun-cascader', { clearable, size });
    });

    const getBodyClassName = computed(() => {
        const { size, disabled } = props;
        return objectClass('cun-cascader-body', { size, disabled });
    })

    const getCascaderViewClassName = computed(() => {
        const { disabled, readonly } = props;
        const focus = state.visible;
        return objectClass('cun-cascader-view', {focus, disabled, readonly});
    });

    // 获取图标大小
    const getIconSize = computed(() => {
        const size: Record<string, number> = {
            small: 13,
            medium: 14,
            large: 16
        };
        return size[props.size];
    });

    const getTextTrimOffset = computed(() => {
        switch (props.size) {
            case 'small':
                return [-15, 12];
            case 'medium':
                return [-14, 12];
            case 'large':
                return [-14, 12];
            default:
                return [-14, 12];
        }
    });

    // 展示
    const showHandle = () => {
        state.visible = true;
    };

    // 隐藏
    const hideHandle = () => {
        state.visible = false;
        if (!cascaderValue.value) {
            state.tobelabels = [];
            state.activelabels = [];
            state.optionsGroup = [state.optionsGroup[0]];
        }
        emit('blur');
    };

    // 获取宽度
    const getCascaderWidth = computed(() => {
        const _hasChildOptions = state.optionsGroup.filter((e) => e && e.length > 0).length;
        if (_hasChildOptions > 1) {
            return _hasChildOptions * 180;
        }
        return _hasChildOptions * 180;
    });

    const getLabel = computed(() => {
        const item = findObjectByValue(state.optionsTree, cascaderValue.value);
        return item?.labelPaths || [];
    });

    const ok = () => {
        const item = findObjectByValue(state.optionsTree, state.tobeItem.value);
        cascaderValue.value = state.tobeItem.value;
        emit('change', _.cloneDeep(item));
        hide();
    };

    const cancel = () => {
        cascaderValue.value = '';
        state.tobelabels = [];
        state.activelabels = [];
        hide();
    };

    defineExpose({ show, hide });
</script>

<template>
    <cun-popover
        ref="cunPopoverRef"
        class="cun-cascader-view"
        :class="getCascaderViewClassName"
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
            <div ref="cunCascaderRef" class="cun-cascader" :class="getCascaderClassName">
                <transition name="cun-form-icon-ani">
                    <cun-icon
                        v-if="!(clearable && getLabel && getLabel.length > 0)"
                        :size="getIconSize"
                        type="chevron-down"
                        class="icon-cascader"
                    />
                </transition>

                <transition name="cun-form-icon-ani">
                    <cun-icon
                        v-if="clearable && getLabel && getLabel.length > 0 && !readonly"
                        :size="getIconSize"
                        type="x"
                        class="cun-form-icon-clear"
                        :class="{
                            'cun-form-icon-clear-focus': state.visible
                        }"
                        @click.stop="clearHandle"
                    />
                </transition>

                <div v-show="getLabel && getLabel.length > 0" :style="getValueStyle" class="value">
                    <template v-if="showAllLevels">
                        <cun-text-trim :offset="getTextTrimOffset" :text="getLabel.join(' / ')" />
                    </template>
                    <template v-else-if="getLabel">
                        <span>{{ getLabel[getLabel.length - 1] }}</span>
                    </template>
                </div>
                <div v-show="!getLabel || (getLabel && getLabel.length === 0)" class="placeholder">
                    {{ placeholder }}
                </div>
            </div>
        </template>
        <template #popover-body>
            <div
                class="cun-cascader-body"
                :style="{
                    width: `${getCascaderWidth}px`
                }"
                :class="getBodyClassName"
            >
                <slot name="header"></slot>
                <div
                    class="cun-cascader-options-box"
                    :style="{ height: free ? 'calc(100% - 40px)' : '100%' }"
                >
                    <template v-for="(oItem, oIndex) in state.optionsGroup" :key="oIndex">
                        <use-virtual-list
                            v-if="oItem.length > 0"
                            class="cun-cascader-item-warpper cun-scrollbar-hover"
                            :list="oItem"
                            :options="{
                                itemHeight: 30
                            }"
                            :height="30 * oItem.length"
                            :style="{
                                zIndex: 20 - oIndex,
                                transform: oItem.length > 0 ? `translateX(${180 * oIndex}px)` : ''
                            }"
                        >
                            <template #default="{ data: templateProps }">
                                <div class="cun-cascader-item-padding">
                                    <div
                                        class="cun-cascader-item"
                                        :class="{
                                            'cun-cascader-item-disabled': templateProps.disabled,
                                            'cun-cascader-item-hover': state.activelabels.includes(
                                                templateProps.label
                                            ),
                                            'cun-cascader-item-active': free
                                                ? state.activelabels.includes(
                                                      templateProps.label
                                                  ) &&
                                                  state.tobelabels.includes(templateProps.label)
                                                : state.activelabels.includes(templateProps.label),
                                            'cun-cascader-item-tobe': state.tobelabels.includes(
                                                templateProps.label
                                            ),
                                            'cun-cascader-item-selected':
                                                getLabel && getLabel.includes(templateProps.label)
                                        }"
                                        @click="selectItem(templateProps, oIndex)"
                                    >
                                        <cun-checkbox
                                            v-if="free"
                                            class="cun-cascader-checkbox"
                                            :checked="
                                                state.tobelabels.includes(templateProps.label)
                                            "
                                        />
                                        <div
                                            class="cun-cascader-label"
                                            :class="{
                                                'cun-cascader-label-free': free
                                            }"
                                        >
                                            {{ templateProps.label }}
                                        </div>
                                        <cun-icon
                                            v-if="templateProps.loading"
                                            size="14px"
                                            animation="spin"
                                            animation-speed="fast"
                                            class="cun-cascader-loading-icon"
                                            type="loader"
                                        />
                                        <cun-icon
                                            v-else-if="!templateProps.isLeaf"
                                            size="14px"
                                            class="cun-cascader-icon"
                                            type="chevron-right"
                                        />
                                    </div>
                                </div>
                            </template>
                        </use-virtual-list>
                    </template>
                </div>
                <cun-flex v-if="free" x="end" class="cun-cascader-control">
                    <cun-button round color="normal" type="text" size="small" @click="cancel"
                        >取消</cun-button
                    >
                    <cun-button
                        :disabled="state.okLoading"
                        round
                        type="light"
                        size="small"
                        @click="ok()"
                    >
                        确认
                    </cun-button>
                </cun-flex>
            </div>
        </template>
    </cun-popover>
</template>

<style lang="scss" scoped>
    .cun-cascader-view {
        width: 100%;
        border-radius: var(--cun-border-radius-small);
        background-color: var(--cun-form-bgcolor);
        transition: var(--cun-form-transition);
        box-sizing: border-box;
        outline: 0px var(--cun-color-primary-light) solid;
        border: var(--cun-form-border-width) transparent solid;

        > div {
            width: 100%;
        }

        .cun-cascader {
            position: relative;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
            user-select: none;
            box-sizing: border-box;

            .icon-cascader {
                position: absolute;
                top: 50%;
                right: 7px;
                transform: translateY(-50%) rotate(0deg);
                transition: var(--cun-form-transition);
            }

            .icon-cascader {
                opacity: var(--cun-form-icon-opacity);
            }

            .icon-cascader-hide {
                opacity: 0;
                transform: translate(100%, -50%);
            }

            .placeholder {
                color: rgb(165, 165, 165);
            }

            .placeholder,
            .value {
                display: inline-flex;
                align-items: center;
                box-sizing: border-box;
                transition: var(--cun-form-transition);
                gap: 2px;
                overflow: hidden;

                span {
                    display: inline-flex;
                    gap: 2px;
                    align-items: center;
                    svg {
                        opacity: 0.4;
                    }
                }
            }
        }

        .cun-cascader-align-left {
            text-align: left;
        }

        .cun-cascader-align-center {
            text-align: center;
        }

        .cun-cascader-align-right {
            text-align: right;
        }

        .cun-cascader-placeholder {
            color: rgb(165, 165, 165);
        }

        .cun-cascader-size-small {
            .value,
            .placeholder {
                width: calc(100% - 20px);
                padding: var(--cun-form-input-padding-small);
                height: var(--cun-form-item-height-small);
                line-height: var(--cun-form-input-line-height-small);
                font-size: var(--cun-form-font-size-small);
            }
        }

        .cun-cascader-size-medium {
            .value,
            .placeholder {
                width: calc(100% - 22px);
                padding: var(--cun-form-input-padding-medium);
                line-height: var(--cun-form-input-line-height-medium);
                height: var(--cun-form-item-height-medium);
                font-size: var(--cun-form-font-size-medium);
            }
        }

        .cun-cascader-size-large {
            .value,
            .placeholder {
                width: calc(100% - 24px);
                padding: var(--cun-form-input-padding-large);
                height: var(--cun-form-item-height-large);
                line-height: var(--cun-form-input-line-height-large);
                font-size: var(--cun-form-font-size-large);
            }
        }
    }

    .cun-cascader-view:hover {
        background-color: var(--cun-form-bgcolor-hover);
    }

    .cun-cascader-view:active {
        background-color: var(--cun-form-bgcolor-active);
    }

    .cun-cascader-view.cun-cascader-view-focus {
        background-color: var(--cun-form-bgcolor-focus);
        border: var(--cun-form-border-width) var(--cun-form-border-color-focus) solid;
        outline: var(--cun-form-ouline);

        .icon-cascader {
            transform: translateY(-50%) rotate(180deg);
            color: var(--cun-text-color-1);
        }

        .icon-cascader-hide {
            opacity: 0;
            transform: translate(100%, -50%) rotate(180deg);
        }
    }

    .cun-cascader-view-disabled {
        opacity: var(--cun-disabled-opacity);
        pointer-events: none; //鼠标点击不可修改
    }

    .cun-cascader-view-readonly {
        pointer-events: none; //鼠标点击不可修改

        .cun-cascader {
            user-select: text;
        }
    }

    .cun-cascader-view-disabled:hover {
        background-color: var(--cun-form-bgcolor);
        outline: 0px var(--cun-color-primary-light) solid;
        border: var(--cun-form-border-width) transparent solid;
    }

    .cun-cascader-item:hover {
        :deep(.cun-checkbox) {
            .icon-checkbox-box {
                border: var(--cun-form-border-width) var(--cun-checkbox-border-color-hover) solid;
                outline: var(--cun-form-ouline);
                background: var(--cun-form-bgcolor);
            }
        }
    }

    .cun-cascader-item-tobe:hover {
        :deep(.cun-checkbox) {
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

    .cun-cascader-item-selected:hover {
        :deep(.cun-checkbox) {
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
<style lang="scss">
    .cun-cascader-body {
        width: 100%;
        box-sizing: border-box;
        min-width: 180px;
        height: 280px;
        overflow: hidden;
        transition: var(--cun-form-transition);
        user-select: none;

        .search-input {
            margin-bottom: 5px;

            input {
                outline: none;
                border: none;
                background-color: var(--cun-bgcolor-1);
                width: 100%;
                height: 30px;
                border-radius: var(--cun-border-radius-small);
                padding: 0px 10px;
                box-sizing: border-box;
                color: var(--cun-form-color);
                transition: var(--cun-form-transition);
            }

            input:focus {
                background-color: var(--cun-form-bgcolor);
            }
        }

        .not-found {
            opacity: 0.4;
        }

        .reslut-count {
            padding-left: 8px;
            margin: 5px 0px;
            opacity: 0.4;
            font-size: 13px;
        }

        .cun-cascader-options-box {
            position: relative;
            display: flex;
            box-sizing: border-box;

            .cun-cascader-item-warpper {
                position: absolute;
                left: 0px;
                top: 2px;
                overflow-y: scroll;
                height: 100%;
                width: 180px;
                padding-left: 5px;
                border-right: var(--cun-popover-border);
                padding: 5px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                gap: 4px;
                margin-top: -2px;
            }

            .cun-cascader-item-warpper:last-child {
                border-right: 0px transparent solid;
            }
            .cun-cascader-item-padding {
                padding: 2px 0px;
            }
            .cun-cascader-item {
                position: relative;
                display: inline-flex;
                align-items: center;
                gap: 10px;
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
                padding: 0px 10px;
                flex-shrink: 0;

                .cun-cascader-icon {
                    position: absolute;
                    right: 2px;
                    top: 8.5px;
                    opacity: 0.4;
                }
                .cun-cascader-loading-icon {
                    position: absolute;
                    right: 5px;
                    top: 8.5px;
                }
                .cun-cascader-checkbox {
                    position: absolute;
                    left: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                }

                .cun-cascader-label {
                    position: relative;
                    z-index: 5;
                    width: 100%;
                    user-select: none;
                    font-size: 14px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    box-sizing: border-box;
                }

                .cun-cascader-label-free {
                    padding: 0px 8px 0px 25px;
                }
            }

            .cun-cascader-item:hover {
                .icon {
                    opacity: 1;
                }
            }

            .cun-cascader-item-disabled {
                opacity: 0.3;
                pointer-events: none;
            }

            .cun-cascader-item-align-left {
                text-align: left;
            }

            .cun-cascader-item-align-center {
                text-align: center;
            }

            .cun-cascader-item-align-right {
                text-align: right;
            }

            .cun-cascader-item:hover {
                color: var(--cun-text-color-0);
                background-color: var(--cun-backdrop-bg-active);
            }

            .cun-cascader-slot-item {
                border-radius: 6px;
            }

            .cun-cascader-slot-item:hover {
                color: var(--cun-text-color-0);
                background-color: var(--cun-backdrop-bg-active);
            }

            .cun-cascader-item-hover {
                background-color: var(--cun-backdrop-bg-active);
                .icon-check {
                    margin-right: 10px;
                }
            }
            .cun-cascader-item-active {
                color: var(--cun-checkbox-color);
                font-weight: bold;
                .cun-cascader-icon {
                    opacity: 1;
                }
                .icon-check {
                    margin-right: 10px;
                }
            }

            .cun-cascader-item-active:hover {
                color: var(--cun-checkbox-color);
                font-weight: bold;
            }
        }

        .cun-cascader-control {
            border-top: var(--cun-popover-border);
            height: 40px;
            padding-right: 10px;
        }
    }
</style>