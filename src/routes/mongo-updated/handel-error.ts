import { ApiResponse } from "./interface";
import { createResponse } from "./util";

const handelError = (error: any): ApiResponse<any> => {
    console.log(error);
    let response: ApiResponse<any>;
    if ((error && error.message) && (error.message === "Invalid Mongo Id" || error.message === "Invalid Author Id")) {
        response = createResponse(null, error.message)
    } else {
        response = createResponse(null, 'Some Thing Went Wrong')
    }
    return response
}

export{
    handelError
}