import api from '../services/api';
const userName = 'ravi0402';

export function userInformation(userInfo) {
    return {
        type: 'USER_INFROMATION',
        userInfo,
    };
}

export function userRepos(userRepos) {
    return {
        type: 'USER_REPOS',
        userRepos,
    };
}

export const searchRepos = searchValue => dispatch => {
    dispatch({
        type: 'SEARCH',
        searchValue,
    })
    return Promise.resolve();
}

export const filterRepos = (filterType, value) => dispatch => {
    dispatch({
        type: 'FILTER',
        filterInfo: {
            type: filterType,
            value: value,
        }
    })
    return Promise.resolve();
}

export const getUserInformation = () => dispatch =>
    api.user.userInformation(userName).then(res => {
        dispatch(userInformation(res));
    });

export const getUserRepos = () => dispatch =>
    api.user.userRepos(userName).then(res => {
        dispatch(userRepos(res));
    });