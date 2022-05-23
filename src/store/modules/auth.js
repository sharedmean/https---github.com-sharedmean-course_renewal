import {
    AUTH_REQUEST,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_LOGOUT
} from '../actions/auth';
import { USER_REQUEST } from '../actions/user';
import qs from 'qs'

const state = {
    token: localStorage.getItem('user-token') || '',
    status: '',
    hasLoadedOnce: false
};

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
};

const actions = {
    [AUTH_REQUEST]: function ({ commit, dispatch }, user) {
        const axios = this._vm.axios;
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);
            axios.post(
                'users/auth',
                qs.stringify(user),
                )
                .then(resp => {
                    const token = resp.data.access_token
                    localStorage.setItem('user-token', token);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                    commit(AUTH_SUCCESS, token);
                    dispatch(USER_REQUEST);
                    resolve(resp);
                    
                })
                .catch(err => {
                    commit(AUTH_ERROR, err);
                    localStorage.removeItem('user-token');
                    reject(err);
                });
        });
    },
    [AUTH_LOGOUT]: function ({ commit }) {
        return new Promise(resolve => {
            const axios = this._vm.axios;
            commit(AUTH_LOGOUT);
            localStorage.removeItem('user-token');
            delete axios.defaults.headers.common['Authorization'];
            resolve();
        });
    }
};

const mutations = {
    [AUTH_REQUEST]: state => {
        state.status = 'loading';
    },
    [AUTH_SUCCESS]: (state, token) => {
        state.status = 'success';
        state.token = token;
        state.hasLoadedOnce = true;
    },
    [AUTH_ERROR]: state => {
        state.status = 'error';
        state.hasLoadedOnce = true;
    },
    [AUTH_LOGOUT]: state => {
        state.token = '';
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};