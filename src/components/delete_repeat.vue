<template>
    <div>delate repeat</div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        created () {
            this.$http.post('/api/getAllList').then(response => {
                let arr = [];
                let repeat = [];
                response.data.forEach( (item) => {
                    let re = arr.some(value => value.title === item.title);
                    if (re) {
                        repeat.push(item) // createTime
                        this.$http.post('/api/deteleRepeat', {id: item.createTime}).then(response => {
                            console.log(response, 789)
                        })
                    } else {
                        arr.push(item)
                    }
                })
            })
        }
    }
</script>
