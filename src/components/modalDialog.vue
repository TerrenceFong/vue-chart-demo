<style scoped>
.dialog {
    width: 480px;
    position: fixed;
    left: 50%;
    top: 1.8em;
    transform: translateX(-50%);
    z-index: 2000;
    visibility: hidden;
    backface-visibility: hidden;
    perspective: 1300px;
}

.dialog-active {
    visibility: visible;
}

.dialog-active .dialog-content {
    opacity: 1;
    transform: rotateY(0);
}

.dialog-active ~ .dialog-overlay {
    opacity: 1;
    visibility: visible;
}

.dialog-content {
    border-radius: 3px;
    background: #fff;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: .5s ease-in-out;
    opacity: 0;
    transform-style: preserve-3d;
    transform: rotateY(-70deg);
}

.dialog-overlay {
    content: "";
    position: fixed;
    visibility: hidden;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    opacity: 0;
    background: rgba(0, 0, 0, 0.5);
    transition: all .6s;
}

.close {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: .5rem;
    right: .5rem;
    transition: .8s ease all;
    -moz-transition: .8s ease all;
    -webkit-transition: .8s ease all;
    border: none;
    border-radius: 3px;
    color: #333;
    text-decoration: none;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
}

.close:hover {
    transition: .8s ease all;
    -moz-transition: .8s ease all;
    -webkit-transition: .8s ease all;
}

.close .iconfont {
    font-size: 2rem;
    color: #fff;
}

.rotate {
    cursor: pointer;
}

.rotate:hover {
    transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    transition: transform 1.0s ease all;
    -moz-transition: -moz-transform 1.0s ease all;
    -webkit-transition: -webkit-transform 1.0s ease all;
}


.iconfont {
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

.icon-close:before { content: "\e60e"; }

</style>
<template>
    <div class="dialogs">
        <div class="dialog" v-bind:class="{ 'dialog-active': show }">
            <div class="dialog-content">
                <div class="close rotate">
                    <span class="iconfont icon-close" @click="close"></span>
                </div>
                <slot name="header"></slot>
                <slot name="body"></slot>
                <slot name="footer"></slot>
            </div>
        </div>
        <div class="dialog-overlay"></div>
    </div>
</template>
<script>
    module.exports = {
        props: ['show'],
        data: function() {
            return {
                
            }
        },
        ready: function() {
            
        },
        beforeDestroy: function() {
            
        },
        methods: {
            close: function() {
                this.show = false
            }
        }
    }
</script>
