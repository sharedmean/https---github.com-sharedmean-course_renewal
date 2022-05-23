import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from '../actions/user';
import Vue from 'vue';
import { AUTH_LOGOUT } from '../actions/auth';

// https://pavelgonzales.medium.com/best-practices-%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D0%B8-%D0%B4%D0%BB%D1%8F-vue-8b769589001a

const defaultProfile = { first_name: 'незнакомец', login: 'Guest', role_id: 0}

const state = { status: '', profile: defaultProfile };

const getters = {
    getProfile: state => state.profile,
    isProfileLoaded: state => !!state.profile.id,
    getUserRequestStatus: state => state.status
};

const actions = {
    [USER_REQUEST]: function ({ commit, dispatch }) {
        const axios = this._vm.axios;
        commit(USER_REQUEST);
        axios.get('users/me', {timeout: 2000})
            .then(resp => {
                commit(USER_SUCCESS, resp);
            })
            .catch(() => {
                commit(USER_ERROR);
                // if resp is unauthorized, logout, to
                dispatch(AUTH_LOGOUT);
            });
    }
};

const mutations = {
    [USER_REQUEST]: state => {
        state.status = 'loading';
    },
    [USER_SUCCESS]: (state, resp) => {
        state.status = 'success';
        localStorage.setItem('profile', resp.data);
        localStorage.setItem('user_id', resp.data.id);
        Vue.set(state, 'profile', resp.data);
    },
    [USER_ERROR]: state => {
        state.status = 'error';
    },
    [AUTH_LOGOUT]: state => {
        state.profile = defaultProfile;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};