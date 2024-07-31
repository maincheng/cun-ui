import '../styles/index.scss';
import { useTimeoutFn } from '@vueuse/core';

export type NotificationParamsTyped = {
    title: string;
    content: string;
    delay?: number;
};

export type NotificationFn = (options: NotificationParamsTyped) => void;

export interface NotificationInstance {
    name: string;
    warning: NotificationFn;
    info: NotificationFn;
    normal: NotificationFn;
    success: NotificationFn;
    error: NotificationFn;
}

const warning = ({ title, content, delay = 3000 }: NotificationParamsTyped) => {
    notification('warning', title, content, delay);
};

const error = ({ title, content, delay = 3000 }: NotificationParamsTyped) => {
    notification('error', title, content, delay);
};

const info = ({ title, content, delay = 3000 }: NotificationParamsTyped) => {
    notification('info', title, content, delay);
};

const normal = ({ title, content, delay = 3000 }: NotificationParamsTyped) => {
    notification('normal', title, content, delay);
};

const success = ({ title, content, delay = 3000 }: NotificationParamsTyped) => {
    notification('success', title, content, delay);
};

const createMessageList = () => {
    const div: HTMLDivElement = document.createElement('div');
    div.setAttribute('id', 'cun-notification');
    document.body.appendChild(div);
};

const notification = (type: string, title: string, content: string, delay: number) => {
    if (!document.getElementById('cun-notification')) {
        createMessageList();
        notification(type, title, content, delay);
    } else {
        add(type, title, content, delay);
    }
};

const add = (type: string, title: string, content: string, delay: number) => {
    const CunMessageDom = document.getElementById('cun-notification');
    const newMessage = document.createElement('div');
    const svgArr: any = {
        success:
            '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check vue-feather__content"><polyline points="20 6 9 17 4 12"></polyline></svg>',
        warning:
            '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-triangle vue-feather__content"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
        error: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle vue-feather__content"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
        normal: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info vue-feather__content"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
        info: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell vue-feather__content"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',
        close: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x vue-feather__content"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
    };

    newMessage.innerHTML = `
                <div class="cun-notification-box"> 
                    <div class="cun-notification-icon">
                      ${svgArr[type]}
                    </div>
                    <div class="cun-notification-body">
                      <div class="cun-notification-title">${title}</div>
                      ${content ? `<div class="cun-notification-content">${content}</div>` : ''}
                    </div> 
                    <div class="cun-notification-close-icon">                      ${svgArr.close}
                    </div>
                </div>
    `;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    CunMessageDom?.insertBefore(newMessage, CunMessageDom?.childNodes[0]);

    newMessage.setAttribute('class', `cun-notification cun-notification-${type}`);

    let timer: (() => void) | undefined;
    let lock = false; // 加上锁 避免 点击关闭和鼠标移出事件重叠 bug

    function startTimer() {
        if (delay > 0) {
            ({ stop: timer } = useTimeoutFn(() => {
                handleClose();
            }, delay));
        }
    }

    function clearTimer() {
        timer?.();
    }

    function handleClose() {
        if (lock) {
            return;
        }
        lock = true;

        newMessage.setAttribute(
            'class',
            `cun-notification cun-notification-${type} cun-notification-hidden`
        );
        if (newMessage) {
            if (CunMessageDom) {
                setTimeout(() => {
                    CunMessageDom.removeChild(newMessage);
                }, 250);
            }
        }
    }

    newMessage.children[0].children[2].addEventListener('click', handleClose);
    newMessage.addEventListener('mouseenter', clearTimer);
    newMessage.addEventListener('mouseleave', startTimer);

    setTimeout(() => {
        lock = false;
        newMessage.setAttribute(
            'class',
            `cun-notification cun-notification-${type} cun-notificatishow`
        );
        delay > 0 && startTimer();
    }, 10);
};

export default {
    name: 'CunNotification',
    warning,
    info,
    normal,
    success,
    error
} as NotificationInstance;
