<template>
    <button class="tg">{{text}}</button>
</template>

<script>
export default {
    props: ["text"]
}
</script>

<style scoped>
.tg {
    padding: 2px 40px;
    background-color: #2382ce;
    border: none;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 2px;
    border-radius: 3px;
    color: #0f1b11;
}
</style>