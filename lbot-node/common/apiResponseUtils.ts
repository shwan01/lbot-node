/**
 * APIレスポンス生成 Utils
 */
export class ApiResponseUtils {

  /**
   * response 200
   */
  static createResponse200 = (headers: string = null, body: any): Object => {
    return ApiResponseUtils.createSuccess(200, headers, body);
  };

  /**
   * response 201
   */
  static createResponse201 = (headers: string = null, body: any): Object => {
    return ApiResponseUtils.createSuccess(201, headers, body);
  };

  /**
   * response 204
   */
  static createResponse204 = (headers: string = null, body: any): Object => {
    return ApiResponseUtils.createSuccess(204, headers, body);
  };

  static createErrorResponse = (error: any): Object => {
    console.error(error);
    const response = {
      statusCode: error.statusCode || 501,
      body: error.message,
    };
    return response;
  }

  /**
   * 正常系レスポンス生成共通処理
   */
  private static createSuccess = (httpStatusCode: number, headers: string = null, body: any = null): Object => {
    const response =  {
      statusCode: httpStatusCode,
      body: JSON.stringify({}),
    };
    if (headers) {
      response['headers'] = headers;
    }
    if (body) {
      response['body'] = JSON.stringify(body);
    }
    return response;
  };
}
