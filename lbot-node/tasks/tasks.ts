import { DynamoDB } from 'aws-sdk'
import { ApiResponseUtils } from '../common/apiResponseUtils';

/**
 * TODO一覧取得API
 */
export const getTodosList = (event, contents, callback):void => {
    const dynamoDb = new DynamoDB.DocumentClient();
    const params = {
        TableName: 'task',
    };
    dynamoDb.scan(params, (error, result) => {
        if (error) {
            callback(null, ApiResponseUtils.createErrorResponse(error));
        }
        const response = {
            todos: result.Items,
        }
        callback(null, ApiResponseUtils.createResponse200(null, response));
    });
}

/**
 * TODO取得ByIdAPI
 */
export const getTodosById = (event, contents, callback):void => {
    const dynamoDb = new DynamoDB.DocumentClient();
    const params = {
        TableName: 'task',
        Key: {
          id: event.pathParameters.id,
        },
      };
    dynamoDb.get(params, (error, result) => {
        if (error) {
            callback(null, ApiResponseUtils.createErrorResponse(error));
        }
        const response = {
            todos: result.Item,
        };
        callback(null, ApiResponseUtils.createResponse200(null, response));
    });
}

/**
 * TODO追加API
 */
export const addTasks = (event, content, callback):void => {
    const dynamoDb = new DynamoDB.DocumentClient();
    let body;
    const timestamp = new Date().getTime();
    if(event.body) {
        body = JSON.parse(event.body)
    }else{
    // TODO Validation 
    } 
    const params = {
        TableName: 'task',
        Item: {
          ownerId: body.ownerId,
          timestamp: body.timestamp,
          taskName: body.taskName,
          dueDate: body.dueDate? body.dueDate: null,
          assignedUserId: body.assignedUserId? body.assignedUserId: null
        }
      };
    // write the todo to the database
    dynamoDb.put(params, (error, result) => {
        if (error) {
            callback(null, ApiResponseUtils.createErrorResponse(error));
        }
        callback(null, ApiResponseUtils.createResponse201(null, {}));
    }); 
};