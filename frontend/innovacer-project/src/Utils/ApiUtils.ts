import axios from "axios"

export default class ApiUtils {

    static getRequest(url: string) {
        return axios.get(url).then(res => res.data)
    }

    static postRequest(url: string, data?: any) {
        return axios.post(url, data)
    }

    static formRequest(url: string, fileData: string | Blob) {
        const formData = new FormData()
        formData.append("csvfile", fileData)
        return axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => response.data)
    }
}
