import { DynamoDB, Lambda, Response } from 'aws-sdk';
import * as request from 'request-promise';
import * as line from '@line/bot-sdk';

/**
 * 友達登録したユーザーのIDをDBに保存
 */
export const addUsers = (lineEvent, contents, callback): void => {
  const dynamoDb = new DynamoDB.DocumentClient();
  const userId = lineEvent.source.userId;
  const params = {
    TableName: 'user',
    Item: {
      ownerId: userId,
    },
  };
  dynamoDb.put(params, (error, result) => {
    if (error) {
          // TODO あとでログ全部見直す
      console.log('[ERROR]ユーザー登録エラー' + error);
    }else{
      console.log('[INFO]ユーザー登録完了 userId:' + userId );
    }
    callback(null, {});
  });
};

/**
 * 受信したメッセージに応じて処理
 */
export const receiveMessages = (lineEvent, contents, callback): void => {
  console.log('[DEBUG]receiveMessages: ' + JSON.stringify(lineEvent));
  const message = lineEvent.message.text;
  const userId = lineEvent.source.userId;
  let id = lineEvent.source.roomId ? lineEvent.source.roomId : userId;
  id = lineEvent.source.groupId ? lineEvent.source.groupId : userId;
  const replyToken = lineEvent.replyToken;
  switch (message){
    case 'マイタスク一覧':
      request.get(process.env.API_URI + 'tasks?ownerId=' + id)
                .then((response) => {
                  response = JSON.parse(response);
                  console.log('[DEBUG]マイタスク一覧取得: ' + JSON.stringify(response.todos));
                  // replyMessage(JSON.stringify(response.todos), replyToken);
                  let messages: line.TemplateMessage[] = [];
                  response.todos.forEach(task => {
                    const message: line.TemplateMessage = createMessage(task)
                    messages.push(message);
                  });
                  replyCalMessage(messages, replyToken);
                })
                // .catch((error) => {
                //   console.log('[ERROR]マイタスク一覧取得: ' + JSON.stringify(error));
                //   replyMessage('なんかおかしいよ', replyToken);
                // });
      break;
    case '登録':
      //てすと用
      replyMessage('line://app/1607639347-VyorMBo8', replyToken);
    default:
      console.log('[INFO]判定外テキストを受信、処理を終了')
      // replyMessage('まだできないよ', replyToken);
      break;
  }
};

/**
 * 返信を送る
 * @param text 返信メッセージ
 * @param replyToken 返信に必要なトークン
 */
const replyMessage = (text: string, replyToken): void => {
  const client = new line.Client({
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  });

  const message: line.TextMessage = {
    type: 'text',
    text: text,
  };
  console.log('[INFO]返信メッセージ: ' + message.text);

  client.replyMessage(replyToken, message)
        .then((res) => {
          console.log('[INFO]返信完了: ' + JSON.stringify(res));
        })
        .catch((err) => {
          console.log('[ERROR]返信エラー' + JSON.stringify(err));
        });
};

/**
 * 返信を送る
 * @param text 返信メッセージ
 * @param replyToken 返信に必要なトークン
 */
const replyCalMessage = (message: line.TemplateMessage[], replyToken): void => {
  const client = new line.Client({
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  });

  console.log('[INFO]返信メッセージ: ' + JSON.stringify(message));

  client.replyMessage(replyToken, message)
        .then((res) => {
          console.log('[INFO]返信完了: ' + res);
        })
        .catch((err) => {
          console.log('[ERROR]返信エラー' + err);
        });
};

const createMessage = (task) :line.TemplateMessage => {

  const template :line.TemplateButtons = {
    type: "buttons",
    title: task.taskName,
    text: "期限：なし",
    actions: [
      {
        type: "postback",
        label: "まかせて😎",
        data: "action=assign"
      },
      {
        type: "postback",
        label: "もっと見る",
        data: "action=detail"
      }
  ]
  };
  if(task.dueDate){
    template['text'] = "期限：" + task.dueDate;
  }

  const message :line.TemplateMessage = {
          "type": "template",
          "altText": "登録されたタスクがあります",
          "template": template
  };
  console.log(message);
  return message;
}
