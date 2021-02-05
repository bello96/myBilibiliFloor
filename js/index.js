// 通过高级单例模式来实现模块化开发
// 1，确定导航位置
// 2，绑定动态数据
// 3，记录每个板块的offsetTop值
// 4，滚动时计算哪个板块的标题选中
// 5，绑定点击事件进行处理
// 6，拖拽处理

let navigationModule = (function () {
    let navigation = document.querySelector('.navigation'), // 导航栏盒子
        list = navigation.querySelector('.list'), // 导航标签列表
        topBtn = navigation.querySelector('.top-btn'), // 回到顶部按钮
        container = document.querySelector('.container'), // 内容模块盒子
        HTML = document.documentElement
    // 导航列表数据
    sourceMap = [
        {
            id: 'yinyue',
            text: '音乐',
            top: 0,
            active: false
        },
        {
            id: 'guichu',
            text: '鬼畜',
            top: 0,
            active: false
        },
        {
            id: 'dianying',
            text: '电影',
            top: 0,
            active: false
        },
        {
            id: 'xuexi',
            text: '学习',
            top: 0,
            active: false
        },
        {
            id: 'shenghuo',
            text: '生活',
            top: 0,
            active: false
        },
        {
            id: 'youxi',
            text: '游戏',
            top: 0,
            active: false
        },
        {
            id: 'shuma',
            text: '数码',
            top: 0,
            active: false
        },
        {
            id: 'manhua',
            text: '漫画',
            top: 0,
            active: false
        },
        {
            id: 'wudao',
            text: '舞蹈',
            top: 0,
            active: false
        },
        {
            id: 'fanju',
            text: '番剧',
            top: 0,
            active: false
        },
        {
            id: 'zhibo',
            text: '直播',
            top: 0,
            active: false
        },
    ]
    // 初始化
    const initPosition = function () {
        if (HTML.scrollTop >= 120) {
            navigation.style.position = 'fixed';
            navigation.style.top = '80px';
        } else {
            navigation.style.position = 'absolute';
            navigation.style.top = '200px';
        }
    }

    // 渲染导航列表
    const renderList = function () {
        let str = '';
        sourceMap.forEach(item => {
            let { id, text, active } = item
            str += `<li class="${active ? 'active' : ''}" data-id="${id}">
                    ${text}
                </li>`
        })
        list.innerHTML = str
    }

    // 获取距离顶部距离
    const computedTop = function () {
        sourceMap = sourceMap.map(item => {
            let element = document.getElementById(`${item.id}`)
            item.top = offSet(element).top // 获得每个模块的上下偏移量
            return item
        })
    }
    // 创建文档碎片节点
    const renderContainer = function () {
        let frag = document.createDocumentFragment()
        sourceMap.forEach(item => {
            let element = document.getElementById(`${item.id}`)
            frag.appendChild(element)
        })
        container.appendChild(frag)
        frag = null
    }

    // 滚动实时选中标签
    const setActive = function () {
        let top = HTML.scrollTop + 150
        sourceMap = sourceMap.map(item => {
            item.active = false
            return item
        })

        // 处理边界
        if (top >= sourceMap[sourceMap.length - 1].top) {
            sourceMap[sourceMap.length - 1].active = true
        } else if (top >= sourceMap[0].top) {
            for (let i = 0; i < sourceMap.length; i++) {
                let item = sourceMap[i]
                let next = sourceMap[i + 1]
                if (top >= item.top && top < next.top) {
                    item.active = true
                    break
                }
            }
        }
        renderList()
    }

    // 回顶部
    topBtn.addEventListener('click', function () {
        HTML.scrollTop = 0
    })

    // 点击导航标签定位到该模块位置
    list.addEventListener('click', function (e) {
        sourceMap.forEach(item => {
            if (item.id === e.target.getAttribute('data-id')) {
                HTML.scrollTop = item.top
            }
        })
    })

    return {
        init() {
            initPosition()
            renderList()
            renderContainer()
            computedTop()
            window.addEventListener('scroll', throttle(function () {
                initPosition()
                setActive()
                computedTop()
            }))
            window.addEventListener('resize', throttle(function () {
                computedTop()
            }))
        }
    }
})()
window.onload = function () {
    navigationModule.init()
}
