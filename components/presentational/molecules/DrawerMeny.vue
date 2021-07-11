<template>
    <div class="drawer-menu">
        <ul class="drawer-menu-list">
            <li><img src="~/assets/img/home.png" class="drawer-menu-img">トップページ</li>
            <li><img src="~/assets/img/setting.png" class="drawer-menu-img">管理画面</li>
        </ul>
    </div>
</template>

<style scoped>
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
.drawer-menu-list > li {
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