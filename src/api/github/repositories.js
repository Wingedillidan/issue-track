import axios from 'axios';

import {ROOT_URI} from './';

export function searchRepositories(term, sort = '', order = '') {
    return axios.get(`${ROOT_URI}/search/repositories`, {
        params: {
            q: term,
            sort,
            order
        }
    })
}
