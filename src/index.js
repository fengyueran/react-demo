import { createElement } from './my-react3/react';
// import { render } from './my-react3/react-dom';
import { render } from './my-react3/fiber0';

const MyReact = {
  createElement,
  render,
  // useState,
};

// const element = (
//   <div id="foo">
//     <a>bar</a>
//     <b />
//   </div>
// )

const element = createElement(
  'div',
  { id: 'foo' },
  createElement('a', null, 'bar'),
  createElement('b')
);

debugger; //eslint-disable-line

const container = document.getElementById('root');
MyReact.render(element, container);
