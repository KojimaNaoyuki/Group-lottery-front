<template>
    <header class="header">
        <div class="header-inner">
            <h1 class="header-title">Group <span>Selector</span></h1>
            <div class="header-drawer-meny" @click="clickedFnMenu">
                <DrawerMenyIcon />
            </div>
        </div>
    </header>
</template>

<script>
import DrawerMenyIcon from './DrawerMenyIcon.vue';

export default {
    components: {
        DrawerMenyIcon
    },
    methods: {
        clickedFnMenu: function() {
            this.$emit('clickedFnMenu');
        }
    }
}
</script>

<style scoped>
.header {
    width: 100%;
    position: fixed;
    z-index: 50;
}
.header-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 0 5px;
    background-color: transparent;
}
.header-title {
    font-size: 24px;
}
.header-title > span {
    color: #25449c;
}
.header-drawer-meny {
    padding: 0 10px;
}
</style>