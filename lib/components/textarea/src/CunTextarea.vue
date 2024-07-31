<script setup lang="ts">
    import { useMagicKeys } from '@vueuse/core';
    import { objectClass, any2px } from 'cun-ui/utils';
    import { CunIcon, CunToolTip } from 'cun-ui';
    import { textareaProps } from './props';
    
    const { shift, enter } = useMagicKeys();
    // 获取app
    const app = getCurrentInstance()?.appContext.app;
    if (app && !app.directive('tooltip')) {
        app.use(CunToolTip);
    }
    const cunTextareaRef = ref();
    const emit = defineEmits([
        'update:type',
        'clear',
        'blur',
        'input',
        'focus',
        'change',
        'textarea',
        'ok'
    ]);

    const props = defineProps(textareaProps);
    const modelValue: any = defineModel();
    const state = reactive({
        isFocus: false
    });

    const updateValue = () => {
        if (props.maxLength && props.renderCount(modelValue.value) >= Number(props.maxLength)) {
            modelValue.value = modelValue.value.slice(0, props.maxLength);
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
        cunTextareaRef.value?.focus();
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

    const getTextareaClassNames = computed(() => {
        const { size, readonly, disabled } = props;
        return objectClass('cun-textarea-view', {
            size,
            readonly,
            disabled
        });
    });

    const focus = (e: any) => {
        if (props.focusSelect) {
            e?.currentTarget?.select();
        }
        state.isFocus = true;
        emit('focus');
    };

    const blur = () => {
        emit('blur', modelValue);
        state.isFocus = false;
    };

    const getIconSize = computed(() => {
        const size: any = {
            small: 12,
            medium: 14,
            large: 16
        };
        return size[props.size];
    });

    const getTextareaStyle = computed(() => {
        const { width, height } = props;
        return `width:${any2px(width)};height:${any2px(height)};`;
    });
    if (props.okByEnter) {
        watchEffect(() => {
            if (shift.value && enter.value) {
            } else if (enter.value && state.isFocus && modelValue.value) {
                cunTextareaRef.value?.blur();
                emit('ok', modelValue.value);
            }
        });
    }
    defineExpose({ toFocus }); 
</script>

<template>
    <div class="cun-textarea-view" :style="getTextareaStyle" :class="getTextareaClassNames">
        <textarea
            ref="cunTextareaRef"
            v-model="modelValue"
            class="cun-textarea cun-scrollbar"
            :disabled="disabled"
            :readonly="readonly"
            :placeholder="placeholder"
            @input="inputFn"
            @change="emit('change', modelValue)"
            @blur="blur"
            @focus="focus"
        />

        <div v-if="getCheckNumStr && showCount" class="cun-textarea-count">
            {{ getCheckNumStr }}
        </div>
        <transition name="cun-form-icon-ani">
            <cun-icon
                v-if="clearable && modelValue && !readonly"
                class="cun-form-icon-clear"
                :class="{
                    'cun-form-icon-clear-focus': state.isFocus
                }"
                :size="getIconSize"
                style="top: 14px"
                type="x"
                @mousedown.prevent=""
                @click="clear"
            />
        </transition>
    </div>
</template>

<style lang="scss" scoped>
    .cun-textarea-view {
        display: inline-flex;
        position: relative;
        overflow: hidden;
        width: 100%;
        border-radius: var(--cun-border-radius-small);
        background-color: var(--cun-form-bgcolor);
        transition: var(--cun-form-transition);
        box-sizing: border-box;
        outline: 0px transparent solid;
        border: var(--cun-form-border-width) transparent solid;

        .cun-textarea {
            width: 100%;
            height: 100%;
            text-overflow: ellipsis;
            border: none;
            background: none;
            color: var(--cun-text-color-1);
            outline: none;
            box-sizing: border-box;
            resize: none;
        }

        .cun-textarea::placeholder {
            color: rgb(165, 165, 165);
        }

        .cun-textarea-count {
            position: absolute;
            right: 7px;
            bottom: 2px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            opacity: var(--cun-form-icon-opacity);
            transition: opacity 0.25s;
            z-index: 2;
            user-select: none;
        }
    }
    .cun-textarea-view-size-small {
        .cun-textarea {
            padding: var(--cun-form-input-padding-small);
            font-size: var(--cun-form-font-size-small);
            line-height: var(--cun-form-input-line-height-small);
        }

        .cun-textarea {
            min-height: var(--cun-form-item-height-small);
        }

        .cun-textarea-count {
            font-size: 12px;
        }
    }

    .cun-textarea-view-size-medium {
        .cun-textarea {
            padding: var(--cun-form-input-padding-medium);
            font-size: var(--cun-form-font-size-medium);
            line-height: var(--cun-form-input-line-height-medium);
        }

        .cun-textarea {
            min-height: var(--cun-form-item-height-medium);
        }

        .cun-textarea-count {
            font-size: 13px;
        }
    }

    .cun-textarea-view-size-large {
        .cun-textarea {
            padding: var(--cun-form-input-padding-large);
            font-size: var(--cun-form-font-size-large);
            line-height: var(--cun-form-input-line-height-large);
        }

        .cun-textarea {
            min-height: var(--cun-form-item-height-large);
        }

        .cun-textarea-count {
            font-size: 14px;
        }
    }

    .cun-textarea-view-textarea {
        position: relative;
        flex-direction: column;
        justify-content: center;
    }

    .cun-textarea-view {
        .resize-btn {
            position: absolute;
            right: 0px;
            bottom: 0px;
            width: 10px;
            height: 10px;
            border-radius: 4px;
            content: '';
            z-index: 9;
            opacity: 1;
            display: none;
        }
    }

    .cun-textarea-view-resize-both {
        .resize-btn {
            display: block;
            cursor: nwse-resize;
        }
    }

    .cun-textarea-view-resize-vertical {
        .resize-btn {
            display: block;
            cursor: row-resize;
        }
    }

    .cun-textarea-view-resize-horizontal {
        .resize-btn {
            display: block;
            cursor: col-resize;
        }
    }

    .cun-textarea-view:hover {
        background-color: var(--cun-form-bgcolor-hover);
    }

    .cun-textarea-view:focus-within {
        border: var(--cun-form-border-width) var(--cun-form-border-color-focus) solid;
        outline: var(--cun-form-ouline);
        background-color: var(--cun-form-bgcolor-focus);

        .cun-textarea-controls {
            background: var(--cun-form-bgcolor-focus);
        }
    }

    .cun-textarea-view-readonly {
        user-select: text;
        pointer-events: none; //鼠标点击不可修改
    }

    .cun-textarea-view-disabled {
        opacity: var(--cun-disabled-opacity);
        pointer-events: none; //鼠标点击不可修改
    }

    .cun-textarea-view-disabled:hover {
        border: var(--cun-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--cun-form-bgcolor);
    }

    .cun-textarea-view-disabled:active {
        border: var(--cun-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--cun-form-bgcolor);
    }

    .cun-textarea-view-disabled:focus-within {
        border: var(--cun-form-border-width) rgba(0, 0, 0, 0) solid;
        background-color: var(--cun-form-bgcolor);
    }
</style>