import { ApiResponse } from "./interface";
import { createResponse } from "./util";

const handelError = (error: any): ApiResponse<any> => {
    console.log(error);
    let response: ApiResponse<any>;
    const errorsArray: Array<string> = ['Invalid Mongo Id', 'Invalid Author Id', 'Author Name Already Exist']
    if ((error && error.message) && (errorsArray.some(err => err === error.message))) {
        response = createResponse(null, error.message)
    } else {
        response = createResponse(null, 'Some Thing Went Wrong')
    }
    return response
}

export {
    handelError
}