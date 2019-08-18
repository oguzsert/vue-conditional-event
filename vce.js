import vce_directive from "./vce-directive"

export default {
    install(Vue){
        Vue.directive('vce',vce_directive)
    }
}