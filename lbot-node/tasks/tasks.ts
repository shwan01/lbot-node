import { DynamoDB } from 'aws-sdk';
import { ApiResponseUtils } from '../common/apiResponseUtils';
import { join } from 'bluebird';

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


/**
 * タスク情報更新API
 */
export const updateTasks = (event, content, callback): void => {
  const dynamoDb = new DynamoDB.DocumentClient();
  const body = JSON.parse(event.body);
  // update the isComplicated to the database
    dynamoDb.update(generateParams(body), (error, result) => {
      // handle potential errors
      if (error) {
          callback(null, ApiResponseUtils.createErrorResponse(error));
          }
      callback(null, ApiResponseUtils.createResponse201(null, {}));
  });
};

/**
 * 完了ステータス更新API
 */
export const updateComplicationStatus = (event, content, callback): void => {
  const dynamoDb = new DynamoDB.DocumentClient();
  const body = JSON.parse(event.body);
  const params = {
    TableName: 'task',
    Key:{
      "ownerId": body.ownerId,
      "timestamp": body.timestamp,
  },
    UpdateExpression: "set isComplicated = :r",
    ExpressionAttributeValues:{
        ":r": body.isComplicated,
      },
    ReturnValues:"UPDATED_NEW"
      };
  // update the isComplicated to the database
    dynamoDb.update(params, (error, result) => {
      // handle potential errors
      if (error) {
          callback(null, ApiResponseUtils.createErrorResponse(error));
          }
      callback(null, ApiResponseUtils.createResponse201(null, {}));
  });
};

/** 
 *  タスク情報更新APIのparamを生成
*/

const generateParams =(body) => {

  let updateExpression =  "set ";
  var attributeMap ={};
  if (body.isComplicated) {
    updateExpression += "isComplicated = :t, "
    attributeMap[":t"]= body.isComplicated;
  };
  if (body.taskName) {
    updateExpression += "taskName = :r, "
    attributeMap[":r"]=  body.taskName;
  };
  if (body.dueDate) {
    updateExpression += "dueDate = :s, "
    attributeMap[":s"]=  body.dueDate;
  };
  if (body.assignedUserId) {
    updateExpression += "assignedUserId = :p, "
    attributeMap[":p"]=  body.assignedUserId;
  };
  const ModifiedUpdateExpression = updateExpression.slice(0, -2);
  let params = {
    TableName: 'task',
    Key:{
      "ownerId": body.ownerId,
      "timestamp": body.timestamp,
    },
    UpdateExpression: ModifiedUpdateExpression,
    ExpressionAttributeValues:attributeMap,
    ReturnValues:"UPDATED_NEW",
      };
      console.log(params);
    return params;
  }

/**
 * 毎朝タスク通知API
 * 午前7時に所持している未完了タスクを通知する
 */
export const mornigNotifyTasks = (event, content, callback): void => {
  const dynamoDb = new DynamoDB.DocumentClient();
  const Params = {
    TableName: 'task',
  };
  let response = new Map();
   // 未完了タスクのみにする
  // tasks全部持ってくる
  dynamoDb.scan(Params, (error, result) => {
    if (error) {
      callback(null, ApiResponseUtils.createErrorResponse(error));
    }
    // 未完了タスクのみ選択
    for (let i in result.Items){
      const incompleteTasks = new Array();
      if (i. get(isComplicated) = 0){
        incompleteTasks.push(i);
    }
      response.set(i.get(ownerId),incompleteTasks);
    };
    callback(null, ApiResponseUtils.createResponse200(null, response));
  });
};