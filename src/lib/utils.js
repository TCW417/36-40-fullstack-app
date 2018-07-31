const renderIf = (test, trueComponent, falseComponent = null) => {
  return test ? trueComponent : falseComponent;
};

const cl = console.log;
const ci = console.info;
const ce = console.error;
const cg = console.group;
const cge = console.groupEnd;

export { renderIf, cl, ce, ci, cg, cge }; // eslint-disable-line
