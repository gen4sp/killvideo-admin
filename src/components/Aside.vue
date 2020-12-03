<template>
    <el-menu :default-active="$route.path"
             class="menu el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             :router="true"
             :collapse="isCollapse">
        <div style="height: 60px">
            <div class="logo">Logo</div>
        </div>
        <!--<el-submenu index="1">-->
        <!--<template slot="title">-->
        <!--<i class="el-icon-location"></i>-->
        <!--<span slot="title">Navigator One</span>-->
        <!--</template>-->
        <!--<el-menu-item-group>-->
        <!--<span slot="title">Group One</span>-->
        <!--<el-menu-item index="1-1">item one</el-menu-item>-->
        <!--<el-menu-item index="1-2">item two</el-menu-item>-->
        <!--</el-menu-item-group>-->
        <!--<el-menu-item-group title="Group Two">-->
        <!--<el-menu-item index="1-3">item three</el-menu-item>-->
        <!--</el-menu-item-group>-->
        <!--<el-submenu index="1-4">-->
        <!--<span slot="title">item four</span>-->
        <!--<el-menu-item index="1-4-1">item one</el-menu-item>-->
        <!--</el-submenu>-->
        <!--</el-submenu>-->
        <el-menu-item index="/users">
            <i class="el-icon-menu"></i>
            <span slot="title">Users</span>
        </el-menu-item>
        <el-menu-item index="/items">
            <i class="el-icon-setting"></i>
            <span slot="title">Items</span>
        </el-menu-item>
    </el-menu>

</template>

<script>
  export default {
    name: 'SideMenu',
    data () {
      return {
        isCollapse: false
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .menu{
        background-color: #2d333a;
        height: 100%;
        color: white;
        .el-submenu__title *{
            color: white;
        }
        .el-menu-item {
            color: white;
            &.is-active{
                color: #94d1ff;
            }
        }
    }
    .logo{
        text-align: center;
        line-height: 60px;
        font-weight: 900;
        font-size: 1.8em;
        font-kerning: unset;
        opacity: 0.4;
    }
</style>
