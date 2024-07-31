<script setup lang="ts">
    import { inputTagProps } from './props';
    import { CunInput, CunTag } from 'cun-ui';
    import _ from 'lodash';
    const emit = defineEmits(['close', 'change']);

    defineProps(inputTagProps);
    const tagsValue: any = defineModel<string[]>();
    const inputValue = ref();
    const isInput = ref(false);
    const cunInputRef = ref();
    let isEnter = false;

    let delDownTimer: any;
    let delDownCheck = 0;

    const openInput = () => {
        isInput.value = true;
        nextTick(() => {
            cunInputRef.value.toFocus();
        });
        document.onkeydown = function (event) {
            if (inputValue.value === '') {
                if (event.keyCode === 8 || event.keyCode === 46) {
                    clearTimeout(delDownTimer);
                    delDownTimer = setTimeout(() => {
                        delDownCheck = 0;
                    }, 500);
                    delDownCheck += 1;
                    if (delDownCheck >= 2) {
                        tagsValue.value.splice(tagsValue.value.length - 1, 1);
                        emit('change', _.cloneDeep(tagsValue.value));
                        delDownCheck = 0;
                    }
                }
            } else if (event.keyCode === 13) {
                isEnter = true;
            }
        };
    };

    const blurFn = () => {
        isInput.value = false;
        document.onkeydown = null;
        addTag();
        if (isEnter) {
            openInput();
        }
        isEnter = false;
    };

    const addTag = () => {
        let _value = tagsValue.value || [];
        if (inputValue.value) {
            _value.push(inputValue.value);
        }
        inputValue.value = '';
        tagsValue.value = _value;
        emit('change', _value);
    };

    const delTag = (index: number) => {
        tagsValue.value.splice(index, 1);
        emit('change', tagsValue.value);
        emit('close', tagsValue.value);
    };
</script>

<template>
    <div class="cun-input-tag-view">
        <div style="margin-left: -10px; height: 26px"></div>
        <TransitionGroup name="list">
            <cun-tag
                v-for="(item, index) in tagsValue"
                :key="index"
                type="light"
                closable
                @close="delTag(index)"
                >{{ item }}
            </cun-tag>
        </TransitionGroup>
        <label v-if="!isInput" class="cun-input-tag-button" @click="openInput">
            <cun-icon :size="16" type="plus" />
        </label>
        <cun-input
            v-else
            ref="cunInputRef"
            v-model="inputValue"
            class="cun-input-tag"
            size="small"
            auto-width
            placeholder=""
            @blur="blurFn"
        />
    </div>
</template>

<style lang="scss" scoped>
    .cun-input-tag-view {
        display: inline-flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        border: var(--cun-form-border-width solid rgba(0, 0, 0, 0));

        .cun-input-tag {
            height: 26px;
            flex-shrink: 1;

            ::v-deep input {
                height: 26px;
            }
        }
    }

    .cun-input-tag-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        height: 26px;
        width: 65px;
        box-sizing: border-box;
        border-radius: var(--cun-border-radius-small);
        background-color: var(--cun-bgcolor-0);
        color: var(--cun-text-color-8);
        border: var(--cun-text-color-8) var(--cun-form-border-width) dashed;
    }

    .cun-input-tag-button:hover {
        color: var(--cun-color-primary);
        border: var(--cun-color-primary) var(--cun-form-border-width) dashed;
    }

    .list-enter-active,
    .list-leave-active {
        transition: all 0.15s ease-in-out;
    }

    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateX(-5px);
    }
</style>