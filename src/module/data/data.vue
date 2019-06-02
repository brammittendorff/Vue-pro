<template>
    <div>
        <v-sidebar :layout="sideWidth">
            <template slot="content">
                <v-side></v-side>
            </template>
        </v-sidebar>
        <div class="content" :style="{left:conLeft}">
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import vSidebar from '../../components/base_m/Sidebar';
    import vSide from './dataSide.vue';

    export default {
        components:{
            vSidebar,
            vSide
        },
        data(){
            return{
                sideWidth:'160px',
                conLeft:'160px'
            }
        },

    }
</script>