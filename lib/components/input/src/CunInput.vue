<script setup lang="ts">
    import { useMagicKeys } from '@vueuse/core';
    import { objectClass } from 'cun-ui/utils';
    import { CunIcon, CunDropdown, CunFlex, CunMessage, CunToolTip } from 'cun-ui';
    import { inputProps } from './props';

    const { enter } = useMagicKeys();
    //获取app
    const app = getCurrentInstance()?.appContext.app;
    if (app && !app.directive('tooltip')) {
        app.use(CunToolTip);
    }
    const emit = defineEmits(['clear', 'blur', 'focus', 'change', 'input', 'ok']);

    const props = defineProps(inputProps);
    const modelValue: any = defineModel<string | number | undefined>({ required: true });
    const prefixesValue: any = defineModel<string | number | undefined>('prefixesValue');
    const suffixValue: any = defineModel<string | number | undefined>('suffixValue');
    const cunInputRef = ref();
    const isCopy = ref(false);
    let timer: any = null;
    const _type =ref(props.type);
    const state = reactive({
        prefixesDropdown: 'hide',
        suffixDropdown: 'hide',
        isFocus: false
    });

    watch(
        () => props.type,
        (v) => {
            if (v === 'password') {
                _type.value = 'password';
            }
        }
    );

    const updateValue = () => {
        if (props.maxLength && props.renderCount(modelValue.value) >= Number(props.maxLength)) {
            modelValue.value = modelValue.value.slice(0, Number(props.maxLength));
        }
    };

    let isFirst = true;
    const inputFn = () => {
        updateValue();
        if (!isFirst) {
            emit('input', modelValue.value);
        }
        isFirst = false;
    };

    const clear = (): void => {
        modelValue.value = undefined;
        emit('clear');
    };

    const toFocus = () => {
        cunInputRef.value?.focus();
    };

    const showPasswordFn = (): void => {
        if (_type.value === 'text') {
            _type.value = 'password';
        } else {
            _type.value = 'text';
        }
    };

    const getCheckNumStr = computed(() => {
        if (props.showCount && props.maxLength) {
            return `${props.renderCount(modelValue.value)} / ${props.maxLength}`;
        }
        if (props.showCount) {
            return props.renderCount(modelValue.value);
        }
        return false;
    });

    const focus = (e: any) => {
        if (props.focusSelect) {
            e?.currentTarget?.select();
        }
        emit('focus');
        state.isFocus = true;
    };

    const blur = () => {
        emit('blur', modelValue);
        state.isFocus = false;
    };

    const getIconSize = computed(() => {
        const size: any = {
            small: 13,
            medium: 14,
            large: 16
        };
        return size[props.size];
    });

    const getType = computed(() => {
        if (props.type === 'password') {
            return _type.value;
        }
        return props.type;
    });

    const getInputClassNames = computed(() => {
        const { size, readonly, disabled, align, autoWidth } = props;
        return objectClass('cun-input-view', {
            size,
            readonly,
            disabled,
            align,
            autoWidth
        });
    });

    const prefixesChange = (item: any) => {
        prefixesValue.value = item.value;
    };
    const suffixChange = (item: any) => {
        suffixValue.value = item.value;
    };
    const getPrefixesLabel = computed(() => {
        const item: any = props.prefixesOptions.find((e: any) => e.value === prefixesValue.value);
        return item?.label || '';
    });
    const getSuffixLabel = computed(() => {
        const item: any = props.suffixOptions.find((e: any) => e.value === suffixValue.value);
        return item?.label || '';
    });

    const copy = () => {
        const textarea = document.createElement('textarea');
        textarea.style.position = 'fixed';
        textarea.style.top = '-200vh';
        textarea.value = modelValue.value;

        document.body.appendChild(textarea);
        textarea.select();
        if (document.execCommand('copy')) {
            CunMessage.success('复制成功！');
            isCopy.value = true;
            timer = setTimeout(() => {
                isCopy.value = false;
            }, 2000);
        } else {
            CunMessage.error('复制失败！');
        }
        document.body.removeChild(textarea);
    };

    if (props.okByEnter) {
        watch(enter, (v) => {
            if (v && state.isFocus) {
                emit('ok', modelValue.value);
            }
        });
    }

    onUnmounted(() => {
        clearTimeout(timer);
    });
    defineExpose({ toFocus });
</script>

