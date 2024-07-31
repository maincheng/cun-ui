import { ExtractPropTypes } from 'vue';

export const textareaModel = {
    // 绑定值
    modelValue: {
        // 父组件 v-model 没有指定参数名，则默认是 modelValue
        type: String,
        default: '',
        description: '绑定值'
    }
};

export const textareaProps = {
    size: {
        type: String,
        default: 'medium',
        description: '尺寸，可选值为 small、medium、large'
    },
    focusSelect: {
        type: Boolean,
        default: false,
        description: '是否聚焦选中文本'
    },
    // 禁用
    disabled: {
        type: Boolean,
        default: false,
        description: '是否禁用'
    },
    // 是否使用清空按钮
    clearable: {
        type: Boolean,
        default: false,
        description: '是否使用清空按钮'
    },
    // 默认提示语
    placeholder: {
        type: String,
        default: '请输入',
        description: '默认提示语'
    },
    // 是否只读
    readonly: {
        type: Boolean,
        default: false,
        description: '是否只读'
    },
    maxLength: {
        type: [Number, String],
        default: '',
        description: '最大长度'
    },
    showCount: {
        type: Boolean,
        default: false,
        description: '是否显示输入字数统计'
    },
    renderCount: {
        type: Function,
        default: (value: string) => {
            return value?.length || 0;
        },
        description: '自定义计数器'
    },
    width: {
        type: [Number, String],
        default: '',
        description: '宽度'
    },
    height: {
        type: [Number, String],
        default: '',
        description: '高度'
    },
    okByEnter: {
        type: Boolean,
        default: false,
        description: '是否按回车键确认（当开启时，按下shift+enter可以进行换行）'
    }
};
export type TextareaProps = ExtractPropTypes<typeof textareaProps>;
