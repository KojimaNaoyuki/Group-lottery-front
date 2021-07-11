<template>
    <input class="tg" type="text" :placeholder="placeholder">
</template>

<script>
export default {
    props: ["placeholder"]
}
</script>

<style scoped>
.tg {
    width: 70%;
    padding: 0 5px;
    background-color: transparent;
    border: none;
    border-bottom: solid 2px #525252;
    outline: none !important;
    transition: all 0.4s;
}
.tg:hover {
    border-bottom: solid 2px #3f51b5;
}
</style>