<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
    @charset "UTF-8";
    * {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        /* -webkit-user-select: none;  */
        -webkit-tap-highlight-color: transparent;
        outline: none;
    }
    html{
        font-family: "Helvetica Neue", Helvetica, sans-serif;
        font-size: 20px;
    }
    html,body {
        -webkit-touch-callout:none;
        -webkit-text-size-adjust:none;
        -webkit-tap-highlight-color:rgba(0, 0, 0, 0);
        /* -webkit-user-select:none;  */
        width: 100%;
    }
    body {
        line-height: 1.5;
        font-size: 0.8rem;
        color: #212121;
        /*background-color: #f5f5f5;*/
        outline: 0;
    }
    body{
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
    }
    h1,h2,h3,h4,h5,h6{
        font-weight: normal;
    }
    html,body,header,section,footer,div,ul,ol,li,img,a,span,em,del,legend,center,strong,var,fieldset,form,label,dl,dt,dd,cite,input,hr,time,mark,code,figcaption,figure,textarea,h1,h2,h3,h4,h5,h6,p,i{
        margin:0;
        border:0;
        padding:0;
        font-style:normal;
    }
    @media only screen and (min-width: 400px) {
        html {
            font-size: 21.33333333px !important;
        }
    }
    @media only screen and (min-width: 414px) {
        html {
            font-size: 21px !important;
        }
    }
    @media only screen and (min-width: 480px) {
        html {
            font-size: 25.6px !important;
        }
    }
    ul, li {
        list-style: none;
    }
    p {
        font-size: 0.7rem;
        color: #757575;
    }
    a {
        color: #be1204;
        text-decoration: none;
        background-color: transparent;
    }
    textarea {
        overflow: hidden;
        resize: none;
    }
    button {
        overflow: visible;
    }
    button,select {
        text-transform: none;
    }
    input[type="text"], input[type="password"], input[type="search"], input[type="email"], input[type="tel"], input[type="url"], input[type="date"], input[type="datetime-local"], input[type="time"], input[type="number"], select, textarea {
        font-size: 0.8rem;
        box-sizing: border-box;
        -webkit-user-select: text;
        user-select: text;
        -webkit-appearance: none;
        appearance: none;
    }
    input::-webkit-input-safebox-button{display:none;}
</style>
