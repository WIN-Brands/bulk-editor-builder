<template>
  <div id="app">
    <polaris-layout>
        <polaris-layout-section secondary>
          <polaris-card title="Tags" sectioned>
            <polaris-form-layout>
                <polaris-text-field 
                    label="Bulk Editor Link"
                    :value="urlValue"
                    @change="updateUrl"
                    multiline>
                </polaris-text-field>
            </polaris-form-layout>
          </polaris-card>
        </polaris-layout-section>
        <polaris-layout-section>
            <polaris-card title="Add Options" sectioned>
              <polaris-text-field 
                  label="Store Admin URL"
                  :value="storeRoot">
              </polaris-text-field>
              <polaris-text-field 
                  label="Product IDs"
                  :value="ids.join(', ')"
                  @change="updateIds">
              </polaris-text-field>
              <polaris-form-layout-group>
                <polaris-choice-list 
                    name="Bulk Editor Options"
                    title="Bulk Editor Options"
                    :choices="bulkEditorOptions"
                    :allow-multiple="true"
                    @change="updateOptions"
                    v-model="selectedOptions">
                </polaris-choice-list>
                <template v-for="element in urlElements">
                  <param-option :paramData="element" :key="element"></param-option>
                </template>
              </polaris-form-layout-group>

            </polaris-card>
        </polaris-layout-section>
        <polaris-layout-section>
            <polaris-card title="Add Metafields" sectioned>
              <polaris-form-layout-group>
                <polaris-text-field 
                    label="Metafield Namespace"
                    :value="metafieldToAdd.namespace"
                    @change="updateMetafieldToAdd('namespace', $event)">
                </polaris-text-field>
                <polaris-text-field 
                    label="Metafield Key"
                    :value="metafieldToAdd.key"
                    @change="updateMetafieldToAdd('key', $event)">
                </polaris-text-field>
                <polaris-select
                    v-model="metafieldToAdd.type"
                    label="Metafield Type"
                    :options="[
                        {label: 'String', value: 'string'},
                        {label: 'Number', value: 'integer'},
                        {label: 'JSON', value: 'json_string', disabled: true}
                    ]"
                    placeholder="Select Type">
                </polaris-select>
              </polaris-form-layout-group>
              <polaris-button primary @click="addMetafield">
                  Add Metafield
              </polaris-button>
            </polaris-card>
        </polaris-layout-section>
    </polaris-layout>
  </div>
</template>

<script>

import ParamOption from './components/ParamOption.vue'

