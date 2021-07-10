<template>
    <div class="list-open-icon">{{text}}</div>
</template>

<script>
export default {
    props: ["text"]
}
</script>

<style scoped>
.list-open-icon {
    margin-right: 15px;
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 2px solid #3f51b5;
    border-radius: 50%;
    
    line-height: 22px;
    text-align: center;
    font-size: 24px;
    color: #3f51b5;
}
</style>