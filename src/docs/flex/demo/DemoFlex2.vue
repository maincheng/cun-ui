<template>
    <div>
        <div class="demo">
            <cun-flex direction="y" x="start" y="start">
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
            </cun-flex>
            <cun-flex direction="y" x="center" y="start">
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
            </cun-flex>
            <cun-flex direction="y" x="end" y="start">
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
            </cun-flex>
        </div>
        <div class="demo">
            <cun-flex direction="y" x="start" y="center">
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
            </cun-flex>
            <cun-flex direction="y" x="center" y="center">
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
            </cun-flex>
            <cun-flex direction="y" x="end" y="center">
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
            </cun-flex>
        </div>
        <div class="demo">
            <cun-flex direction="y" x="start" y="end">
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
            </cun-flex>
            <cun-flex direction="y" x="center" y="end">
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
            </cun-flex>
            <cun-flex direction="y" x="end" y="end">
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
                <div class="box"><div></div></div>
            </cun-flex>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .demo {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .cun-flex {
        border: 1px var(--cun-bgcolor-2) solid;
        border-radius: var(--cun-border-radius-small);
        background-color: var(--cun-bgcolor-1);
        margin-bottom: 20px;
        width: 200px;
        height: 200px;
        padding: 5px;
        box-sizing: border-box;
        margin: 10px;
    }
    .box {
        box-sizing: border-box;
        > div {
            display: inline-block;
            padding: 10px;
            font-size: 14px;
            border-radius: var(--cun-border-radius-small);
            background-color: var(--cun-color-primary);
        }
    }
</style>