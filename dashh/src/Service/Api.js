import { Validation } from "./Validation";

let url = "http://127.0.0.1:8000/api/";
export const ImgUrl="http://127.0.0.1:8000/public/img/"
export const Post = async (path, param) => {
console.log(param)
 if(!Validation(param)){
  return false
 } else{
  let data = await fetch(`${url}${path}`, {
    method: "POST",
    body: JSON.stringify(param),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.error(err.response));
  return data;
 }
  
};
export const Get = async (path) => {
  let data = await fetch(`${url}${path}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.error(err.response));
  return data;
};


export const handlefileupload = async (file) => {
  let formdata = new FormData();
  formdata.append("file", file);

  let data = await fetch(`${url}fileupload`, {
    method: "POST",
    body: formdata,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.error(err.response));
  return data;
};



