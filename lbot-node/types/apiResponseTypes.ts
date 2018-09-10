export namespace ApiResponseTypes {

  /**
   * エラー用レスポンス
   */
  export interface ApiErrorResponse {
    statusCode: number;
    body: string;
  }

  /**
   * タスク一覧取得APIレスポンス
   */
  export interface GetTasksListResponse {
    todos: [
      {
        id: string,
      }
    ];
  }
}