<template>
    <div class="cun-input-view" :class="getInputClassNames">
        <div
            v-if="prefixes"
            v-tooltip="{
                content: prefixesTooltip,
                trigger: 'mouseenter'
            }"
            class="cun-input-prefixes"
        >
            <cun-text-trim
                v-if="prefixes === 'text'"
                :text="prefixesValue"
                class="cun-input-prefixes-text"
            />
            <div v-if="prefixes === 'icon'" class="cun-input-prefixes-icon">
                <cun-icon :size="getIconSize" :type="prefixesValue"> </cun-icon>
            </div>
            <div v-if="prefixes === 'select'" class="cun-input-prefixes-select">
                <cun-dropdown
                    placement="bottom"
                    trigger="click"
                    :options="prefixesOptions"
                    @change="prefixesChange"
                    @show="state.prefixesDropdown = 'show'"
                    @hide="state.prefixesDropdown = 'hide'"
                >
                    <cun-flex
                        gap="5px"
                        x="start"
                        class="cun-input-prefixes-dropdown"
                        :class="{
                            'cun-input-prefixes-dropdown-open': state.prefixesDropdown === 'show'
                        }"
                    >
                        <cun-text-trim :text="getPrefixesLabel" class="cun-input-prefixes-text" />
                        <cun-icon :size="getIconSize" type="chevron-down" class="icon-select" />
                    </cun-flex>
                </cun-dropdown>
            </div>
        </div>
        <div
            v-if="copyable && readonly && modelValue && !suffix"
            class="cun-input-copy-btn"
            @click="copy"
        >
            <cun-icon
                :size="getIconSize"
                :type="isCopy ? 'check' : 'copy'"
                :class="{ 'cun-input-copy-btn-check': isCopy }"
            />
        </div>
        <div class="cun-input-box">
            <input
                ref="cunInputRef"
                v-model="modelValue"
                class="cun-input"
                autocomplete="new-password"
                :disabled="disabled"
                :placeholder="placeholder"
                :type="getType"
                :readonly="readonly"
                onkeypress="if(window.event.keyCode==13) this.blur()"
                @input="inputFn"
                @change="emit('change', modelValue)"
                @blur="blur"
                @focus="focus"
            />
            <label v-if="autoWidth" class="cun-input-auto-width">
                {{ modelValue }}
            </label>
            <div v-if="showPassword || clearable || showCount" class="cun-input-controls">
                <div
                    v-if="getCheckNumStr"
                    class="cun-input-count"
                    :class="{
                        'cun-input-count-clearable': clearable && modelValue
                    }"
                >
                    {{ getCheckNumStr }}
                </div>
                <div
                    v-if="showPassword && type === 'password'"
                    class="cun-input-show-password"
                    @mousedown.prevent=""
                    @click="showPasswordFn"
                >
                    <cun-icon v-show="_type === 'text'" :size="getIconSize" type="eye" />
                    <cun-icon v-show="_type === 'password'" :size="getIconSize" type="eye-off" />
                </div>
                <transition name="cun-form-icon-ani">
                    <cun-icon
                        v-if="clearable && modelValue && !readonly"
                        class="cun-form-icon-clear"
                        :class="{
                            'cun-form-icon-clear-focus': state.isFocus
                        }"
                        :size="getIconSize"
                        type="x"
                        @mousedown.prevent=""
                        @click="clear"
                    />
                </transition>
            </div>
        </div>
        <div
            v-if="suffix"
            v-tooltip="{
                content: suffixTooltip,
                trigger: suffixTooltip ? 'mouseenter' : ''
            }"
            class="cun-input-suffix"
        >
            <cun-text-trim
                v-if="suffix === 'text'"
                :text="suffixValue"
                class="cun-input-suffix-text"
            />
            <div v-if="suffix === 'icon'" class="cun-input-suffix-icon">
                <cun-icon :size="getIconSize" :type="suffixValue"> </cun-icon>
            </div>
            <div v-if="suffix === 'select'" class="cun-input-suffix-select">
                <cun-dropdown
                    placement="bottom"
                    trigger="click"
                    :options="suffixOptions"
                    @change="suffixChange"
                    @show="state.suffixDropdown = 'show'"
                    @hide="state.suffixDropdown = 'hide'"
                >
                    <cun-flex
                        gap="5px"
                        x="start"
                        class="cun-input-suffix-dropdown"
                        :class="{
                            'cun-input-suffix-dropdown-open': state.suffixDropdown === 'show'
                        }"
                    >
                        <cun-text-trim :text="getSuffixLabel" class="cun-input-suffix-text" />
                        <cun-icon :size="getIconSize" type="chevron-down" class="icon-select" />
                    </cun-flex>
                </cun-dropdown>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .cun-input-view {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        width: 100%;
        border-radius: var(--cun-border-radius-small);
        background-color: var(--cun-form-bgcolor);
        transition: var(--cun-form-transition);
        box-sizing: border-box;
        outline: 0px transparent solid;
        border: var(--cun-form-border-width) transparent solid;
        overflow: hidden;

        .cun-input-box {
            position: relative;
            width: 100%;
            box-sizing: border-box;
            display: inline-flex;
            align-items: center;
            .cun-input {
                height: 100%;
            }
        }
        .cun-input-copy-btn {
            position: absolute;
            display: flex;
            align-items: center;
            top: 50%;
            z-index: 2;
            transform: translateY(-50%);
            cursor: pointer;
            opacity: var(--cun-form-icon-opacity);
        }

        .cun-input-copy-btn:hover {
            opacity: var(--cun-form-icon-opacity-hover);
        }
        .cun-input-prefixes {
            border-right: rgba(0, 0, 0, 0.05) 1px solid;
        }
        .cun-input-suffix {
            border-left: rgba(0, 0, 0, 0.05) 1px solid;
        }
        .cun-input-prefixes,
        .cun-input-suffix {
            white-space: nowrap;
            user-select: none;
            display: inline-flex;
            align-items: center;

            .icon-select {
                transition: var(--cun-form-transition);
            }

            .icon-select-up {
                transform: rotate(180deg);
            }
        }

        .cun-input-prefixes-dropdown,
        .cun-input-suffix-dropdown {
            cursor: pointer;
        }

        .cun-input-prefixes-dropdown-open,
        .cun-input-suffix-dropdown-open {
            opacity: 0.4;

            .icon-select {
                transform: rotate(180deg);
            }
        }

        .cun-input-prefixes-icon {
            display: inline-flex;
            justify-content: center;
            align-items: center;
        }

        .cun-input-suffix-icon {
            display: inline-flex;
            justify-content: center;
            align-items: center;
        }

        .cun-input {
            width: 100%;
            text-overflow: ellipsis;
            border: none;
            background: none;
            color: var(--cun-text-color-1);
            outline: none;
            box-sizing: border-box;
        }

        .cun-input {
            overflow: hidden;
        }

        .cun-input::placeholder {
            color: rgb(165, 165, 165);
        }

        .cun-input-controls {
            display: inline-flex;
            align-items: center;

            > div {
                display: inline-flex;
                justify-content: center;
                align-items: center;
                white-space: nowrap;
                padding: 0px 4px;
            }

            .cun-input-count {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                opacity: var(--cun-form-icon-opacity);
                transition: transform 0.25s;
                z-index: 2;
            }

            .cun-input-show-password {
                opacity: var(--cun-form-icon-opacity);
                transition: all 0.25s;
                cursor: pointer;
            }

            .cun-input-show-password:hover {
                opacity: var(--cun-form-icon-opacity-hover);
            }
        }
    }

    .cun-input-view-align-left {
        .cun-input {
            text-align: left;
        }
    }

    .cun-input-view-align-center {
        .cun-input {
            text-align: center;
        }
    }

    .cun-input-view-align-right {
        .cun-input {
            text-align: right;
        }
    }

    .cun-input-view-autoWidth {
        position: relative;
        width: auto;

        .cun-input {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 0px;
            display: inline-block;
            width: 100%;
        }

        .cun-input-auto-width {
            width: auto;
            min-width: 45px;
            height: 100%;
            visibility: hidden;
            box-sizing: border-box;
        }
    }

    .cun-input-view-size-small {
        .cun-input-box {
            padding: var(--cun-form-input-padding-small);
            font-size: var(--cun-form-font-size-small);
            height: var(--cun-form-item-height-small);
            line-height: var(--cun-form-input-line-height-small);
        }
        .cun-input-prefixes,
        .cun-input-suffix,
        .cun-input-prefixes-dropdown,
        .cun-input-suffix-dropdown {
            height: var(--cun-form-item-height-small);
            line-height: var(--cun-form-input-line-height-small);
        }
        .cun-input-copy-btn {
            right: 7px;
        }
        .cun-input-prefixes-text,
        .cun-input-suffix-text {
            font-size: var(--cun-form-font-size-small);
            max-width: 80px;
        }
        .cun-input-prefixes,
        .cun-input-suffix {
            padding: 0px 7px;
        }

        .cun-input {
            font-size: var(--cun-form-font-size-small);
            height: var(--cun-form-item-height-small);
        }

        .cun-input-controls {
            height: var(--cun-form-item-height-small);

            .cun-input-count {
                font-size: 12px;
            }

            .cun-input-count-clearable {
                transform: translateX(-18px);
            }
        }

        .cun-input-auto-width {
            height: var(--cun-form-item-height-small);
            font-size: var(--cun-form-font-size-small);
            line-height: var(--cun-form-input-line-height-small);
        }
    }

    .cun-input-view-size-medium {
        .cun-input-box {
            padding: var(--cun-form-input-padding-medium);
            font-size: var(--cun-form-font-size-medium);
            line-height: var(--cun-form-input-line-height-medium);
            height: var(--cun-form-item-height-medium);
        }
        .cun-input-prefixes,
        .cun-input-suffix,
        .cun-input-prefixes-dropdown,
        .cun-input-suffix-dropdown {
            line-height: var(--cun-form-input-line-height-medium);
            height: var(--cun-form-item-height-medium);
            max-width: 100px;
        }
        .cun-input-copy-btn {
            right: 9px;
        }
        .cun-input-prefixes-text,
        .cun-input-suffix-text {
            font-size: var(--cun-form-font-size-medium);
            max-width: 100px;
        }
        .cun-input-prefixes,
        .cun-input-suffix {
            padding: 0px 9px;
        }
        .cun-input {
            font-size: var(--cun-form-font-size-medium);
            height: var(--cun-form-item-height-medium);
        }
        .cun-input-controls {
            height: var(--cun-form-item-height-medium);

            .cun-input-count {
                font-size: 13px;
            }

            .cun-input-count-clearable {
                transform: translateX(-18px);
            }
        }

        .cun-input-auto-width {
            height: var(--cun-form-item-height-medium);
            font-size: var(--cun-form-font-size-medium);
            line-height: var(--cun-form-input-line-height-medium);
        }
    }

    .cun-input-view-size-large {
        .cun-input-box {
            padding: var(--cun-form-input-padding-large);
            font-size: var(--cun-form-font-size-large);
            line-height: var(--cun-form-input-line-height-large);
            height: var(--cun-form-item-height-large);
        }
        .cun-input-prefixes,
        .cun-input-suffix,
        .cun-input-prefixes-dropdown,
        .cun-input-suffix-dropdown {
            line-height: var(--cun-form-input-line-height-large);
            height: var(--cun-form-item-height-large);
        }
        .cun-input-copy-btn {
            right: 12px;
        }
        .cun-input-prefixes-text,
        .cun-input-suffix-text {
            font-size: var(--cun-form-font-size-large);
            max-width: 120px;
        }
        .cun-input-prefixes,
        .cun-input-suffix {
            padding: 0px 12px;
        }
        .cun-input {
            font-size: var(--cun-form-font-size-large);
            height: var(--cun-form-item-height-large);
        }
        .cun-input-controls {
            height: var(--cun-form-item-height-large);

            .cun-input-count {
                font-size: 14px;
            }

            .cun-input-count-clearable {
                transform: translateX(-18px);
            }
        }

        .cun-input-auto-width {
            height: var(--cun-form-item-height-large);
            font-size: var(--cun-form-font-size-large);
            line-height: var(--cun-form-input-line-height-large);
        }
    }

    .cun-input-view-size-small.cun-input-view-autoWidth {
        .cun-input {
            left: 7px;
            width: calc(100% - 14px);
        }
    }
    .cun-input-view-size-medium.cun-input-view-autoWidth {
        .cun-input {
            left: 9px;
            width: calc(100% - 18px);
        }
    }
    .cun-input-view-size-large.cun-input-view-autoWidth {
        .cun-input {
            left: 12px;
            width: calc(100% - 24px);
        }
    }

    .cun-input-view:hover {
        background-color: var(--cun-form-bgcolor-hover);
    }

    .cun-input-view:focus-within {
        border: var(--cun-form-border-width) var(--cun-form-border-color-focus) solid;
        outline: var(--cun-form-ouline);
        background-color: var(--cun-form-bgcolor-focus);
    }

    .cun-input-view-readonly {
        user-select: text;
    }

    .cun-input-view-disabled {
        opacity: var(--cun-disabled-opacity);
        pointer-events: none; //鼠标点击不可修改
    }

    .cun-input-view-disabled:hover {
        border: var(--cun-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--cun-form-bgcolor);
    }

    .cun-input-view-disabled:active {
        border: var(--cun-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--cun-form-bgcolor);
    }

    .cun-input-view-disabled:focus-within {
        border: var(--cun-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--cun-form-bgcolor);
    }
</style>