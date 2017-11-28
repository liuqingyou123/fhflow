
import { CHANGE_ACTION_MENU } from '../action/index'
import { UPDATE_PROXY_HOST, ADD_PROXY_ITEM, UPDATE_PROXY_ITEM, DELETE_PROXY_ITEM, SET_PROXY_DATA } from '../action/index'
import { UPDATE_DOC_LIST } from '../action/index';
import { UPDATE_INSTALL_PROGRESS, UPDATE_INSTALL_TOOLS_LIST } from '../action/index'
import { CHANGE_ACTION_PROJECT } from '../action/index'

//actionMenu state
export const actionMenuSelectedIndex = (state = 0, action = {}) => {
    switch (action.type) {
        case CHANGE_ACTION_MENU:
            return action.payload.index;
        default:
            return state;
    }
};

//proxyList state Immutable.js
export const proxyList = (state = { host: {}, data: [] }, action = {}) => {
    switch (action.type) {
        case UPDATE_PROXY_HOST:
            return Object.assign({}, state, {
                host: { ...action.payload }
            })
        case ADD_PROXY_ITEM:
            return Object.assign({}, state, {
                data: [action.payload, ...state]
            })
        case UPDATE_PROXY_ITEM:
            return Object.assign({}, state, {
                data: [action.payload, ...state]
            })
        case DELETE_PROXY_ITEM:
            return Object.assign({}, state, {
                data: [action.payload, ...state]
            })
        case SET_PROXY_DATA:
            return Object.assign({}, state, {
                data: action.payload.data
            })
        default:
            return state;
    }
};

//docList state
export const docList = (state = {}, action = {}) => {
    switch (action.type) {
        case UPDATE_DOC_LIST:
            return { ...action.payload };
        default:
            return state;
    }
};

//installList state
export const installList = (state = { dev: {}, tools: {} }, action = {}) => {
    switch (action.type) {
        case UPDATE_INSTALL_PROGRESS:
            return Object.assign({}, state, {
                dev: {
                    progressIndex: action.payload.index
                }
            });
        case UPDATE_INSTALL_TOOLS_LIST:
            return Object.assign({}, state, {
                tools: { ...action.payload }
            });
        default:
            return state;
    }
};

//project state
export const actionProjectSelectedIndex = (state = 0, action = {}) => {
    switch (action.type) {
        case CHANGE_ACTION_PROJECT:
            return action.payload;
        default:
            return state;
    }
};