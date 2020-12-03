<template>
    <div>
        <el-select v-model="value"
                   filterable
                   remote
                   @change="change"
                   reserve-keyword
                   :remote-method="remoteMethod"
                   :loading="loading"
                   placeholder="Owner"
                   class="fullwidth">
            <el-option
                    v-for="item in items"
                    :key="item.id"
                    :label="item[field]"
                    :value="item.id">
            </el-option>
        </el-select>
    </div>
</template>

<script>
  import api from '../api'
  export default {
    name: "SelectRemoteItem",
    props: ['type', 'value', 'field'],
    data(){
      return {
        items:[],
        loading: false
      }
    },
    methods:{
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          api[this.type].all({
            query: {[this.field]:query}
          })
            .then((results) => {
              this.loading = false;
              this.items = results.items;
            })
            .catch((err)=>{
              console.error(err)
            })
        } else {
          this.items = []
        }
      },
      change(value){
        console.log('ccc', value)
        this.$emit('input', value)
      }
    },

  }
</script>

<style scoped>

</style>
