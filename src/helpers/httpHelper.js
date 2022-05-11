import axios from 'axios';

//const endpoint = 'http://cntttest.vanlanguni.edu.vn:18080/CP24Team15/backend/api';
// const endpoint = 'https://lmsapi.azurewebsites.net/api';
const endpoint = 'https://lmsbe.azurewebsites.net/api';
//const endpoint = 'http://localhost:38052/api';

export const instance = axios.create({
  baseURL:endpoint,
  "Content-Type": "application/json"
});

export const get = (url) => {
  return instance.get(url);
};

export const getWithParams = (url, params) => {
  return instance.get(url, {
    params: params,
  });
};

export const postForm = (url, body) =>{
  return instance.post(url,body);
};

export const post = (url, body) => {
  return instance.post(url, body);
};

export const postWithParams = (url, params) => {
  return instance.post(url,null,{
    params: params,
  })
}
export const putWithParams = (url, params) => {
  return instance.put(url,null,{
    params: params,
  })
}

export const put = (url, body) => {
  return instance.put(url, body);
};

export const putForm = (url, body) => {
  return instance.put(url, body);
}

export const patch = (url, body) => {
  return instance.patch(url, body);
};

export const del = (url) => {
  return instance.delete(url);
};

export const delList = (url, body) =>{
  return instance.delete(url,{data:body});
};