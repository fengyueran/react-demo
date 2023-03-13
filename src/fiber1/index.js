//https://zhuanlan.zhihu.com/p/37095662
const queue = [];

const getVdomFormQueue = () => {
  return queue.shift();
};

function Fiber(vnode) {
  for (var i in vnode) {
    this[i] = vnode[i];
  }
  this.uuid = Math.random();
}

//我们简单的Fiber目前来看，只比vdom多了一个uuid属性
function toFiber(vnode) {
  if (!vnode.uuid) {
    return new Fiber(vnode);
  }
  return vnode;
}

const updateComponentOrElement = function (fiber) {
  var { type, stateNode, props } = fiber;
  if (!stateNode) {
    if (typeof type === 'string') {
      fiber.stateNode = document.createElement(type);
    } else {
      var context = {}; //暂时免去这个获取细节
      fiber.stateNode = new type(props, context);
    }
  }
  let children;
  if (stateNode.render) {
    //执行componentWillMount等钩子
    children = stateNode.render();
  } else {
    children = fiber.childen;
  }
  var prev = null; //这里只是mount的实现，update时还需要一个oldChildren, 进行key匹配，重复利用已有节点
  for (var i = 0, n = children.length; i < n; i++) {
    var child = children[i];
    child.return = fiber;
    if (!prev) {
      fiber.child = child;
    } else {
      prev.sibling = child;
    }
    prev = child;
  }
  //因此这样Fiber的return, child, sibling就有了，可以happy地进行深度优先遍历了
};

const updateView = () => {};
const updateFiberAndView = function (dl) {
  updateView(); //更新视图，这会耗时，因此需要check时间

  if (dl.timeRemaining() > 1) {
    let vdom = getVdomFormQueue();
    let firstFiber;
    const hasVisited = {};
    let fiber;
    do {
      fiber = toFiber(vdom); //A处
      if (!firstFiber) {
        firstFiber = fiber;
      }
      if (!hasVisited[fiber.uuid]) {
        hasVisited[fiber.uuid] = 1;
        //根据fiber.type实例化组件或者创建真实DOM
        //这会耗时，因此需要check时间
        updateComponentOrElement(fiber);
        if (fiber.child) {
          //向下转换
          if (dl.timeRemaining() < 1) {
            queue.push(fiber.child); //时间不够，放入栈
            break;
          }
          vdom = fiber.child;
          continue; //让逻辑跑回A处，不断转换child, child.child, child.child.child
        }
      }
      //如果组件没有children，那么就向右找
      if (fiber.sibling) {
        vdom = fiber.sibling;
        continue; //让逻辑跑回A处
      }
      // 向上找
      fiber = toFiber(fiber.return);
      if (fiber === firstFiber || !fiber) {
        break;
      }
    } while (1);
  }
  if (queue.length) {
    window.requetIdleCallback(updateFiberAndView, {
      timeout: new Date() + 100, //浏览器调用的最后期限
    });
  }
};

export const render = function (root, container) {
  queue.push(root);
  updateFiberAndView();
};
