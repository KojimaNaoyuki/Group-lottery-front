<template>
    <header class="header">
        <div class="header-title-back"></div>
        <div class="header-title-wrap">
            <h1 class="header-title">Group Lottery</h1>
        </div>
        <div class="header-drawer-meny">
            <DrawerMenyIcon />
        </div>
    </header>
</template>

<script>
import DrawerMenyIcon from './DrawerMenyIcon.vue';

export default {
    components: {
        DrawerMenyIcon
    }
}
</script>

<style scoped>
.header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    padding: 0;
    background-color: #4f7776;
}
.header-title {
    font-size: 26px;
}
.header-title-wrap {
    width: 200px;
    height: 55px;
    padding: 5px 10px;
    background-color: #69b5a3;
}
.header-title-back {
    position: absolute;
    top: 0;
    left: 0;
    /* width: 240px; */
    width: 70%;
    height: 55px;
    transform:skewX(-30deg);
    background-color: #69b5a3;
    z-index: -100;
}
.header-drawer-meny {
    padding: 0 10px;
}
</style>