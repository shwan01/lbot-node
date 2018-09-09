export namespace ApiResponseTypes {

  /**
   * エラー用レスポンス
   */
  export interface ApiErrorResponse {
    statusCode: number;
    body: string;
  }

  /**
   * TODO一覧取得APIレスポンス
   */
  export interface GetTodosListResponse {
    todos: [
      {
        id: string,
      }
    ];
  }
}
