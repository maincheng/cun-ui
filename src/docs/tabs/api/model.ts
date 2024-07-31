import { tabsModel } from 'cun-ui';
import { convertProps } from '@/lib/utils';

export default {
    title: 'Model',
    columnsKey: 'model',
    orderNum: 10,
    data: convertProps(tabsModel)
};
