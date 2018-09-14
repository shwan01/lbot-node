import { DynamoDB } from 'aws-sdk';
import { ApiResponseUtils } from '../common/apiResponseUtils';

/**
 * ユーザー別タスク一覧取得API
 */
export const getTasksList = (event, contents, callback): void => {
  const dynamoDb = new DynamoDB.DocumentClient();
  const params = {
    TableName: 'task',
    Key: {
      ownerId: event.queryStringParameters.ownerId,
    },
  };
  dynamoDb.query(params, (error, result) => {
    if (error) {
      callback(null, ApiResponseUtils.createErrorResponse(error));
    }
    const response = {
      todos: result.Items,
    };
    callback(null, ApiResponseUtils.createResponse200(null, response));
  });
};

/**
 * タスク取得ByIdAPI
 */
export const getTasksById = (event, contents, callback): void => {
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
};

/**
 * タスク追加API
 */
export const addTasks = (event, content, callback): void => {
  const dynamoDb = new DynamoDB.DocumentClient();
  let body;
  const timestamp = new Date().getTime();
  if (event.body) {
    body = JSON.parse(event.body);
  }else{
    // TODO Validation
  }
  const params = {
    TableName: 'task',
    Item: {
      ownerId: body.ownerId,
      timestamp: body.timestamp,
      taskName: body.taskName,
      dueDate: body.dueDate ? body.dueDate : null,
      assignedUserId: body.assignedUserId ? body.assignedUserId : null,
    },
  };
    // write the todo to the database
  dynamoDb.put(params, (error, result) => {
    if (error) {
      callback(null, ApiResponseUtils.createErrorResponse(error));
    }
    callback(null, ApiResponseUtils.createResponse201(null, {}));
  });
};
