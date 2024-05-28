<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

</script>

<template>
    <div class="home-wrapper">
        <div class="startbox">
            <div class="slogan">
                少就是
                <div class="dm">
                    <div class="text"><span>多</span> <span>美</span></div>
                </div>
            </div>
            <p>一个 Vue 3 组件库</p>
            <cun-button
                text="Get started"
                style="margin-top: 20px;" 
                @click="router.push('/Button')"/>
            
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .home-wrapper {
        width: 100%;
        perspective: 800;
        overflow: hidden;
        -webkit-perspective: 800;
        
        .startbox {
            // position: fixed;
            left: 50px;
            top: 50px;
            z-index: 99;
            animation: start 3s ease;
            animation-fill-mode: forwards;
            animation-delay: 0.5s;
            opacity: 0;

            .slogan {
                display: flex;
                font-size: 50px;
                font-weight: 900;
                cursor: pointer;

                .dm {
                    width: 50px;
                    overflow: hidden;

                    .text {
                        display: flex;
                        transition: all 0.5s ease;
                    }
                }
            }

            .startbutton {
                border-radius: 8px;
                border: 1px solid transparent;
                padding: 0.6em 1.2em;
                font-size: 1em;
                font-weight: 500;
                font-family: inherit;
                background-color: rgb(78, 129, 211);
                cursor: pointer;
                transition: border-color 0.25s;
            }
            .startbutton:hover {
                border-color: #a1a5fd;
            }

            .slogan:hover {
                .text {
                    transform: translateX(-100%);
                }
            }
        }

        .home {
            min-height: 100vh;
            box-sizing: border-box;
            animation: demo 3s ease;
            transform: scale(1) rotateX(0deg) rotateY(0deg);
            animation-fill-mode: forwards;
            animation-delay: 0.5s;
            opacity: 0;
            margin-top: -50px;

            .item {
                flex-shrink: 0;
                width: 350px;
                height: calc(100vh - 70px);
            }
        }

        @keyframes demo {
            from {
                opacity: 0;
                transform: scale(0.8) rotateX(0deg) rotateY(0deg);
            }

            to {
                opacity: 1;
                transform: scale(1.2) rotateX(15deg) rotateY(-15deg);
            }
        }

        @keyframes start {
            from {
                opacity: 0;
                transform: translateY(15%);
            }

            to {
                opacity: 1;
                transform: translateY(0%);
            }
        }
    }
</style>