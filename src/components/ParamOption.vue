<template>
  <div class="option" v-show="isMetafield">
    {{ paramData }}
  </div>
</template>

<script>

export default {
  name: 'ParamOption',
  props: {
    paramData: String,
    removeFxn: Function,
  },
  data: function() {
    return {
    }
  },
  computed: {
    isMetafield: function() {
      console.log(this.paramData);
      return this.paramData.indexOf(":") > -1 && this.paramData.indexOf("metafields") > -1
    },
  },
  methods: {
  }
}
</script>