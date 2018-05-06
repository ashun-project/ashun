<template>
    <div class="suspend">
        <div class="lf-suspend">左</div>
        <div class="rf-supend">右</div>
    </div>
</template>

<style scoped>
    .suspend > div{
        position: fixed;
        top: 50%;
        width: 160px;
        height: 300px;
        border: 1px solid #eee;
        transform: translateY(-50%)
    }
    .suspend .rf-supend{
        right: 0;
    }
</style>
