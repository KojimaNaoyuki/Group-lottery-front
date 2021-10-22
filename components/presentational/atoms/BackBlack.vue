<template>
    <div class="back"></div>
</template>

<style scoped>
.back {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.4;
    z-index: 100;
}
.start-ms-open .back {
    display: block;
}
</style>