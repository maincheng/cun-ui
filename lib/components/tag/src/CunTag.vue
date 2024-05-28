<script setup lang="ts">
    import { objectClass, getColorType } from 'cun-ui/utils';
    import { CunIcon } from 'cun-ui';
    import { tagProps } from './props';

    const props = defineProps(tagProps);
    const emit = defineEmits(['close']);
    const close = () => {
        if (props.disabled) {
            return;
        }
        emit('close');
    };

    const getSize = computed(() => {
        switch (props.size) {
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

    const tagClassName = computed(() => {
        const { size, disabled, color, type } = props;
        return objectClass('cun-tag', { size, disabled, color, type });
    });

    const getStyle = computed(() => {
        const { round, type, color } = props;
        const styleObj = {} as any;
        const _color = getColorType(color) || 'primary';
        switch (type) {
            case 'fill':
                styleObj.backgroundColor = `var(--cun-color-${_color})`;
                styleObj.color = `var(--cun-color-white)`;
                break;
            case 'light':
                styleObj.backgroundColor = `var(--cun-color-${_color}-light)`;
                styleObj.color = `var(--cun-color-${_color}-dark)`;
                break;
            case 'ghost':
                styleObj.backgroundColor = 'transparent';
                styleObj.border = `1px solid var(--cun-color-${_color})`;
                styleObj.color = `var(--cun-color-${_color}-dark)`;
                styleObj.boxShadow = 'none';
                break;
            default:
            case 'fill':
                styleObj.backgroundColor = `var(--cun-color-${_color})`;
                styleObj.color = `var(--cun-color-white)`;
                break;
        }
        styleObj.borderRadius = round ? '20px' : 'none';
        return styleObj;
    });

</script>

<template>
    <div class="cun-tag" :class="tagClassName" :style="getStyle">
        <div class="cun-tag-left">
            <slot name="left"></slot>
        </div>
        <div class="cun-tag-value">
            <slot></slot>
        </div>
        <div class="cun-tag-right">
            <slot name="right"></slot>
        </div>
        <div v-if="closable" class="cun-tag-close" @click.stop="close">
            <cun-icon :size="getSize" type="x" />
        </div>
    </div>
</template>

<style lang="scss">
    .cun-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--cun-border-radius-mini);
        user-select: none;
        box-sizing: border-box;
        overflow: hidden;
        flex-shrink: 0;
        .cun-tag-value {
            font-weight: normal;
            padding: 0px 3px;
            box-sizing: border-box;
            white-space: nowrap;
        }

        .cun-tag-close {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: var(--cun-border-radius-small);
            padding: 2px;
            margin-left: -3px;
            cursor: pointer;
        }

        .cun-tag-close:hover {
            background-color: rgba($color: #000, $alpha: 0.1);
        }

        .cun-tag-close:active {
            background-color: rgba($color: #000, $alpha: 0.2);
        }

        .cun-tag-left {
            margin-left: 3px;
            display: inline-flex;
            align-items: center;
            box-sizing: border-box;
        }

        .cun-tag-right {
            margin-right: 3px;
            display: inline-flex;
            align-items: center;
        }
    }

    .cun-tag-to {
        cursor: pointer;
    }

    .cun-tag-size-small {
        height: 20px;
        min-width: 20px;
        line-height: 20px;
        padding: 0px;
        font-size: 11px;

        .cun-tag-close {
            margin-left: -2px;
            font-size: 12px;
            margin-right: 4px;
        }

        .cun-tag-value {
            padding: 0px 4px;
        }
    }

    .cun-tag-bold {
        font-weight: bold;

        .cun-tag-value {
            font-weight: bold;
        }
    }

    .cun-tag-size-medium {
        height: 24px;
        min-width: 24px;
        line-height: 24px;
        padding: 0px 2px;
        font-size: 13px;

        .cun-tag-close {
            margin-left: -3px;
            font-size: 13px;
            margin-right: 2px;
        }

        .cun-tag-value {
            padding: 0px 4px;
        }
    }

    .cun-tag-size-large {
        height: 28px;
        min-width: 28px;
        line-height: 28px;
        padding: 0px 4px;
        font-size: 15px;

        .cun-tag-close {
            margin-left: -4px;
            font-size: 14px;
        }

        .cun-tag-value {
            padding: 0px 4px;
        }
    }

    .cun-tag-disabled {
        opacity: var(--cun-disabled-opacity);
        pointer-events: none;
    }
</style>
<style lang="scss">
    .cun-dark .cun-tag-color-black.cun-tag-type-fill {
        color: #000 !important;
    }
</style>