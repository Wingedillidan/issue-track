import axios from 'axios';
import {ROOT_URI} from './';

export function getIssues(repoFullName) {
    return axios.get(`${ROOT_URI}/repos/${repoFullName}/issues`);
}
