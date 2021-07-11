<template>
    <button class="drawer-meny-icon">
        <span></span>
        <span></span>
        <span></span>
    </button>
</template>

<style scoped>
.drawer-meny-icon {
    background-color: transparent;
    border: none;
    outline: none !important;
    cursor: pointer;
}
.drawer-meny-icon > span {
    margin-top: 10px;
    width: 35px;
    height: 2px;
    display: block;
    background-color: #3e4b94;
    transition: transform 0.7s;
}
.drawer-meny-icon:first-child {
    margin: 0;
}

.drawer-meny-icon-open .drawer-meny-icon > span:nth-child(1) {
    transform: translateY(12px) rotate(-135deg);
}
.drawer-meny-icon-open .drawer-meny-icon > span:nth-child(2) {
    transform: scale(0);
}
.drawer-meny-icon-open .drawer-meny-icon > span:nth-child(3) {
    transform: translateY(-12px) rotate(135deg);
}
</style>