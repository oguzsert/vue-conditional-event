export default {
    inserted(el,binding,vnode){
    
        let event = binding.arg
    
        async function handler(eventArg) {
            let validatorList = Object.keys(binding.modifiers)
            let validationWrappers = validatorList.map((validator)=>{
                return ()=>{
                    if(typeof vnode.context[validator] === 'function'){
                        let originalFunction = vnode.context[validator]
                        return originalFunction()
                    }
                    else{
                        return vnode.context[validator]
                    }
                }
            })
    
            let promises = validationWrappers.map(validationWrappedFunction => {
                return validationWrappedFunction()
            })
    
            let results = await Promise.all(promises)
            let isAllReturnTrue = results.every(result => result === true)
    
            if(isAllReturnTrue) {
    
                if(binding.value && typeof binding.value === 'function'){
                    binding.value(eventArg)
                }
                else{
                    console.warn('VCE value is not a function !');
                }
            }
    
        }
        
        el.addEventListener(event,handler.bind(this))
        if(el.__vue__){
            //for prevent the native v-on's handler.
            if(el.__vue__._events[event]){
                el.__vue__._events[event].push(handler.bind(this))
            }
            else{
                el.__vue__._events[event] = [handler.bind(this)]
            }
        }
        
    }
}