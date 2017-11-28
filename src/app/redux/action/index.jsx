
/*
 * action类型
 */
export const CHANGE_ACTION_MENU = 'CHANGE_ACTION_MENU';
export const ADD_PROXY_ITEM = 'ADD_PROXY_ITEM';
export const UPDATE_PROXY_ITEM = 'UPDATE_PROXY_ITEM';
export const DELETE_PROXY_ITEM = 'DELETE_PROXY_ITEM';
export const SET_PROXY_DATA = 'SET_PROXY_DATA';
export const UPDATE_PROXY_LIST = 'UPDATE_PROXY_LIST';
export const UPDATE_DOC_LIST = 'UPDATE_DOC_LIST';
export const UPDATE_INSTALL_TOOLS_LIST = 'UPDATE_INSTALL_TOOLS_LIST';
export const UPDATE_INSTALL_PROGRESS = 'UPDATE_INSTALL_PROGRESS';


/*
 * action 创建函数
 */

//切换主模块
export const changeActionMenu = index => ({
    type: CHANGE_ACTION_MENU,
    payload: {
        index
    },
});

//新增转发代理
export const addProxyItem = (data) => ({
    type: ADD_PROXY_ITEM,
    payload: {
        id: Date.now(),
        ...data
    }
})

//修改转发代理
export const updateProxyItem = (data) => ({
    type: UPDATE_PROXY_ITEM,
    payload: {
        data
    }
})

//删除转发代理
export const deleteProxyItem = (id) => ({
    type: DELETE_PROXY_ITEM,
    payload: {
        id
    }
});

//重置转发代理数据
export const setProxyData = (id) => ({
    type: SET_PROXY_DATA,
    payload: {
        data
    }
});

//更新请求代理列表
export const updateProxyList = (data, pageNo, pageSize) => ({
    type: UPDATE_PROXY_LIST,
    payload: fetchData(data, {
        pageNo,
        pageSize
    })
});

//更新文档数据列表
export const updateDocList = (data, pageNo, pageSize) => ({
    type: UPDATE_DOC_LIST,
    payload: fetchData(data, {
        pageNo,
        pageSize
    })
});

//更新安装进度
export const updateInstallProgress = index => ({
    type: UPDATE_INSTALL_PROGRESS,
    payload: {
        index
    }
});

//更新工具数据列表
export const updateInstallToolsList = (data, pageNo, pageSize) => ({
    type: UPDATE_INSTALL_TOOLS_LIST,
    payload: fetchData(data, {
        pageNo,
        pageSize
    })
});


/*==============*/

//模拟分页获取数据
const fetchData = (data = [], condition = { pageNo: 1, pageSize: 10 }) => {

    let { pageNo, pageSize } = condition,
        totalRows = data.length,
        totalPages = Math.ceil(totalRows / pageSize),
        res;

    res = {
        data: data.slice((pageNo - 1) * pageSize, pageNo * pageSize),
        page: {
            pageNo: pageNo,
            pageSize: pageSize,
            totalPages: totalPages,
            totalRows: totalRows
        }
    }

    return res;
}