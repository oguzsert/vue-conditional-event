# vue-conditional-event

vue-conditional-event is a directive for let trigger events conditionally.

### Why ?

Sometimes we need prevent some events because of validations or rules.

**Common approach :**

```js
export default {
    methods:{
        validateForm(){
            //...some validation code returns true or false
        },
        submitForm(){
            //actually we can get rid of this "if" block with vue-vce directive
            //check the next example
            if(!this.validateForm()){ 
                return
            }
            //actual submitForm logic code...
        }
    }
}
```

**vue-conditional-event approach:**

```js
export default {
    methods:{
        validateForm(){
            //...some validation code returns true or false
        },
        submitForm(){
            //actual submitForm logic code...
        }
    }
}
```

```html
<!-- if validateForm returns false click will be prevented -->
<button v-vce:click.validateForm="submitForm">Test</button>  
```

### Installation

NPM

```sh
$ npm install vue-conditional-event --save
```
VUE
```js
//Example implementation
import Vue from 'vue'
import App from './App.vue'
import vce from "./vce"

Vue.config.productionTip = false
Vue.use(vce)

new Vue({
  render: h => h(App),
}).$mount('#app')

```

### Examples

**Basic usage**

```html
<!-- if validateForm returns false click will be prevented -->
<button v-vce:click.validateForm="submitForm">Submit Form</button>  
```

**Chained validations**
You can chain any number of validations.
```html
<!-- if one of them returns false click will be prevented -->
<button v-vce:click.validate1.validate2="submitForm">Submit Form</button>
<button v-vce:click.validate1.validate2.validate3="submitForm">Submit Form</button> 
```

**Async/Sync validations**
You can chain async and sync functions together.
```js
export default {
    methods:{
        validate(){
            //return true or false
        },
        async asyncValidate(){ 
           await axios.get('[SOME API]') // lets assume it takes 3 seconds 
           //return true or false 
        },
        myMethod(){
            console.log("IT WORKS !")
        }
    }
}
```

```html
<!-- if both validation returns "true" , after three seconds myMethod will be executed -->
<button v-vce:validate.asyncValidate="myMethod">Test</button>
```
**Passing parameters to method which we wanted to execute after validations**
```html
<!-- we need to encapsulate our method with a function to pass parameters -->
<button v-for="(item,$index) in someArray" 
:key="$index" 
v-vce:click.validateFunction="()=> myMethod($index,item)">
Execute My Method
</button>  
```

**How to use $event ?**
You can access $event as wrapper function's first argument.
```html
<!-- encapsulate again -->
<button v-vce:click.validateFunction="($event)=> myMethod($event)">
Execute My Method
</button>  
```

**Using computed properties and data properties as validation criteria**
You can also chain computed,data and function validations.
```js
export default {
  data(){
     return {
        isDataCriteriaValid:// true or false
     }
  },
  name: 'HelloWorld',
  methods:{
    validateFunc(){
      return // true or false  
    },
    myMethod(){
      console.log("IT WORKS !")
    }
  },
  computed:{
    isComputedCriteriaValid(){
        return // true or false
    }
  }
}
```
```html
<!-- you can chain all types of validation together -->
<button v-vce:click.isDataCriteriaValid.isComputedCriteriaValid.validateFunc="myMethod">
Execute My Method
</button>  
```

**Execute child component's emitted event conditionally**
```js
//HelloWorld.vue
import someComponent from "./someComponent"
export default {
  components:{
      someComponent
  },
  name: 'HelloWorld',
  methods:{
    isEmittedEventExecutable(){
      return //true or false
    },
    myMethod(eventArgument){
        console.log("IT WORKS !",eventArgument)
    }
  }
}
```

```html
<!-- someComponent.vue -->
<template>
    <div style="background-color:lightyellow">
        <button @click="$emit('innerevent',{'a':'b'})">inner component</button>
    </div>
</template>
```

```html
<!-- HelloWorld.vue -->
<div>
<someComponent v-vce:innerevent.isEmittedEventExecutable="($event)=>myMethod($event)" />
</div>
```

**Using with v-on**
You can still use vce with standart v-on directive if you want, both of them will work.
```js
export default {
  name: 'HelloWorld',
  methods:{
    vceHandler(){
      console.log("vce works !")  
    },
    vonHandler(){
      console.log("v-on works!")
    },
    validate(){
        return //true or false
    }
  }
}
```
```html
<!-- vceHandler will execute conditionally and vonHandler will execute immediately -->
<button v-vce:click.validate="vceHandler" v-on:click="vonHandler">
Execute My Method
</button>  
```

**Using with promises**
Promises must resolved with true or false argument.
```js
export default {
  name: 'HelloWorld',
  methods:{
    myMethod(){
      console.log("it works !")  
    },
    promiseValidator(){
        return new Promise((resolve,reject)=>{
            //if validation successfully
            resolve(true)
            //or failed
            resolve(false)
        })
    }
  }
}
```
```html
<button v-vce:click.promiseValidator="myMethod">
Execute My Method
</button>  
```

### Note
vue-conditional-event supports all native events like click,mouseover,mousemove etc.


License
----

MIT




