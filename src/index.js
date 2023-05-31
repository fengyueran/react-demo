// import { createElement } from './my-react3/react';
// import { render } from './my-react3/react-dom';
// import { render } from './my-react3/fiber0';

import { Element } from './virtual-dom';

let test4 = new Element('div', { class: 'my-div' }, ['test4']);
let test5 = new Element('ul', { class: 'my-div' }, ['test5']);

let test1 = new Element('div', { class: 'my-div' }, [test4]);

let test2 = new Element('div', { id: '11' }, [test5, test4]);

const run = () => {
  test1.render();
};

run();

// const MyReact = {
//   createElement,
//   render,
//   // useState,
// };

// // const element = (
// //   <div id="foo">
// //     <a>bar</a>
// //     <b />
// //   </div>
// // )

// const element = createElement(
//   'div',
//   { id: 'foo' },
//   createElement('a', null, 'bar'),
//   createElement('b')
// );

// debugger; //eslint-disable-line

// const container = document.getElementById('root');
// MyReact.render(element, container);
