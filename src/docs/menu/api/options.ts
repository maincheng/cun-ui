type MenuOptions = {
    label: string; //标题
    value?: string; //值
    children?: MenuOptions[];
    disabled?: boolean; //是否禁用
    level?: number; //层级
    icon?: string;
    tagText?: string;
    tagColor?: string;
};

export default {
    title: 'Props',
    columnsKey: 'props',
    data: [
        {
            name: 'label',
            description: '标题',
            type: 'string',
            default: "''"
        },
        {
            name: 'value',
            description: '值',
            type: 'string',
            default: "''"
        },
        {
            name: 'children',
            description: '禁用',
            type: 'MenuOptions[]',
            default: '[]'
        },
        {
            name: 'disabled',
            description: '禁用',
            type: 'boolean',
            default: 'false'
        },
        {
            name: 'icon',
            description: '图标类型',
            type: 'string',
            default: "''"
        },
        {
            name: 'tagText',
            description: '标签文本',
            type: 'string',
            default: "''"
        },
        {
            name: 'tagColor',
            description: '标签颜色',
            type: 'string',
            default: "''"
        }
    ]
}