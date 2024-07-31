<script setup lang="ts">
    import { any2px } from 'cun-ui/utils';
    import { CunPopover } from 'cun-ui';
    import { dropdownProps } from './props';
    import type { DropdownOptions } from './props';

    defineProps(dropdownProps);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cunPopoverRef = ref();

    const show = () => {
        cunPopoverRef.value.show();
    }

    const hide = () => {
        cunPopoverRef.value.hide();
    }

    const emit = defineEmits(['change']);

    const change = (item: DropdownOptions) => {
        emit('change', item);
        hide();
    }

    defineExpose({ show, hide });
</script>

<template>
    <cun-popover
        ref="cunPopoverRef"
        popover-body-class-name="cun-dropdown-popover-body"
        :trigger="trigger"
        :placement="placement"
    >
        <template #trigger>
            <slot />
        </template>
        <template #popover-body>
            <div
                v-if="options.length > 0"
                class="cun-dropdown-body cun-scrollbar"
                :style="{
                    width: any2px(width),
                    maxHeight: any2px(maxHeight)
                }"
            >
                <div
                    v-for="(item, index) in options"
                    :key="index"
                    class="cun-dropdown-option"
                    :style="`text-align:${align}`"
                    @click="change(item)"
                >
                    {{ item.label }}
                </div>
            </div>
        </template>
    </cun-popover>
</template>

<style lang="scss" scoped>
    .cun-dropdown-body {
        display: flex;
        flex-direction: column;
        user-select: none;
        overflow: auto;
        box-sizing: border-box;
        .cun-dropdown-option {
            padding: 4px 10px;
            font-size: 14px;
            border-radius: 6px;
            color: var(--cun-text-color-1);
            cursor: pointer;
            white-space: nowrap;
            box-sizing: border-box;
        }
        .cun-dropdown-option:hover {
            color: var(--cun-text-color-0);
            background-color: var(--cun-backdrop-bg-active);
        }
    }
</style>
<style>
    .cun-dropdown-popover-body {
        padding: 6px;
    }
</style>