<script setup lang="ts">
    import { objectClass } from 'cun-ui/utils';
    import { checkboxProps } from './props';

    const props = defineProps(checkboxProps);

    const emit = defineEmits(['change']);
    const modelValue: any = defineModel<Boolean>({
        default: false
    });

    const setChecked = (e: Event) => {
        const { checked } = e.target as HTMLInputElement;
        emit('change', checked);
        modelValue.value = checked;
    };

    const getIconSize = computed(() => {
        const { size } = props;
        switch (size) {
            case 'small':
                return 9;
            case 'medium':
                return 11;
            case 'large':
                return 13;
            default:
                return 11;
        }
    });

    const getCheckboxClassName = computed(() => {
        const { block, round, iconable, size, disabled, certain, readonly } = props;
        const checked = modelValue.value || props.checked;
        const unicon = !iconable && block;

        return objectClass('cun-checkbox', {
            block,
            round,
            size,
            checked,
            unicon,
            disabled,
            certain,
            readonly
        });
    });
</script>
<template>
    <label class="cun-checkbox" :class="getCheckboxClassName">
        <div v-if="iconable || (!iconable && !block)" class="icon-checkbox-box">
            <i v-show="certain" class="icon-certain"></i>
            <cun-icon stroke-width="4" class="icon-checkbox" type="check" :size="getIconSize" />
        </div>
        <input v-show="false" type="checkbox" :checked="modelValue" @change="setChecked" />
        <span v-if="label" class="cun-checkbox-label"> {{ label }}</span>
    </label>
</template>

<style lang="scss" scoped>
    .cun-checkbox {
        display: inline-flex;
        align-items: center;
        user-select: none;
        cursor: pointer;
        color: var(--cun-text-color-1);
        font-size: 14px;
        transition: var(--cun-form-transition);
        white-space: nowrap;
        box-sizing: border-box;

        .icon-checkbox-box {
            position: relative;
            width: 18px;
            height: 18px;
            border: var(--cun-form-border-width) var(--cun-checkbox-border-color) solid;
            box-sizing: border-box;
            border-radius: 6px;
            transition: var(--cun-form-transition);
            background-color: var(--cun-bgcolor-1);
            outline: 0px var(--cun-checkbox-color-light) solid;
            overflow: hidden;

            .icon-checkbox {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, calc(-50% + 10px)) rotate(-10deg) scale(0.2);
                transform-origin: 50%;
                transition: var(--cun-form-transition);
                opacity: 0;
                color: var(--cun-color-white);
            }
        }

        .cun-checkbox-label {
            margin-left: 6px;
        }
    }

    .cun-checkbox-size-small {
        font-size: 13px;

        .icon-checkbox-box {
            width: 14px;
            height: 14px;
            border-radius: 4px;
        }
    }

    .cun-checkbox-size-medium {
        font-size: 14px;

        .icon-checkbox-box {
            width: 16px;
            height: 16px;
            border-radius: 5px;
        }
    }

    .cun-checkbox-size-large {
        font-size: 15px;

        .icon-checkbox-box {
            width: 18px;
            height: 18px;
            border-radius: 6px;
        }
    }

    .cun-checkbox-unicon.cun-checkbox-block {
        padding: 4px 12px;
        .cun-checkbox-label {
            margin-left: 0px;
        }
    }

    .cun-checkbox-unicon.cun-checkbox-checked.cun-checkbox-block {
        .cun-checkbox-label {
            color: var(--cun-checkbox-color);
        }
    }

    .cun-checkbox:hover {
        .icon-checkbox-box {
            border: var(--cun-form-border-width) var(--cun-checkbox-border-color-hover) solid;
            outline: var(--cun-form-ouline);
            background: var(--cun-form-bgcolor);
        }
    }

    .cun-checkbox-block {
        background: var(--cun-checkbox-block-color);
        padding: 3px 8px 3px 4px;
        border: var(--cun-form-border-width) rgba(0, 0, 0, 0) solid;
        border-radius: var(--cun-border-radius-small);
        .icon-checkbox-box {
            .icon-checkbox {
                padding: 1px;
            }
        }
        .cun-checkbox-label {
            margin-left: 4px;
        }
    }

    .cun-checkbox-checked.cun-checkbox-block {
        border: var(--cun-form-border-width) var(--cun-checkbox-color) solid;
        background: var(--cun-checkbox-color-light);
        color: var(--cun-checkbox-color);
    }

    .cun-checkbox-checked.cun-checkbox-block:hover {
        border: var(--cun-form-border-width) var(--cun-checkbox-color) solid;
        background: var(--cun-checkbox-color-light);
    }

    .cun-checkbox-round {
        border-radius: 50px;

        .icon-checkbox-box {
            border-radius: 50%;
        }
    }

    .cun-checkbox-block:hover {
        background: var(--cun-form-bgcolor-hover);
        .icon-checkbox-box {
            border: var(--cun-form-border-width) var(--cun-checkbox-border-color-hover) solid;
        }
    }

    .cun-checkbox-checked {
        .icon-checkbox-box {
            border: var(--cun-form-border-width) var(--cun-checkbox-color) solid;
            background: var(--cun-checkbox-color);

            .icon-checkbox {
                transform: translate(-50%, -50%) rotate(0deg) scale(1);
                opacity: 1;
            }
        }
    }

    .cun-checkbox-checked:hover {
        .icon-checkbox-box {
            border: var(--cun-form-border-width) var(--cun-checkbox-color) solid;
            background: var(--cun-checkbox-color);
        }
    }

    .cun-checkbox-block.cun-checkbox-checked {
        .icon-checkbox-box {
            border: var(--cun-form-border-width) transparent solid;
            background: transparent;

            .icon-checkbox {
                color: var(--cun-checkbox-color);
                opacity: 1;
            }
        }
    }

    .cun-checkbox-block.cun-checkbox-checked:hover {
        .icon-checkbox-box {
            border: var(--cun-form-border-width) transparent solid;
        }
    }

    .cun-checkbox-disabled {
        opacity: var(--cun-disabled-opacity);
        pointer-events: none; //鼠标点击不可修改
    }

    .cun-checkbox-readonly {
        pointer-events: none; //鼠标点击不可修改
    }

    .cun-checkbox-certain {
        .icon-checkbox-box {
            border: var(--cun-form-border-width) var(--cun-checkbox-color) solid;
            background: var(--cun-checkbox-color);
            .icon-certain {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 60%;
                height: 2px;
                border-radius: 2px;
                background-color: var(--cun-color-white);
            }
        }
    }
    .cun-checkbox-certain:hover {
        .icon-checkbox-box {
            border: var(--cun-form-border-width) var(--cun-checkbox-color) solid;
            background: var(--cun-checkbox-color);
        }
    }
</style>