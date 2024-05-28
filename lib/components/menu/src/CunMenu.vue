<script setup lang="ts">
    import { watchDebounced } from '@vueuse/core';
    import { CunTextTrim, CunTag } from 'cun-ui';
    import { menuProps, MenuOptions } from './props';

    const props = defineProps(menuProps);
    const emit = defineEmits(['change']);

    const generateEnterpriseMenu = (menuData: MenuOptions[], level = 1): MenuOptions[] => {
        return menuData.map((item) => {
            const { children } = item;
            const menuItem: MenuOptions = {
                ...item,
                level
            };

            if (level < 3 && children && children.length > 0) {
                menuItem.children = generateEnterpriseMenu(children, level + 1);
            }
            return menuItem;
        })
    };

    const watchOptions = { deep: true, debounce: 250, maxWait: 1000 };
    const _options = ref<MenuOptions[]>([]);
    watchDebounced(
        () => props.options,
        () => {
            _options.value = generateEnterpriseMenu(props.options);
        },
        watchOptions
    );
    _options.value = generateEnterpriseMenu(props.options);
</script>

<template>
    <div class="cun-menu">
        <template v-for="item in _options" :key="item.label">
            <div class="cun-menu-item">
                <cun-text-trim :text="item.label" />
                <cun-tag v-if="item.tagText" :color="item.tagColor" round size="small" type="light">
                    {{ item.tagText }}
                </cun-tag>
            </div>
             <template v-for="(cItem, index) in item.children" :key="cItem.label">
                <div
                    class="cun-menu-item cun-menu-item-child"
                    :class="{
                        'cun-menu-item-last': item.children && index === item.children.length - 1,
                        'cun-menu-item-actived': cItem.value === actived
                    }"
                    @click="emit('change', cItem)"
                >
                    <cun-icon
                        v-if="cItem.icon"
                        class="cun-menu-icon"
                        :type="cItem.icon"
                        size="14"
                    ></cun-icon>
                    <cun-text-trim :text="cItem.label" />
                    <cun-tag
                        v-if="cItem.tagText"
                        :color="cItem.tagColor"
                        round
                        size="small"
                        type="light"
                    >{{ cItem.tagText }}
                    </cun-tag>
                </div>
            </template>
        </template>
    </div>
</template>

<style lang="scss" scoped>
    .cun-menu {
        display: flex;
        flex-direction: column;
        gap: 4px;
        border-radius: 4px;
        padding: 2px 6px;
        margin: 0px 3px;
        box-decoration-break: clone;
        -webkit-box-decoration-break: clone;
        height: auto;
        max-width: 300px;

        .cun-menu-item {
            display: flex;
            align-items: center;
            gap: 10px;
            color: var(--cun-text-color-8);
            height: 28px;
            line-height: 28px;
            font-size: 12px;
            font-weight: 400;
            padding: 0px 15px;
            box-sizing: border-box;
        }
        .cun-menu-item-child {
            color: var(--cun-text-color-1);
            font-size: 14px;
            height: 40px;
            line-height: 40px;
            cursor: pointer;
            border-radius: var(--cun-border-radius-small);
        }
        .cun-menu-icon {
            flex-shrink: 0;
        }
        .cun-menu-item-child:hover {
            background-color: var(--cun-bgcolor-2);
            color: var(--cun-text-color-1);
        }
        .cun-menu-item-actived {
            background-color: var(--cun-color-primary-light);
            color: var(--cun-color-primary-dark);
        }
        .cun-menu-item-actived:hover {
            background-color: var(--cun-color-primary-light);
            color: var(--cun-color-primary-dark);
        }
        .cun-menu-item-last {
            margin-bottom: 20px;
        }
    }
</style>