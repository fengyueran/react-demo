const React = {};

React.createTextElement = function (text) {
  return {
    type: 'TEXT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
};

React.createElement = function (type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === 'object'
          ? child
          : //由于会存在文本节点，标签类型都是TEXT，将文本节点单独拎出来，添加createTextElement方法
            React.createTextElement(child);
      }),
    },
  };
};
