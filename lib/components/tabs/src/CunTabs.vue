<script setup lang="ts">
    import { tabsProps } from './props';
    import { objectClass, any2px } from 'cun-ui/utils';

    const emit = defineEmits(['change']);
    const props = defineProps(tabsProps);
    const tabsValue: any = defineModel<string | number | undefined>({ required: true });

    const tabsRef = ref();
    const itemRef = ref([] as any);

    const state = reactive({
        activeItemStyle: {} as any,
        curIndex: props.options.findIndex((e) => tabsValue.value === e.value),
        hidLine: '',
        isInit: false
    });

    watch(
        () => tabsValue.value,
        (v) => {
            selectItem(v, 'watch');
            if (!state.isInit) {
                init();
            }
        },
        { deep: true }
    );

    const initActiveItemStyle = (index: number) => {
        const activeRef = itemRef.value[index];
        console.log('tabsRef.value.scrollWidth:',tabsRef.value.scrollWidth);
        console.log('tabsRef.value.clientWidth:',tabsRef.value.clientWidth);
        console.log('activeRef?.offsetLeft:',activeRef?.offsetLeft);
        console.log('activeRef?.offsetWidth:',activeRef?.offsetWidth);
        
        
        
        
        if (tabsRef.value.scrollWidth > tabsRef.value.clientWidth && activeRef?.offsetLeft >= 0) {
            tabsRef.value.scrollLeft =
                activeRef?.offsetLeft - tabsRef.value.clientWidth / 2 + activeRef?.offsetWidth / 2;
        }

        state.activeItemStyle = {
            width: `${activeRef?.offsetWidth}px`,
            transform: `translate(${activeRef?.offsetLeft}px)`
        };
    };

    watch(
        () => props.size,
        () => {
            nextTick(() => {
                const index = props.options.findIndex((e) => tabsValue.value === e.value);
                initActiveItemStyle(index);
            });
        }
    );

    const init = () => {
        let index = props.options.findIndex((e) => e.value === tabsValue.value);
        if (index >= 0) {
            state.activeItemStyle = `width:${itemRef.value[index].offsetWidth}px;transform: translateX(${itemRef.value[index].offsetLeft}px);`;
        }
        tabsScroll();
        setTimeout(() => {
            state.isInit = true;
        }, 100);
    };

    const selectItem = (value: [String, Number], type?: string) => {
        let index = props.options.findIndex((e) => value === e.value);
        if (index >= 0) {
            const _item = props.options[index];
            if (tabsValue.value != _item.value) {
                tabsValue.value = _item.value;
            }
            initActiveItemStyle(index);
            if (type !== 'watch') {
                emit('change', {
                    label: _item.label,
                    value: _item.value,
                    activeIndex: index
                });
            }
            state.curIndex = index;
        }
    };

    let timer: ReturnType<typeof setTimeout> | undefined;

    const debounce = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            init();
        }, 250);
    };

    const getTabsWrapperClassName = computed(() => {
        const { type, round } = props;
        return objectClass('cun-tabs-wrapper', {
            type,
            round,
            hidLine: state.hidLine
        });
    });

    const getTabsClassName = computed(() => {
        const { type, round, size } = props;
        return objectClass('cun-tabs', {
            type,
            round,
            size
        });
    });

    const tabsScroll = () => {
        if (tabsRef.value.scrollWidth > tabsRef.value.clientWidth) {
            if (tabsRef.value.scrollLeft > 50) {
                if (
                    tabsRef.value.scrollLeft >=
                    tabsRef.value.scrollWidth - tabsRef.value.clientWidth - 50
                ) {
                    state.hidLine = 'right';
                } else {
                    state.hidLine = '';
                }
            } else {
                state.hidLine = 'left';
            }
        } else {
            state.hidLine = 'all';
        }
    };

    onMounted(() => {
        init();
        window.addEventListener('resize', debounce, false);
    });

    const getItemStyle = computed(() => {
        let width = any2px(props.itemWidth);
        if (props.itemWidth === 'auto') {
            return 'flex:1';
        } else {
            return `width:${width}`;
        }
    });

    const getTabsStyle = computed(() => {
        let width = any2px(props.width);
        return `width:${width}`;
    });

    onUnmounted(() => {
        window.removeEventListener('resize', debounce);
    });
</script>

