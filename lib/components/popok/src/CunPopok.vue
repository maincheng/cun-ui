<script setup lang="ts">
    import { CunButton, CunPopover } from 'cun-ui';
    import { any2px } from 'cun-ui/utils';
    import { popokProps } from './props';

    const props = defineProps(popokProps);

    const cunPopoverRef = ref();

    const ok = () => {
        if (!props.okProps.request) {
            hide();
        }
        emit('ok');
    };

    const cancel = () => {
        if (!props.cancelProps.request) {
            hide();
        }
        emit('cancel');
    };

    const hide = () => {
        cunPopoverRef.value.hide();
    };
    defineExpose({ hide });

    const emit = defineEmits(['show', 'ok', 'cancel']);
</script>

<template>
    <cun-popover
        ref="cunPopoverRef"
        class="cun-popok"
        :trigger="trigger"
        :placement="placement"
        @show="emit('show')"
    >
        <template #trigger>
            <slot />
        </template>
        <template #popover-body>
            <div
                class="cun-popok-body"
                :style="{
                    width: any2px(width)
                }"
            >
                <div class="left">
                    <div :class="`icon-${type}`">
                        <cun-icon
                            v-if="type === `normal`"
                            size="22"
                            type="light"
                            color="blue"
                        ></cun-icon>
                        <cun-icon
                            v-if="type === `warning`"
                            size="22"
                            type="alert-triangle"
                        ></cun-icon>
                        <cun-icon v-if="type === `success`" size="22" type="check"></cun-icon>
                        <cun-icon v-if="type === `error`" size="22" type="alert-circle"></cun-icon>
                        <cun-icon v-if="type === `info`" size="22" type="bell"></cun-icon>
                    </div>
                </div>
                <div class="right">
                    <div v-if="title" class="title">{{ title }}</div>
                    <div v-if="content" class="content">{{ content }}</div>
                    <div class="footer">
                        <cun-button
                            v-bind="{ 
                                type: 'text', 
                                text: '取消',
								round: true,
								color: 'normal',
								size: 'small',
                                ...cancelProps as any,
                            }"
                            @click="cancel"
                        />
                        <cun-button
                            v-bind="{  
                                text: '确定',   
                                color: 'primary',  
								round: true,
								size: 'small',
                                ...okProps as any, 
                            }"
                            @click="ok"
                        />
                    </div>
                </div>
            </div>
        </template>
    </cun-popover>
</template>

<style lang="scss" scoped>
    .cun-popok {
        display: inline-block;
    }

    .cun-popok-body {
        display: flex;
        padding: 15px;

        .left {
            width: 30px;
            margin-right: 5px;

            .icon-success {
                color: var(--cun-color-success-dark);
            }

            .icon-warning {
                color: var(--cun-color-warning-dark);
            }

            .icon-normal {
                color: var(--cun-color-normal-dark);
            }

            .icon-info {
                color: var(--cun-color-info-dark);
            }

            .icon-error {
                color: var(--cun-color-error-dark);
            }
        }

        .right {
            width: calc(100% - 30px);

            .title {
                width: 100%;
                font-weight: 600;
                margin-bottom: 5px;
            }

            .content {
                width: 100%;
                font-size: 14px;
                margin-bottom: 10px;
            }

            .footer {
                width: 100%;
                display: flex;
                justify-content: end;

                .cun-button {
                    margin-left: 10px;
                }
            }
        }
    }
</style>