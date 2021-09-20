<template>
    <button class="tg" @click="clickedFn">{{text}}</button>
</template>

<script>
export default {
    props: ["text"],
    methods: {
        clickedFn: function() {
            this.$emit('clickedFn');
        }
    }
}
</script>

<style scoped>
.tg {
    padding: 2px 40px;
    background-color: #2382ce;
    border: none;
    border-bottom: solid 3px #53609e;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 2px;
    border-radius: 3px;
    color: #0f1b11;
}
.tg:hover {
    cursor: pointer;
}
</style>