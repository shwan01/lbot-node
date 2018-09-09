import { DynamoDB } from 'aws-sdk'
import { ApiResponseUtils } from '../common/apiResponseUtils';
import { ApiResponseTypes } from '../types/apiResponseTypes'


/**
 * TODO一覧取得API
 */
export const getTodosList = (event, contents, callback):void => {
    const dynamoDb = new DynamoDB.DocumentClient();
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
    };
    dynamoDb.scan(params, (error, result) => {
        // TODO エラー処理仮置き
        if (error) {
            console.error(error);
            callback(null, {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t fetch the todos.',
            });
            return;
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
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
          id: event.pathParameters.id,
        },
      };
    dynamoDb.get(params, (error, result) => {
        // TODO エラー処理仮置き
        if (error) {
            console.error(error);
            callback(null, {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t fetch the todo item.',
            });
            return;
        }
        const response = {
            todos: result.Item,
        };
        callback(null, ApiResponseUtils.createResponse200(null, response));
    });
    
}