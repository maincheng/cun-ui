import _ from 'lodash';

//type: The type of message to display in the tooltip.
export const getIconType = (type: string | undefined): string => {
    const map = {
        normal: 'info',
        warning: 'alert-triangle',
        success: 'check',
        error: 'alert-circle',
        info: 'bell'
    };
    // @ts-ignore
    return map[type] || 'info';
};
// type: The type of message to display in the tooltip.
export const getColorType = (type: string | undefined): string => {
    const typeMap = {
        normal: 'gray',
        warning: 'orange',
        success: 'green',
        error: 'red',
        danger: 'red',
        info: 'blue',
        primary: 'blue'
    };
    // @ts-ignore
    return typeMap[type] || type;
};
export const objectClass = (prefix: string, props: Object) => {
    let className = '';
    for (const [key, value] of Object.entries(props)) {
        if (typeof value === 'boolean' && value) {
            className += ` ${prefix}-${key}`;
        } else if (typeof value === 'string') {
            className += ` ${prefix}-${key}-${value}`;
        }
    }
    return className;
}
export const numFormat = (num: number) => {
    const str = num.toString().split('.');
    let integerPart = str[0];
    const decimalPart = str[1] ? `.${str[1]}` : '';
    const reg = /(\d+)(\d{3})/;
    while (reg.test(integerPart)) {
        integerPart = integerPart.replace(reg, '$1' + ',' + '$2');
    }
    return integerPart + decimalPart;
};

export const any2px = (value: number | string | undefined): string => {
    if (!value) {
        return '';
    }

    const autoRegex = /^auto$/i;
    const calcRegex = /^calc\((.+)\)$/;
    const percentRegex = /^-?\d+(\.\d+)?%$/;
    const pixelRegex = /^-?\d+(\.\d+)?(px)?$/;
    const numericRegex = /^-?\d+(\.\d+)?$/;

    const _value = String(value);

    if (_value.startsWith('calc')) {
        return _value;
    }

    if (numericRegex.test(_value)) {
        return `${value}px`;
    }
    if (autoRegex.test(_value)) {
        return _value;
    }
    if (percentRegex.test(_value)) {
        return _value;
    }
    if (calcRegex.test(_value)) {
        return _value;
    }
    if (pixelRegex.test(_value)) {
        return `${_value}`;
    }
    const numValue = parseFloat(_value);
    if (!isNaN(numValue)) {
        return `${numValue}px`;
    }

    return '';
};

/** @func 生成uid */
let uid = 1;
export function genUid(): number {
    return Date.now() + uid++;
}

export const CunSetForm = ({
    formRef,
    params
}: {
    formRef: any;
    params: any;
}) => {
    let timeout = 0;
    const _fn = () => {
        timeout += 10;
        if (formRef && formRef.value) {
            formRef.value.setForm(params);
        } else {
            setTimeout(() => {
                _fn()
            }, timeout);
        }
    };
    _fn();
};

export type Tree = {
    label: string;
    value: string;
    labelPaths?: string[];
    valuePaths?: string[];
    level: number;
    isLeaf?: boolean;
    loading?: boolean;
    disabled?: boolean;
    parentLabelPaths?: string[];
    parentValuePaths?: string[];
    parentValue?: string;
    parentLabel?: string;
    children?: Tree[];
    _key: string;
};

export const getUUId = () => {
    // 生成一个随机字符串作为UUID的前缀
    const randomString =
        Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // 使用Lodash的_.uniqueId()方法生成UUID
    const uuid = _.uniqueId(randomString);
    return uuid;
};
