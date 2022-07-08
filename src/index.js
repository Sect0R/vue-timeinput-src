import VueTimeInput from './VueTimeInput';

class VueTimeInputClass {
  component;

  initComponent(component) {
    this.component = component;
  }
}

function Install(Vue, installOptions) {
  const mmClass = new VueTimeInputClass();

  const init = Vue.extend(VueTimeInput);
  const component = new init({});

  mmClass.initComponent(component);
}

export default Install;

