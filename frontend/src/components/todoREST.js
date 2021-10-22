import axios from "axios";

export const instance = axios.create({baseURL : "http://localhost:8080"})

export const getListCall = async() => {
    return instance
        .post("/getList")
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.log("getList Error")
        })

};

export const updateItemCall = async(
    Description,
    Date,
    Time,
    ID
    ) => {
    return instance
        .post("/updateItem", {
            Description: Description,
            Date: Date,
            Time: Time,
            ID: ID
        })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.log("updateItem Error")
        })

};

export const removeItemCall = async(
    ID
    ) => {
    return instance
        .post("/removeItem", {ID: ID
        })
        .then((res) => {
            return res
        })
        .catch((error) => {
            console.log("removeItem Error")
        })

}

export const addItemCall = async(
    Description,
    Date,
    Time,
    ID
    ) => {
    return instance
        .post("/addItem", {
            Description: Description,
            Date: Date,
            Time: Time,
            ID: ID
        })
        .then((res) => {
            return res
        })
        .catch((error) => {
            console.log("addItem Error")
        })
}