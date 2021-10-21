/*
 * @Author: mfuture@qq.com
 * @Date: 2021-10-12 09:08:42
 * @Description: 常用函数
 */


/**
* @function 从树形数组创建树形对象
* @param  array {Array} 树形数组
* @param  id  {String|Number} 子节点
* @param  pid {String|Number} 父节点
**/

let buildTree = (array, id, pid) => {
    let tree = temp = {}
    let rootid = null
    for (let i in array) {
        temp[array[i][id]] = array[i]
    }
    // 对象是引用的，所以不用层层递归操作
    for (let i in temp) {
        if (temp[i][pid] != 0) {
            if (!temp[temp[i][pid]].children) {
                temp[temp[i][pid]].children = new Array()
            }
            temp[temp[i][pid]].children.push(temp[i])
        } else {
            rootid = temp[i][id]
            tree[rootid] = temp[i]
        }

    }
    return tree[rootid]
}

 
/**
 * @description 将treeObj中的所有对象，放入一个数组中，其原理实际上是数据结构中的广度优先遍历
 * @param {object} treeObj 具有树形结构的对象
 * @param {string | number} rootid 跟节点名称
 * @return {array}
 */
function tree2Array (treeObj, rootid) {
    console.log(typeof treeObj)
    const temp = [];  // 设置临时数组，用来存放队列
    const out = [];    // 设置输出数组，用来存放要输出的一维数组
    temp.push(treeObj);
    // 首先把根元素存放入out中
    let pid = rootid;
    const obj = deepCopy(treeObj);
    obj.pid = pid;
    delete obj['children'];
    out.push(obj)
    // 对树对象进行广度优先的遍历
    while (temp.length > 0) {
        const first = temp.shift();
        const children = first.children;
        if (children && children.length > 0) {
            pid = first.id;
            const len = first.children.length;
            for (let i = 0; i < len; i++) {
                temp.push(children[i]);
                const obj = deepCopy(children[i]);
                obj.pid = pid;
                delete obj['children'];
                out.push(obj)
            }
        }
    }
    return out
}


// 深拷贝
let deepCopy = (obj) => {
    // 深度复制数组
    if (Object.prototype.toString.call(obj) === "[object Array]") {
        const object = [];
        for (let i = 0; i < obj.length; i++) {
            object.push(deepCopy(obj[i]))
        }
        return object
    }
    // 深度复制对象
    if (Object.prototype.toString.call(obj) === "[object Object]") {
        const object = {};
        for (let p in obj) {
            object[p] = obj[p]
        }
        return object
    }
}


module.exports = {
    buildTree,
    tree2Array
}