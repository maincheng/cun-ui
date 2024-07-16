<script setup lang="ts">
    import type { CSSProperties } from 'vue';
    import { useClipboard } from '@vueuse/core';
    const props = defineProps({
        title: {
            type: String,
            default() {
                return '';
            }
        },
        tag: {
            type:String,
            default() {
                return '';
            }
        },
        code: {
            type: String,
            default() {
                return '';
            }
        },
        codeType: {
            type: String,
            default() {
                return '';
            }
        }
    });

    const isShowCode = ref(false);

    const style = computed<CSSProperties>(() => {
        if (isShowCode.value) {
            return { maxHeight: '10000px'}
        }
        return { maxHeight: 0, borderTop: 'none' }
    });

    const { copy, isSupported } = useClipboard();
    const copyCode = () => {
        if (!isSupported) {
            CunMessage.error('您的浏览器不支持Clipboard API');
            return;
        }
        if (props.code) {
            copy(props.code);
            CunMessage.success('复制成功');
        }
};
</script>

<template>
    <div class="demo-box">
        <cun-title :id="title" :size="18" class="demo-docs-title"
        >{{ title }}
            <cun-tag v-if="tag" type="light" color="blue" style="margin: 2px 0px 0px 5px;">
                {{ tag }}
            </cun-tag>
        </cun-title>
        <div class="demo-item">
            <div class="demo-cp cun-scrollbar">
                <slot></slot>
            </div>
            <div v-if="code" class="hl-pre cun-scrollbar" :style="style">
                <div class="code-header">
                    <cun-flex
                        gap="10"
                        direction="x"
                        x="end"
                        class="copy-box"
                    >
                        <span class="code-type">{{ codeType }}</span>
                        <cun-icon 
                        :type="'clipboard'" 
                        stroke-width="1"
                        v-tooltip="{
                            content: '点击复制',
                            placement: 'bottom',
                            trigger: 'mouseenter'
                        }"
                        @click="copyCode"
                        class="copy-icon" />
                    </cun-flex>
                </div>
                <div class="pre-box">
                    <highlightjs autodetect :code="code" />
                </div>
            </div>
            <div class="show-bar" @click="isShowCode = !isShowCode">
                <div class="icon">
                    <cun-icon v-if="!isShowCode" :size="16" type="chevron-down" />
                    <cun-icon v-else :size="16" type="chevron-up" />
                </div>
                {{ isShowCode ? '关闭' : '显示源码' }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .demo-box {
        margin: 50px 0 50px 0;

        .demo-item {
            margin: 10px 0px;
            background-color: var(--cun-bgcolor-0);
            border-radius: var(--cun-border-radius-small);
            box-shadow: var(--cun-box-shadow);
            overflow: hidden;
        }

        .demo-docs-title {
            text-transform: capitalize;
        }
        .hl-pre {
            position: relative;
            overflow-y: auto;
            overflow-x: hidden;
            border-top: var(--cun-border-1);

            .code-header {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 10px;
            background-color: var(--cun-bgcolor-1);
            border-bottom: var(--cun-border-1);

            .code-type {
                font-size: 14px;
                color: #666;
            }

            .copy-box {
                width: 45px;
                border-radius: var(--cun-border-radius-small);
                transition: all 0.15s;

                .copy-icon {
                    cursor: pointer;
                }

                .name {
                    white-space: nowrap;
                    color: #999;
                }
            }
            .copy-button {
                background-color: #007bff;
                color: #fff;
                border: none;
                padding: 5px 10px;
                border-radius: 4px;
                cursor: pointer;
                transition: background-color 0.3s;

                &:hover {
                    background-color: #0056b3;
                }
            }
        }

            .pre-box {
                border-radius: var(--cun-border-radius-small);
            }
        }

        .show-bar {
            display: flex;
            justify-content: center;
            align-items: center;
            border-top: var(--cun-border-1);
            width: 100%;
            height: 30px;
            font-size: 14px;
            cursor: pointer;
            color: #999;
            background-color: var(--cun-bgcolor-1);

            .icon {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 10px;
            }
        }

        .show-bar:hover {
            background-color: var(--cun-bgcolor-3);
            color: var(--cun-text-color-3);
        }

        .demo-cp {
            width: 100%;
            overflow-x: auto;
            box-sizing: border-box;
            padding: 30px;
        }

        @media (max-width: 767px) {
            .demo-cp {
                overflow-x: auto;
            }
        }
    }
</style>