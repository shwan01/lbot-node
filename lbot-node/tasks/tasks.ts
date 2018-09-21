import { DynamoDB } from 'aws-sdk';
import { ApiResponseUtils } from '../common/apiResponseUtils';

/**
 * ユーザー別タスク一覧取得API
 */
export const getTasksList = (event, contents, callback): void => {
  const dynamoDb = new DynamoDB.DocumentClient();
  const params = {
    TableName: 'task',
    KeyConditionExpression: '#primeKey = :primeKeyValue AND begins_with(#rengeKey, :rengeKeyValue)',
    ExpressionAttributeNames: {
      '#primeKey': 'ownerId',
      '#rengeKey': 'timestamp',
    },
    ExpressionAttributeValues: {
      ':primeKeyValue': event.queryStringParameters.ownerId,
      ':rengeKeyValue': '20',
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
  const timestamp = new Date();
  body = JSON.parse(event.body);
  const params = {
    TableName: 'task',
    Item: {
      ownerId: body.ownerId,
      timestamp: timestamp.toISOString(),
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

/**
 * タスク削除API
 */
export const deleteTasks = (event, content, callback): void => {
  const dynamoDb = new DynamoDB.DocumentClient();
  const params = {
    TableName: 'task',
    Key: {
      ownerId: event.queryStringParameters.ownerId,
      timestamp: event.queryStringParameters.timestamp,
    },
  };
  dynamoDb.delete(params, (error, result) => {
    if (error) {
      callback(null, ApiResponseUtils.createErrorResponse(error));
    }
    callback(null, ApiResponseUtils.createResponse204(null, {}));
  });
};