export default {
  name: 'App',
  components: {
    ParamOption
  },
  data: function() {
    return {
      urlValue: "",
      urlElements: [],
      storeRoot: "",
      ids: [],
      selectedOptions: [],
      metafieldToAdd: {
        namespace: "",
        key: "",
        type: "string"
      },
      bulkEditorOptions: [
        {
            label: 'SKU', 
            value: 'variants.sku'
        },
        {
            label: 'Price', 
            value: 'variants.price'
        },
        {
            label: 'Compare at Price', 
            value: 'variants.compare_at_price'
        },
        {
            label: 'Product Type', 
            value: 'product_type'
        },
        {
            label: 'Vendor', 
            value: 'vendor'
        },
        {
            label: 'Template Suffix', 
            value: 'template_suffix'
        },
        {
            label: 'Title', 
            value: 'title'
        },
        {
            label: 'Tags', 
            value: 'tags'
        },
        {
            label: 'Cost Per Item', 
            value: 'variants.cost'
        },
        {
            label: 'Charge Taxes', 
            value: 'variants.taxable'
        },
        {
            label: 'Tax Codes', 
            value: 'variants.tax_code'
        },
        {
            label: 'Barcode', 
            value: 'variants.barcode'
        },
        {
            label: 'Continue Selling When Out of Stock', 
            value: 'variants.inventory_policy'
        },
        {
            label: 'Track Quantity', 
            value: 'variants.inventory_management'
        },
        {
            label: 'Weight', 
            value: 'variants.weight'
        },
        {
            label: 'Requires Shipping', 
            value: 'variants.requires_shipping'
        },
        {
            label: 'Harmonized System Code', 
            value: 'variants.metafields_global_harmonized_system_code'
        },
        {
            label: 'Country Code of Origin', 
            value: 'variants.country_code_of_origin'
        },
        {
            label: 'SEO Title', 
            value: 'metafields_global_title_tag'
        },
        {
            label: 'SEO Meta Description', 
            value: 'metafields_global_description_tag'
        },
        {
            label: 'Handle', 
            value: 'handle'
        },
      ]
    }
  },
  computed: {
    parsedValue: function() {
      return this.urlValue.split('.com/')[1]
    },
    parsedElements: function() {
      let parsed = [];
      
      return parsed;
    },
    metafields: function() {
      return this.urlElements.filter((item) => item.indexOf(":") > -1 && item.indexOf("metafields") > -1 )
    },
    sortedBulkEditorOptions: function() {
      const sortedOptions = this.bulkEditorOptions;

      return sortedOptions.sort((current, next) => {
        const currentOption = current.label.toUpperCase(); // ignore upper and lowercase
        const nextOption = next.label.toUpperCase(); // ignore upper and lowercase
        if (currentOption < nextOption) {
          return -1;
        }
        if (currentOption > nextOption) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    }
  },
  methods: {
    updateUrl: function(value, rebuild){
      console.log(value);
      // console.log(typeof value);
      const cleansedValue = value.replace(',', "%2C");
      const urlComponents = cleansedValue.split('/admin/bulk');
      // const elements = {};
      let queryParams = [];
      
      if (rebuild || cleansedValue !== this.urlValue){
        this.urlValue = cleansedValue.trim();

        this.storeRoot = urlComponents[0];

        // generate groups that match query param patterns (empty or not value as well)
        queryParams = urlComponents[1].match(/((&|\?)(\w)+=(((\w|\d)*(\.|_|%|:)*))*)/gi);

        if (queryParams) {
          this.ids = queryParams.filter((item) => {
            return item.indexOf('ids=') > 0
          })[0].replace(/(&|\?)ids=/g, '').split('%2C');
  
          this.urlElements = queryParams.filter((item) => {
            return item.indexOf('edit=') > 0
          })[0].replace(/(&|\?)edit=/g, '').split('%2C');

          this.selectedOptions = [];

          this.urlElements.forEach( (element) => {
            this.selectedOptions.push(element)
          });

        }

      }
    },
    updateIds: function(value) {
      this.ids = value.trim().replace(/\s/g, '').split(',').filter((item) => item.length > 0);

      this.urlValue = this.urlValue.replace(/ids=(\d{10,}(%2C)?)+/gi, 'ids=' + this.ids.join('%2C'));
    },
    updateMetafieldToAdd: function(type, value){
      this.metafieldToAdd[type] = value;
    },
    updateOptions: function() {
      // "(edit=(((\w|\d)*(\.|_|%)*))*)"
      console.log(this.selectedOptions);
      this.urlValue = this.urlValue.replace(/(edit=(((\w|\d)*(\.|_|%|:)*))*)/gi, `edit=${this.selectedOptions.join('%2C')}`);
      
      // this.selectedOptions.forEach((option) => {
      //   const replaceRegex = new RegExp("(%2C)?" + option, 'gi');
      //   const originalUrl = this.urlValue;

      //   console.log(originalUrl);

      //   if (this.urlValue.indexOf(option) > 0){
      //     this.urlValue = originalUrl.replace(replaceRegex, '');
      //   } else {
      //     let tempUrl = this.urlValue;
          
      //     console.log("temp", tempUrl)
          
      //     tempUrl.split('%2C');
          
      //     // tempUrl.splice(-1, option);

      //     console.log("temp", tempUrl)
          
      //     tempUrl.join('%2C');

      //     this.urlValue = tempUrl
      //   }
      // });
    },
    addMetafield: function(){
      this.selectedOptions.push(`metafields.${this.metafieldToAdd.namespace}.${this.metafieldToAdd.key}:${this.metafieldToAdd.type}`);

      this.updateOptions();

      this.updateUrl(this.urlValue, true);
    },
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 60px 24px;

  .Polaris-Layout {
    max-width: 850px;
    margin: 0 auto;
  }

  .Polaris-FormLayout {
    margin-left: 0;
  }

  .Polaris-FormLayout__Item {
    margin-left: 0;
    max-width: 100%;
  }

  .Polaris-Layout__Section {
    flex: 2 2 100%;
  }

  .Polaris-Layout__Section--secondary {
    max-width: calc(50% - 2rem);
    min-width: 340px;
  }

  .Polaris-ChoiceList {
    text-align: left;
  }

  .Polaris-Labelled + .Polaris-Labelled {
    margin-top: 1.6rem;
  }

  .Polaris-Button {
    margin-top: 1.6rem;
  }

  .Polaris-Labelled + div {
    .Polaris-FormLayout__Item {
      margin-left: 0;
    }
  }

  .Polaris-Card__Header.secondary{
    padding-top: 3rem;
  }

  .Polaris-Subheading {
    margin-top: 2rem;
  }

  ul,
  ol {
    text-align: left;
  }
}
</style>
