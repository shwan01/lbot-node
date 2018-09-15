import * as Promise from 'bluebird';

export class Interceptor {

  static validateGetTasksList = (event) => {
    if (event.queryStringParameters && event.queryStringParameters.ownerId){
      return Promise.resolve();
    }else{
      return Promise.reject({statuCode: 400, message: 'パラメータが不正です'});
    }
  }

  static validateGetTasksById = (event) => {
    if (event.pathParameters && event.pathParameters.id){
      return Promise.resolve();
    }else{
      return Promise.reject({statuCode: 400, message: 'パラメータが不正です'});
    }
  }

  static validateAddTasks = (event) => {
    if (event.body && event.body.ownerId && event.body.taskName){
      return Promise.resolve();
    }else{
      return Promise.reject({statuCode: 400, message: 'パラメータが不正です'});
    }
  }

  static validateDeleteTasks = (event) => {
    if (event.queryStringParameters && event.queryStringParameters.ownerId && event.queryStringParameters.timestamp){
      return Promise.resolve();
    }else{
      return Promise.reject({statuCode: 400, message: 'パラメータが不正です'});
    }
  }
}
