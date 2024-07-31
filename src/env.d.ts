/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module 'highlight.js';
declare const hljs;
declare module 'cun-ui';
declare const CunMessage;
declare const CunDialog;
declare module '@/lib/utils';
declare const CunNotification: typeof import('../lib/directives')['CunNotification'];