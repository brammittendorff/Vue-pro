<template>
    <div class="sidebar" :style="{width:layout}">
        <slot name="content"></slot>
    </div>
</template>

<script>
     export default {
        props:{
            layout:{
                type:String,
                default:'300px'
            }
        }
    }    
</script>

<style scoped lang='less' rel='stylesheet/less'>
    .sidebar{
        display: block;
        position: absolute;
        width: 300px;
        left: 0;
        top: 50px;
        bottom:0;
        background: #0F1014;
    }
</style>
