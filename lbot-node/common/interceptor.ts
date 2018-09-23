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
    const body = event.body? JSON.parse(event.body) : null;
    if(body && body.ownerId && body.taskName){
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

  static validateUpadateTasks = (event) => {
    
    const body = event.body? JSON.parse(event.body) : null;
    console.log(JSON.parse(event.body));
    if(body.taskName || body.dueDate || body.assignedUserId){
      return Promise.resolve();
    }else{
      return Promise.reject({statuCode: 400, message: 'パラメータが不正です'});
    }
  }

  static validateUpdateComplicationStatus = (event) => {
    const body = event.body? JSON.parse(event.body) : null;
    if(typeof(body.) === 'boolean'){
      return Promise.resolve();
    }else{
      return Promise.reject({statuCode: 400, message: 'パラメータが不正です'});
    }
  }
}