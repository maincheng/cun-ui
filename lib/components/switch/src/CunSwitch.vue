<script setup lang="ts">
    import { switchProps } from './props';
    const props = defineProps(switchProps);
    const _loading = ref(false);

    const modelValue = defineModel<boolean>();
    const emit = defineEmits(['click', 'change']);

    const handleClick = async (e: any) => {
        if (props.disabled || _loading.value || props.loading) return;
        emit('click', e);
        if (typeof props.request === 'function') {
            if (_loading.value) {
                return;
            }
            _loading.value = true;
            const isSuccess = await props.request(!modelValue.value);
            if (isSuccess) {
                modelValue.value = !modelValue.value;
                _loading.value = false;
            }
            _loading.value = false;
        } else {
            modelValue.value = !modelValue.value;
        }
        emit('change', modelValue.value);
    };
</script>

<template>
    <div
        class="cun-switch-view"
        :class="`
            ${round ? 'cun-switch-round' : ''}
            ${modelValue ? 'cun-switch-checked' : ''}
            ${_loading || loading ? 'cun-switch-loading' : ''}
            ${request ? 'cun-switch-request' : ''}
        `"
        @click="handleClick"
    >
        <input v-show="false" v-model="modelValue" type="checkbox" :disabled="disabled" />
        <div class="cun-switch-dot"></div>
    </div>
</template>

<style lang="scss" scoped>
    .cun-switch-view {
        position: relative;
        display: block;
        width: 38px;
        height: 24px;
        background: var(--cun-bgcolor-3);
        border-radius: var(--cun-border-radius-small);
        transition: var(--cun-form-transition);
        cursor: pointer;
        outline: 0px var(--cun-color-primary-light) solid;

        .cun-switch-dot {
            position: absolute;
            width: 16px;
            height: 16px;
            left: 0px;
            top: 0px;
            border-radius: 4px;
            background: var(--cun-color-white);
            transition: var(--cun-form-transition);
            transform: translate(4px, 4px);
        }

        .cun-switch-dot::after {
            position: absolute;
            left: 50%;
            top: 50%;
            user-select: none;
            transform: translate(-50%, -50%);
            content: '';
            animation: cun-loading-spinner-spin 0.65s linear infinite;
            border-radius: 50%;
        }
        input:checked + .cun-switch-dot {
            background: #fff;
            transform: translate(18px, 4px);
        }
        input:checked + .cun-switch-dot:after {
            transform: translate(-100%);
        }
    }

    @keyframes cun-loading-spinner-spin {
        0% {
            transform: translate(-50%, -50%) rotate(0deg);
        }

        100% {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }

    .cun-switch-loading {
        cursor: progress;

        .cun-switch-dot::after {
            border: 2px solid rgba(0, 0, 0, 0);
            border-left: 2px solid var(--cun-color-primary);
            width: 10px;
            height: 10px;
        }
    }

    .cun-switch-round {
        border-radius: 20px;

        .cun-switch-dot {
            border-radius: 50px;
        }
    }

    .cun-switch-view:hover {
        background: var(--cun-bgcolor-4);
        outline: var(--cun-form-ouline);
    }

    .cun-switch-view:active {
        background: var(--cun-bgcolor-5);

        .cun-switch-dot {
            width: 20px;
        }
    }

    .cun-switch-view.cun-switch-checked {
        background: var(--cun-color-primary);
    }

    .cun-switch-view.cun-switch-checked:hover {
        background: var(--cun-color-primary);
    }

    .cun-switch-view.cun-switch-checked:active {
        background: var(--cun-color-primary);

        .cun-switch-dot {
            width: 20px;
            transform: translate(14px, 4px);
        }
    }

    .cun-switch-view.cun-switch-request {
        .cun-switch-dot {
            width: 16px;
            transform: translate(4px, 4px);
        }
    }

    .cun-switch-view.cun-switch-checked.cun-switch-request {
        .cun-switch-dot {
            width: 16px;
            transform: translate(18px, 4px);
        }
    }
</style>