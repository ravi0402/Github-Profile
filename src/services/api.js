import axios from 'axios';

export default {
    // Get user information
    user: {
        userInformation: userName => {
            return axios
                .get('https://api.github.com/users/' + userName)
                .then(res => res.data)
                .catch(err => alert(err));
        },
        // Get user repos
        userRepos: userName => {
            return axios
                .get('https://api.github.com/users/' + userName + '/repos')
                .then(res => res.data)
                .catch(err => alert(err));
        },
    },
};