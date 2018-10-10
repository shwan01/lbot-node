import { ApiResponseUtils } from '../common/apiResponseUtils';
import { Interceptor } from '../common/interceptor';
import * as tasks from './tasks';

/**
 * タスク一覧取得API
 */
export const getTasksList = (event, contents, callback): void => {
  Interceptor.validateGetTasksList(event)
        .then(() => tasks.getTasksList(event, contents, callback))
        .catch((error) => callback(null, ApiResponseUtils.createErrorResponse(error)));
};

/**
 * タスク取得ByIdAPI
 */
export const getTasksById = (event, contents, callback): void => {
  Interceptor.validateGetTasksById(event)
        .then(() => tasks.getTasksById(event, contents, callback))
        .catch((error) => callback(null, ApiResponseUtils.createErrorResponse(error)));
};

/**
 * タスク追加API
 */
export const addTasks = (event, contents, callback): void => {
  Interceptor.validateAddTasks(event)
        .then(() => tasks.addTasks(event, contents, callback))
        .catch((error) => callback(null, ApiResponseUtils.createErrorResponse(error)));
};

/**
 * タスク削除API
 */
export const deleteTasks = (event, contents, callback): void => {
  Interceptor.validateDeleteTasks(event)
        .then(() => tasks.deleteTasks(event, contents, callback))
        .catch((error) => callback(null, ApiResponseUtils.createErrorResponse(error)));
};

/**
 * タスク情報更新API
 */
export const updateTasks = (event, contents, callback): void => {
  Interceptor.validateUpadateTasks(event)
        .then(() => tasks.updateTasks(event, contents, callback))
        .catch((error) => callback(null, ApiResponseUtils.createErrorResponse(error)));
};

/**
 * 完了ステータス更新API
 */
export const updateComplicationStatus = (event, contents, callback): void => {
  Interceptor.validateUpdateComplicationStatus(event)
        .then(() => tasks.updateComplicationStatus(event, contents, callback))
        .catch((error) => callback(null, ApiResponseUtils.createErrorResponse(error)));
};
/**
 * 毎朝タスク通知API
 */
export const notifyTasksOnTheMorning = (event, contents, callback): void => {
  tasks.notifyTasksOnTheMorning(event, contents, callback)
   .catch((error) => callback(null, ApiResponseUtils.createErrorResponse(error)));
};