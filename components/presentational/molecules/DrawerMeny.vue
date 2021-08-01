<template>
    <div class="drawer-menu">
        <ul class="drawer-menu-list">
            <NuxtLink to="/"><li class="drawer-menu-list-li"><img src="~/assets/img/home.png" class="drawer-menu-img">トップページ</li></NuxtLink>
            <li class="drawer-menu-list-li" @click="toLotteryList"><img src="~/assets/img/lottery.png" class="drawer-menu-img">抽選一覧</li>
            <li class="drawer-menu-list-li" @click="toSetting"><img src="~/assets/img/setting.png" class="drawer-menu-img">管理画面</li>
        </ul>
    </div>
</template>

<script>
import firebase from '~/plugins/firebase';
export default {
    methods: {
        toLotteryList: function() {
            //抽選一覧へ
            if(this.$route.params.groupId != undefined) {
                this.$router.replace('/LotteryList/' + this.$route.params.groupId);
            } else {
                alert('グループに参加していません');
            }
        },
        toSetting: function() {
            //管理画面へ
            firebase.auth().onAuthStateChanged(user => {
                if(!user) {
                    //ログインされていない
                    alert("ログインされていません");
                } else {
                    if(this.$route.params.groupId != undefined) {
                        this.$router.replace('/ManagementPage/' + this.$route.params.groupId);
                    } else {
                        alert('グループに参加していません');
                    }
                }
            });
        }
    }
}
</script>


<style scoped>
a {
    text-decoration: none;
}

.drawer-menu {
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    height: 0vh;
    width: 201px;
    padding: 20px 0 20px 20px;
    background-color: #35495e;
    opacity: 0;
    z-index: 100;
    transition: all 0.6s;
}

.drawer-menu-open .drawer-menu {
    visibility: visible;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 201px;
    padding: 20px 0 20px 20px;
    background-color: #35495e;
    opacity: .9;
    z-index: 100;
    transition: all 0.6s;
}
.drawer-menu-list {
    list-style: none;
}
.drawer-menu-list-li {
    display: flex;
    align-items: center;
    padding: 20px 0;
    font-size: 16px;
    font-weight: normal;
    color: #e2e2e2;
}
.drawer-menu-img {
    display: block;
    margin-right: 10px;
    width: 25px;
}
</style>