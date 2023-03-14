//https://juejin.cn/post/7020046743748214792

//没有fiber时递归添加
export const render = (element, container) => {
  const dom =
    element.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type);

  const isProperty = (key) => key !== 'children';
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });
  if (Array.isArray(element.props.children)) {
    element.props.children.forEach((child) => render(child, dom));
  }

  // highlight-end
  container.appendChild(dom);
};
