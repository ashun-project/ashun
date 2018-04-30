<template>
    <div>delate repeat</div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        methods: {
            deleteData (id) {
                this.$http.post('/api/deteleRepeat', {id: id}).then(response => {
                    console.log(response, 789)
                })
            }
        },
        created () {
            this.$http.post('/api/getAllList').then(response => {
                let arr = [];
                let repeat = [];
                let name = "妈妈的朋友"
                // response.data.forEach( (item) => {
                //     let re = arr.some(value => value.title === item.title);
                //     if (re) {
                //         repeat.push(item) // createTime
                //         this.$http.post('/api/deteleRepeat', {id: item.createTime}).then(response => {
                //             console.log(response, 789)
                //         })
                //     } else {
                //         arr.push(item)
                //     }
                // })
                
                let fil = response.data.filter(item => item.title.indexOf(name) > -1);
                console.log(fil)
            })
            let a = ['1524799753']
            let vm = this;
            
        }
    }
</script>
