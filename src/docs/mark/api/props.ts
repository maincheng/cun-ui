import { markProps } from "cun-ui";
import { convertProps } from "@/lib/utils";
 export default {
    title: 'Props',
    columnsKey: 'props',
    orderNum: 10,
    data: convertProps(markProps)
 }