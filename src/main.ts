import { createApp } from 'vue'
import router from "./router/index";
import App from './App.vue'
import HljsVuePlugin from '@highlightjs/vue-plugin';

import 'cun-ui/styles/reset.scss'
import 'cun-ui/styles/var.scss'
import 'cun-ui/styles/main.scss'

import '@/assets/style/main.scss';
import 'highlight.js/styles/atom-one-dark.css';
import 'highlight.js/lib/common';
import '@/assets/style/hljs.scss';

import cun from '../lib';
const app = createApp(App);

//代码高亮指令
app.directive('highlight', {
    mounted(el) {
        const blocks = el.querySelectorAll('pre code');
        blocks.forEach((block: unknown) => {
            hljs.highlightBlock(block);
        })
    }
})

app.use(cun);
app.use(HljsVuePlugin);
app.use(router).mount('#app');
