<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import CunSiderbar from '../layout/CunSiderbar.vue';
    import type { MenuOptions } from '../../lib';

    const isShowSider = ref(false);
    const route = useRoute();
    const mainRef: any = ref(null);
    
    onMounted(() => {
        const isInfo = localStorage.getItem('isInfo');
        // if (!isInfo) {
        //     CunDialog.info({
        //         title: '温馨提示',
        //         content:
        //             '当前组件库仍处于开发测试状态，请勿用于生产环境，当前文档仍有很多地方未完善，持续更新中，敬请期待。',
        //         cancelText: '',
        //         okText: '知道了',
        //         ok: () => {
        //             localStorage.setItem('isInfo', '1');
        //         }
        //     });
        // }
    });

    watch(route, () => {
        setTimeout(() => {
            if (mainRef.value) mainRef.value.scrollTop = 0;
        }, 50);
        isShowSider.value = false;
    });

    const options = ref<MenuOptions[]>([]);
    options.value = [
        {
            label: '基础',
            value: '基础',
            children: [
                {
                    label: 'Avatar',
                    value: '/Avatar'
                },
                {
                    label: 'Button',
                    value: '/Button'
                },

                {
                    label: 'Tag',
                    value: '/Tag'
                },
                {
                    label: 'Badge',
                    value: '/Badge'
                },
                {
                    label: 'Title',
                    value: '/Title'
                },
                {
                    label: 'TextTrim',
                    value: '/TextTrim'
                },
                {
                    label: 'Flex',
                    value: '/Flex'
                },
                {
                    label: 'Mark',
                    value: '/Mark'
                },
                {
                    label: 'Icon',
                    value: '/icon'
                }
            ]
        },

        {
            label: '导航',
            value: '导航',
            children: [
                {
                    label: 'BackTop',
                    value: '/BackTop'
                },
                {
                    label: 'Menu',
                    value: '/Menu',
                    tagText: 'New',
                    tagColor: 'success'
                },

            ]
        },

        {
            label: '反馈',
            value: '反馈',
            children: [
                {
                    label: 'Message',
                    value: '/Message'
                },
            ]
        }
    ]
</script>

<template>
    <div class="container">
        <div 
            class="mb-btn"
            :class="{ 'mb-btn-open': isShowSider }"
            @click="isShowSider = !isShowSider"
        >
            <cun-icon type="menu" size="24px" />
        </div>
        <div class="sider" :class="{ 'sider-open': isShowSider }">
            <cun-siderbar :options="options" />
        </div>
        <div ref="mainRef" class="app-main cun-scrollbar">
            <div id="component-main" class="component-main cun-scrollbar">
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <Component :is="Component"> </Component>
                    </keep-alive>
                </router-view>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .container {
        height: calc(100vh - 60px);
        display: flex;
    }

    .sider {
        position: fixed;
        top: 59px;
        height: calc(100vh - 58px);
        background-color: var(--cun-bgcolor-0);
    }

    .app-main {
        margin-left: var(--cun-siderbar-width);
        width: calc(100% - var(--cun-siderbar-width));
        height: calc(100vh - 60px);
        background: var(--cun-bgcolor-2);
        display: flex;
        box-sizing: border-box;

        .component-main {
            width: calc(100% - 200px);
            height: 100%;
            overflow-y: auto;
            overflow-x: hidden;
            box-sizing: border-box;
            padding: 50px 50px 150px 50px;
            scroll-behavior: smooth;
        }

        .component-nav {
            height: 100%;
            width: 200px;
        }
    }

    .mb-btn {
        display: none;
    }

    @media (max-width: 767px) {
        .mb-btn {
            position: fixed;
            left: 0px;
            top: 59px;
            z-index: 99;
            display: inline-flex;
            align-items: center;
            background-color: var(--cun-color-primary);
            padding: 5px 7px;
            color: #fff;
            transition: all 0.85s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .mb-btn-open {
            transform: translateX(var(--cun-siderbar-width));
        }

        .sider {
            transform: translateX(-100%);
            transition: transform 0.85s cubic-bezier(0.65, 0, 0.35, 1);
            z-index: 99999;
        }

        .sider-open {
            transform: translateX(0%);
        }

        .app-main {
            width: 100%;
            margin-left: 0px;

            .component-main {
                width: 100%;
                padding: 50px 15px;
            }

            .component-nav {
                display: none;
            }
        }
    }
</style>