<template>
    <div class="box">
        <h2 class="group-name">Group Name</h2>
        <div class="card">
            <h3 class="card-title">TitleTitle</h3>
            <h4 class="card-day">期限： 2021/06/29</h4>
            <Btn text="投票"/>
            <div class="card-status">受付中</div>
        </div>
        <div class="card">
            <h3 class="card-title">TitleTitle</h3>
            <h4 class="card-day">期限： 2021/06/29</h4>
            <Btn text="投票"/>
            <div class="card-status">受付中</div>
        </div>
    </div>
</template>

<script>
import Btn from './../../components/presentational/atoms/Btn.vue';
export default {
    layout: 'main',
    components: {
        Btn
    }
}
</script>

<style scoped>
.group-name {
    padding: 20px 0;
    text-align: center;
    font-size: 22px;
}
.card {
    position: relative;
    padding: 20px 0;
    margin: 0 auto 30px auto;
    width: 80%;
    background-color: #95afa0;
    text-align: center;
    border-radius: 8px;
}
.card:last-child {
    margin: 0 auto
}
.card-title {
    margin: 0 auto;
    width: 80%;
    padding: 5px 0;
    font-size: 20px;
    border-bottom: solid 2px #808080;
}
.card-day {
    padding: 25px 0;
    font-size: 16px;
    font-weight: 600;
}
.card-status {
    position: absolute;
    right: 10px;
    bottom: 5px;
    color: brown;
    font-size: 16px;
    font-weight: bold;
}
</style>