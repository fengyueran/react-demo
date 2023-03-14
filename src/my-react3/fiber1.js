//https://juejin.cn/post/7020046743748214792

let nextUnitOfWork = null;

function createDom(fiber) {
  const dom =
    fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type);

  return dom;
}
//在performUnitOfWork中每次我们处理一个元素时都会在DOM 中添加一个新的节点。
//而且，浏览器还会在完成整棵树的渲染之前打断我们的工作。这样，用户将会看到一个不完整的UI，这是我们不希望的。
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  //create new fibers
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;
  while (index < elements.length) {
    const element = elements[index];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    //把newFiber作为一个child或者sibling加入fiber tree，这取决于它是不是第一个child
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }

  //最后我们寻找任务中的下一个单元。我们首先寻找child，接下来是sibling，然后是uncle，以此类推。
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    // 任务列表中还有下一个单元而且还有空闲时间
    nextUnitOfWork = performUnitOfWork(
      // 执行任务
      nextUnitOfWork
    );
    shouldYield = deadline.timeRemaining() < 1; // 判断是否还有空闲时间
  }
  requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);

export const render = (element, container) => {
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element],
    },
  };
};
