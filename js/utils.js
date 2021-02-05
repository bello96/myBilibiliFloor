// 获取偏移量
function offSet(element) {
    let parent = element.offsetParent,
        top = element.offsetTop,
        left = element.offsetLeft;
    while (parent) {
        if (!/MSIE 8/.test(navigator.userAgent)) {
            left += parent.clientLeft;
            top += parent.clientTop;
        }
        left += parent.offsetLeft;
        top += parent.offsetTop;
        parent = parent.offsetParent;
    }
    return {
        top, left
    }
}
// 防抖
function throttle(func, wait) {
    typeof wait === "undefined" ? wait = 100 : null;
    let timer = null, // 定时器id
        previous = 0;
    return function proxy(...params) {
        let now = new Date(), // 当前时间
            remaining = wait - (now - previous); // 连续执行时 时间差值
        if (remaining <= 0) {
            // 立即执行
            clearTimeout(timer);
            timer = null;
            previous = now;
            func.call(this, ...params);
        } else if (!timer) {
            timer = setTimeout(() => {
                clearTimeout(timer);
                timer = null;
                previous = new Date();
                func.call(this, ...params);
            }, remaining);
        }
    };
}
