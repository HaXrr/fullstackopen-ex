
import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons" 


const getAll = async() => {
    return axios.get(baseUrl).then(res => res.data);
};


const create = async(newPerson) => {
    return axios.post(baseUrl, newPerson).then(res => res.data);
};

const remove = async (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = async(id, updatedPerson) => {
    return axios.put(`${baseUrl}/${id}`, updatedPerson).then(res => res.data)
}

export default { getAll, create, remove, update };
