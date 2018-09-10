import * as Promise from 'bluebird';

export class Interceptor {

    static validateGetTodosList = (event) => {
        return Promise.resolve();
    }

    static validateGetTodosById = (event) => {
        if(event.pathParameters && event.pathParameters.id){
            return Promise.resolve();
        }else{
            return Promise.reject({statuCode:400, message:'パラメータが不正です'})
        }
    }

    static validateAddTasks = (event) => {
        //TODO バリデーション
        return Promise.resolve();
    }
}