<template>
    <div :style="getTabsStyle" class="cun-tabs-wrapper" :class="getTabsWrapperClassName">
        <div
            ref="tabsRef"
            :style="getTabsStyle"
            class="cun-tabs hidden-scrollbar"
            :class="getTabsClassName"
            @scroll="tabsScroll"
        >
            <div
                v-if="tabsValue || tabsValue === 0"
                :style="state.activeItemStyle"
                class="cun-tabs-item-animation-active"
                :class="{ 'cun-tabs-item-isInit': state.isInit }"
            ></div>
            <div
                v-for="item in options"
                :key="String(item.value)"
                :ref="(el) => itemRef.push(el)"
                class="cun-tabs-item"
                :style="getItemStyle"
                :class="{ 'cun-tabs-item-active': tabsValue === item.value }"
                @click="selectItem(item.value)"
            >
                {{ item.label }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .cun-tabs-wrapper {
        display: inline-flex;
        position: relative;
        width: auto;
        border-radius: var(--cun-border-radius-small);
        overflow: hidden;
    }

    .cun-tabs-wrapper-round {
        border-radius: 35px;
    }

    .cun-tabs-wrapper::after {
        position: absolute;
        right: 0px;
        top: 0px;
        height: 100%;
        width: 10px;
        z-index: 9;
        content: '';
        opacity: 1;
        transition: opacity 0.2s;
        background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
    }

    .cun-tabs-wrapper::before {
        position: absolute;
        left: 0px;
        top: 0px;
        height: 100%;
        width: 12px;
        content: '';
        z-index: 9;
        opacity: 1;
        transition: opacity 0.2s;
        background: linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
    }

    .cun-tabs-wrapper-type-line {
        border-radius: 0px;
    }

    .cun-tabs-wrapper-type-line::before,
    .cun-tabs-wrapper-type-line::after {
        display: none;
    }

    .cun-tabs-wrapper-hidLine-left::before,
    .cun-tabs-wrapper-hidLine-all::after,
    .cun-tabs-wrapper-hidLine-all::before,
    .cun-tabs-wrapper-hidLine-right::after {
        opacity: 0;
    }

    .cun-tabs {
        position: relative;
        display: inline-flex;
        align-items: center;
        background: var(--cun-form-bgcolor);
        border-radius: var(--cun-border-radius-small);
        overflow-x: auto;
        overflow-y: hidden;
        user-select: none;
        scroll-behavior: smooth;
        width: 100%;
        box-sizing: border-box;

        .cun-tabs-item {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            z-index: 9;
            box-sizing: border-box;
            border-radius: var(--cun-border-radius-small);
            margin: 3px;
            color: var(--cun-text-color-1);
            white-space: nowrap;
            cursor: pointer;
            flex-shrink: 0;
        }

        .cun-tabs-item-active {
            color: var(--cun-color-primary);
            font-weight: 600;
        }

        .cun-tabs-item-animation-active {
            position: absolute;
            top: 3px;
            left: 0px;
            z-index: 9;
            height: calc(100% - 6px);
            border-radius: 6px;
            background: var(--cun-tabs-active-color);
            transform: translateX(3px);
            box-sizing: border-box;
        }

        .cun-tabs-item-isInit {
            transition: all 0.15s cubic-bezier(0.65, 0, 0.35, 1);
        }
    }

    .cun-tabs-size-small {
        height: 28px;

        .cun-tabs-item {
            padding: var(--cun-form-input-padding-small);
            font-size: var(--cun-form-font-size-small);
        }
    }

    .cun-tabs-size-medium {
        height: 32px;

        .cun-tabs-item {
            padding: var(--cun-form-input-padding-medium);
            font-size: 14px;
        }
    }
    .cun-tabs-type-line {
        height: auto !important;
    }
    .cun-tabs-size-large {
        height: 34px;

        .cun-tabs-item {
            padding: var(--cun-form-input-padding-large);
            font-size: 15px;
        }
    }

    .cun-tabs-type-line {
        position: relative;
        background: none;
        border: none;
        padding-bottom: 5px;
        border-radius: 0px;

        .cun-tabs-item:hover {
            background: var(--cun-bgcolor-2);
        }

        .cun-tabs-item-active {
            background: none;
        }

        .cun-tabs-item-active:hover {
            transition: all 0.25s cubic-bezier(0.65, 0, 0.35, 1);
            background: none;
        }

        .cun-tabs-item-animation-active {
            position: absolute;
            top: auto;
            bottom: 1px;
            left: 0px;
            z-index: 9;
            height: 2px;
            border-radius: 0px;
            background: var(--cun-color-primary);
            transform: translateX(3px);
        }
    }
    .cun-tabs-type-line:after {
        position: absolute;
        content: '';
        bottom: 1px;
        left: 3px;
        height: 2px;
        background-color: var(--cun-form-border-color);
        width: calc(100% - 6px);
    }
    .cun-tabs-round {
        border-radius: 35px;

        .cun-tabs-item {
            border-radius: 35px;
        }

        .cun-tabs-item-animation-active {
            border-radius: 35px;
        }
    }
</style>