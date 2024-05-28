<script setup lang="ts">
    import { CunIcon } from "cun-ui";
    import { objectClass, getColorType } from 'cun-ui/utils';
    import { buttonProps } from "./props";

    const emit = defineEmits(['click']);
    const props = defineProps(buttonProps);

    const _loading = ref(false);

    const handleClick = async (e: MouseEvent) => {
        if (props.disabled || _loading.value || props.loading) return;
        emit('click', e);
        if (typeof props.request === 'function') {
            if (_loading.value) {
                return;
            }
            _loading.value = true;
            await props.request();
            _loading.value = false;
        }
    };
    const instance = getCurrentInstance();
    const hasDefaultSlot = ref(false);

    if (instance?.slots.default) {
        hasDefaultSlot.value = true;
    }

    const getButtonClass = computed(() => {
        const { size, type, icon, text, color } = props;
        const loading = _loading.value || props.loading;
        const singleIcon = !!(!text && icon && !hasDefaultSlot.value);
        return objectClass('cun-button', {
            size,
            type,
            loading,
            singleIcon,
            color
        });
    });

    const getIconSize = computed(() => {
        const { size } = props;
        switch (size) {
            case 'small':
                return 12;
            case 'medium':
                return 14;
            case 'large':
                return 16;
            default:
                return 14;
        }
    });

    const getStyle = computed(() => {
        const { round, type, color } = props;
        const styleObj: Record<string, string> = {};
        const _color = getColorType(color) || 'primary';
        switch (type) {
            case 'fill':
                styleObj.backgroundColor = `var(--cun-color-${_color})`;
                styleObj.color = `var(--cun-color-white)`;
                break;
            case 'light':
                styleObj.backgroundColor = `var(--cun-color-${_color}-light)`;
                styleObj.color = `var(--xun-color-${_color}-dark)`;
                break;
            case 'ghost':
                styleObj.backgroundColor = 'transparent';
                styleObj.border = `1px solid var(--cun-color-${_color})`;
                styleObj.color = `var(--cun-color-${_color}-dark)`;
                styleObj.boxShadow = 'none';
                break;
            case 'text':
                styleObj.backgroundColor = 'transparent';
                styleObj.color = `var(--cun-color-${_color}-dark)`;
                styleObj.boxShadow = 'none';
                break;
            default:
                styleObj.backgroundColor = `var(--cun-color-${_color})`;
                break;
        }
        styleObj.borderRadius = round ? '50px' : 'none';
        return styleObj;
    })
</script>

<template>
    <button
        class="cun-button"
        :class="getButtonClass"
        :disabled="disabled"
        :style="getStyle"
        @click="handleClick"
    >
        <cun-icon v-if="icon" class="cun-button-icon" :size="getIconSize" :type="icon" />
        <cun-icon
            class="cun-loading-icon"
            :size="getIconSize"
            animation="spin"
            animation-speed="fast"
            :class="{
                'cun-loading-isShow': (_loading || loading) && !disabled
            }"
            type="loader"
        />
        <span v-if="$slots.default || text" class="cun-button-text">
            <template v-if="$slots.default">
                <slot/>
            </template>
            <template v-else>
                {{ text }}
            </template>
        </span>
    </button>
</template>

<style lang="scss" scoped>
    .cun-button {
        position: relative;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: relative;
        flex-shrink: 0;
        user-select: none;
        width: auto;
        white-space: nowrap;
        box-sizing: border-box;
        transition: transform 0.1s, color 0.35s cubic-bezier(0.65, 0, 0.25, 1),
            padding 0.15s cubic-bezier(0.65, 0, 0.25, 1);
        border: none;
        cursor: pointer;
        border-radius: var(--cun-border-radius-small);
        box-sizing: border-box;
        overflow: hidden;

        .cun-loading-icon {
            position: absolute;
            left: 10px;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }

        .cun-button-text {
            z-index: 2;
        }

        .cun-loading-isShow {
            opacity: 1;
        }
    }

    .cun-button::after {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000, $alpha: 0.2);
        transition: 0.1s all;
        opacity: 0;
        content: '';
    }

    .cun-button-color-black::after {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #fff, $alpha: 0.2);
        transition: 0.1s all;
        opacity: 0;
        content: '';
    }

    .cun-button-type-text.cun-button-color-black::after {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000, $alpha: 0.2);
        transition: 0.1s all;
        opacity: 0;
        content: '';
    }

    .cun-button-type-ghost::after {
        display: none;
    }

    .cun-button:hover:after {
        opacity: 0.4;
    }

    .cun-button:active {
        opacity: 1;
    }

    .cun-button:active::after {
        opacity: 1;
    }

    .cun-button-size-small {
        min-width: 50px;
        height: var(--cun-form-item-height-small);
        line-height: var(--cun-form-item-height-small);
        padding: 0px 8px;
        font-size: var(--cun-form-font-size-small);
        gap: 4px;

        .cun-loading-icon {
            left: 8px;
        }
    }

    .cun-button-size-medium {
        min-width: 60px;
        height: var(--cun-form-item-height-medium);
        line-height: var(--cun-form-item-height-medium);
        padding: 0px 14px;
        font-size: var(--cun-form-font-size-medium);
        gap: 6px;

        .cun-loading-icon {
            left: 10px;
        }
    }

    .cun-button-size-large {
        min-width: 70px;
        height: var(--cun-form-item-height-large);
        line-height: var(--cun-form-item-height-large);
        padding: 0px 20px;
        font-size: var(--cun-form-font-size-large);
        gap: 8px;

        .cun-loading-icon {
            left: 12px;
        }
    }

    .cun-button-size-small.cun-button-singleIcon {
        min-width: auto;
        padding: 0px;
        width: var(--cun-form-item-height-small);
        height: var(--cun-form-item-height-small);
    }

    .cun-button-size-medium.cun-button-singleIcon {
        min-width: auto;
        padding: 0px;
        width: var(--cun-form-item-height-medium);
        height: var(--cun-form-item-height-medium);
    }

    .cun-button-size-large.cun-button-singleIcon {
        min-width: auto;
        padding: 0px;
        width: var(--cun-form-item-height-large);
        height: var(--cun-form-item-height-large);
    }

    .cun-button.cun-button-loading.cun-button-singleIcon {
        padding: 0px;

        .cun-button-text {
            display: none;
        }

        .cun-button-icon {
            display: none;
        }

        .cun-loading-icon {
            position: static;
        }
    }

    .cun-button-loading {
        cursor: progress;
        padding-left: 0px;
    }

    .cun-button-size-small.cun-button-loading {
        padding-left: 24px;
    }

    .cun-button-size-medium.cun-button-loading {
        padding-left: 30px;
    }

    .cun-button-size-large.cun-button-loading {
        padding-left: 36px;
    }

    .cun-button-loading:active {
        transform: scale(1);
    }

    .cun-button[disabled] {
        pointer-events: none; //鼠标点击不可修改
        opacity: var(--cun-disabled-opacity);
    }
    .cun-button-type-ghost:hover {
        background-color: var(--cun-bgcolor-2) !important;
    }
    .cun-button-type-ghost:active {
        background-color: var(--cun-color-normal-light) !important;
    }
</style>
<style lang="scss">
    .cun-dark .cun-button-color-black.cun-button-type-fill {
        color: #000 !important;
    }
</style>
