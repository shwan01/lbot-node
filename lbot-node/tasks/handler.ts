import { ApiResponseUtils } from '../common/apiResponseUtils';
import { Interceptor } from '../common/interceptor';
import * as tasks from './tasks';


/**
 * TODO一覧取得API
 */
export const getTodosList = (event, contents, callback):void => {
    Interceptor.validateGetTodosList(event)
        .then(() => tasks.getTodosList(event, contents, callback))
        .catch((error) => callback(null, ApiResponseUtils.createErrorResponse(error)));
}

/**
 * TODO取得ByIdAPI
 */
export const getTodosById = (event, contents, callback):void => {
    Interceptor.validateGetTodosById(event)
        .then(() => tasks.getTodosById(event, contents, callback))
        .catch((error) => callback(null, ApiResponseUtils.createErrorResponse(error)));
}

/**
 * TODO追加API
 */
export const addTasks = (event, contents, callback):void => {
    Interceptor.validateAddTasks(event)
        .then(() => tasks.addTasks(event, contents, callback))
        .catch((error) => callback(null, ApiResponseUtils.createErrorResponse(error)));
}
