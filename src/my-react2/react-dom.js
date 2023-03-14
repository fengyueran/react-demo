const ReactDOM = {};

ReactDOM.render = function (vDom, container) {
  container.appendChild(initElement(vDom));
};

function setAtr(dom, props) {
  if (!props) {
    return;
  }
  for (let [key, value] of Object.entries(props)) {
    if (key !== 'children') {
      // 添加样式
      if (key === 'style') {
        if (value && typeof value === 'object') {
          for (let i in value) {
            dom.style[i] = value[i];
          }
        } else {
          dom.removeAttribute(key); // 样式对象不存在或者样式格式不对
        }
      } else if (/on\w+/.test(key)) {
        // 绑定事件
        //\W+：匹配一个或多个非字母进行切割，匹配到的非字母不缓存；
        key = key.toLowerCase();
        if (value) {
          dom[key] = value;
        } else {
          dom.removeAttribute(key);
        }
      } else if (key === 'nodeValue') {
        dom.nodeValue = value;
      } else {
        // 其他属性
        if (value) {
          dom.setAttribute(key, value);
        } else {
          dom.removeAttribute(key);
        }
      }
    }
  }
}

function initElement(vDom) {
  //生成真实dom结构
  if (!vDom) {
    return;
  }
  let dom;
  if (vDom.type === 'TEXT') {
    dom = document.createTextNode('');
  } else {
    dom = document.createElement(vDom.type);
    setAtr(dom, vDom.props);
  }
  if (vDom.props.children.length > 0) {
    vDom.props.children.map((child) => {
      dom.appendChild(initElement(child));
    });
  }
  setAtr(dom);
  return dom;
}

export default ReactDOM;
