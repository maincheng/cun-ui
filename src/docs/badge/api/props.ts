import { badgeProps } from "cun-ui";
import { convertProps } from "@/lib/utils";

export default {
    title: 'Props',
    columnsKey: 'props',
    data: convertProps(badgeProps)
}