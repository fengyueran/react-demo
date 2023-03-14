//https://juejin.cn/post/7020046743748214792

const createTextElement = function (text) {
  return {
    type: 'TEXT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
};

export const createElement = function (type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === 'object'
          ? child
          : //由于会存在文本节点，标签类型都是TEXT，将文本节点单独拎出来，添加createTextElement方法
            createTextElement(child);
      }),
    },
  };
};
