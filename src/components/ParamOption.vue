<template>
  <polaris-vue-fade-transition>
    <div class="option">
      {{ namespaceName }} - {{ keyName }} ({{ typeName }})
      <polaris-button destructive @click="removeFxn(paramData)">Remove</polaris-button>
    </div>
  </polaris-vue-fade-transition>
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
    namespaceName: function() {
      return this.paramData.split('.')[1]
    },
    keyName: function() {
      return this.paramData.split('.')[2].split(':')[0]
    },
    typeName: function() {
      return this.paramData.split('.')[2].split(':')[1]
    },
  },
  methods: {
  }
}
</script>

<style lang="scss">
#app {

  .option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.6rem;
    text-align: left;

    .Polaris-Button {
      margin-top: 0;
    }
  }

}
</style>