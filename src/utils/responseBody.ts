type response = {
    status: "success" | "fail" | "error",
    data: any,
    message: string 
}

class responseBody {
    data: any
    status: any
    message?: string 
    constructor(status:any, data: any, message?: any) {
        this.status = status
        this.data = data
        this.message = message
    }
}

const res = new responseBody("success", ["something"])
console.log({...res})

