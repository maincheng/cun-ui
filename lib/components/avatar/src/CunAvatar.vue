<script setup lang="ts">
    import { useImage } from '@vueuse/core';
    import { objectClass } from 'cun-ui/utils';
    import { avatarProps } from './props';
    import { any2px } from 'cun-ui/utils';

    const props = defineProps(avatarProps);
    const { isLoading } = useImage({ src: props.src });
    const isError = ref(false);

    const imgSrc = computed(() => {
        return isError.value ? props.errorSrc : new URL(props.src, import.meta.url).href;
    });

    const dotClassName = computed(() => {
        return objectClass('dot', {
            status: props.status,
            statusPosition: props.statusPosition
        });
    });

    const avatarClassName = computed(() => {
        return objectClass('cun-avatar', {
            round: props.round,
            skeletons: isLoading.value
        });
    });

    const avatarStyleObject = computed(() => {
        return {
            width: any2px(props.width),
            height: any2px(props.height)
        };
    });
</script>

<template>
    <div class="cun-avatar" :style="avatarStyleObject">
        <div class="cun-avatar-box" :class="avatarClassName">
            <span v-if="isLoading" class="skeletons"> </span>
            <img :src="imgSrc" :alt="alt" :onerror="() => (isError = true)" lazy />
        </div>
        <span v-if="status" class="dot" :class="dotClassName"> </span>
    </div>
</template>

<style lang="scss" scoped>
    .cun-avatar {
        position: relative;
        display: inline-block;

        .cun-avatar-box {
            width: 100%;
            height: 100%;
            border-radius: var(--cun-border-radius-small);
            overflow: hidden;
            background-color: #eee;
        }

        img {
            width: 100%;
            height: 100%;
            background-color: var(--cun-bgcolor-2);
            border-radius: var(--cun-border-radius-small);
        }

        .dot {
            position: absolute;
            top: -0.3rem;
            left: -0.3rem;
            content: '';
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 50%;
            z-index: 99;
            border: 2px var(--cun-color-white) solid;
        }

        .dot-status-online {
            background-color: var(--cun-color-success);
        }

        .dot-status-busy {
            background-color: var(--cun-color-error);
        }

        .dot-status-offline {
            background-color: var(--cun-color-normal-dark);
        }

        .dot-status-processing {
            background-color: var(--cun-color-info);
        }

        .dot-status-away {
            background-color: var(--cun-color-warning);
        }

        .dot-statusPosition-top-left {
            top: -0.25rem;
            left: -0.25rem;
        }

        .dot-statusPosition-top-right {
            top: -0.25rem;
            left: auto;
            right: -0.25rem;
        }

        .dot-statusPosition-bottom-left {
            top: auto;
            bottom: -0.25rem;
            left: -0.25rem;
        }

        .dot-statusPosition-bottom-right {
            top: auto;
            bottom: -0.25rem;
            left: auto;
            right: -0.25rem;
        }
    }
    .cun-avatar-round.cun-avatar-box {
        border-radius: 50%;
    }
</style>