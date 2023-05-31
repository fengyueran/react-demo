function isString(str) {
  return typeof str === 'string';
}

export class Element {
  constructor(tag, props, children, key) {
    this.tag = tag;
    this.props = props;
    if (Array.isArray(children)) {
      this.children = children;
    } else if (isString(children)) {
      this.children = null;
      this.key = children;
    }
    if (key) this.key = key;
  }

  render = () => {
    let root = this._createElement(
      this.tag,
      this.props,
      this.children,
      this.key
    );
    document.body.appendChild(root);
  };

  _createElement = (tag, props, children, key) => {
    let el = document.createElement(tag);
    Object.entries(props).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });
    if (key) {
      el.setAttribute('key', key);
    }
    if (children) {
      let child;
      children.forEach((element) => {
        if (element instanceof Element) {
          child = this._createElement(
            element.tag,
            element.props,
            element.children,
            element.key
          );
        } else {
          child = document.createTextNode(element);
        }
        el.appendChild(child);
      });
    }
    return el;
  };
}
