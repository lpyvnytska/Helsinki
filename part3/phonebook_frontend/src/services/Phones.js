import axios from 'axios'
const baseURL = '/api/persons'

const getAll = () => {
    const req=axios.get(baseURL)
    return req.then(res => res.data)
};

const create = (contact) => {
    const req=axios.post(baseURL, contact)
    return req.then(res => res.data)
};

const remove = (id) => {
    const req=axios.delete(baseURL+'/'+id)
    return req.then(res => res.data)
};

const replace = (id, contact) => {
    const req=axios.put(baseURL+'/'+id, contact)
    return req.then(res => res.data)
};

export default {getAll, create, remove, replace};