<script setup lang="ts">
    import { PropType } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import type { MenuOptions } from '../../lib';

    const route = useRoute();
    const router = useRouter();

    defineProps({
        options: {
            type: Array as PropType<MenuOptions[]>,
            default() {
                return [];
            }
        }
    });

    const toPath = (item: MenuOptions) => {
        if (item.tagText === 'Coming soon') {
            CunMessage.info('敬请期待!');
            return;
        }
        router.push(item.value as string);
        actived.value = item.value as string;
    }
    let actived = ref(route.path);
</script>

<template>
    <div class="siderbar cun-scrollbar">
        <cun-menu :options="options" :actived="actived" @change="toPath" />
    </div>
</template>

<style lang="scss" scoped>
    .siderbar {
        width: var(--cun-siderbar-width);
        height: calc(100vh - 60px);
        min-height: calc(100vh - 60px);
        overflow-y: auto;
        border-right: var(--cun-border-1);
        user-select: none;
        padding: 30px 10px;
        box-sizing: border-box;
    }
</style>