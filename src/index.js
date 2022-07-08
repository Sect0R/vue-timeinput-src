import VueTimeInput from './VueTimeInput';

const VueTimeInputWrap = {
  install(Vue, options) {
    Vue.component('VueTimeInput', VueTimeInput);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueTimeInputWrap);
}
export default VueTimeInputWrap;

