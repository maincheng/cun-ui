<script setup lang="ts">
    import { checkboxGroupProps } from './props';
    import type { CheckboxOptions } from './props';
    import { objectClass } from 'cun-ui/utils';
    import { CunCheckbox } from 'cun-ui';
    import _ from 'lodash';

    const props: any = defineProps(checkboxGroupProps as any);
    const emit = defineEmits(['change']);
    const modelValue: any = defineModel<string[] | number[] | undefined>({
        default: () => [],
        required: true
    });

    const checkList = ref([] as boolean[]);

    watch(
        () => modelValue.value,
        () => {
            initCheckbox();
        },
        {
            deep: true
        }
    );

    const change = ({item, checked}: {item: CheckboxOptions; checked: boolean}) => {
        let _value = modelValue.value || [];
        if (checked) {
            _value.push(item.value);
        } else {
            const index = _value.findIndex((e: any) => e === item.value);
            if (index >= 0) {
                _value.splice(index, 1);
            }
        }
        emit('change', {
            value: _.cloneDeep(_value),
            item: item
        });
        modelValue.value = _.cloneDeep(_value);
    };

    const initCheckbox = () => {
        checkList.value = props.options.map((item: CheckboxOptions) => {
            if (modelValue.value && modelValue.value.includes(item.value)) {
                return true;
            }
            return false;
        });
    };

    const getCheckboxGroupClassName = computed(() => {
        const { size, direction, readonly, disabled } = props as any;
        return objectClass('cun-checkbox-group', { size, direction, readonly, disabled });
    });

    initCheckbox();
</script>
<template>
    <cun-flex
        x="start"
        gap="15"
        :direction="direction"
        class="cun-checkbox-group"
        :class="getCheckboxGroupClassName"
    >
        <cun-checkbox
            v-for="(item, index) in options"
            :key="item.value"
            v-model="checkList[index]"
            :block="block"
            :iconable="iconable"
            :round="round"
            :size="size"
            :label="item.label"
            :disabled="item.disabled || disabled"
            @change="change({ item, checked: $event })"
        />
    </cun-flex>
</template>

<style lang="scss" scoped>
    .cun-checkbox-group {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    .cun-checkbox-group-size-small {
        min-height: var(--cun-form-item-height-small);
    }

    .cun-checkbox-group-size-medium {
        min-height: var(--cun-form-item-height-medium);
    }

    .cun-checkbox-group-size-large {
        min-height: var(--cun-form-item-height-large);
    }

    .cun-checkbox-group.cun-checkbox-group-direction-x {
        flex-direction: row;
    }

    .cun-checkbox-group.cun-checkbox-group-direction-y {
        align-items: flex-start;
        flex-direction: column;
    }
    .cun-checkbox-group-disabled {
        opacity: var(--cun-disabled-opacity);
        pointer-events: none;
    }
    .cun-checkbox-group-readonly {
        pointer-events: none;
    }
</style>