import { ApiResponseUtils } from '../common/apiResponseUtils';
import { Interceptor } from '../common/interceptor';
import * as line from './line';

/**
 * LineからのWebhookを受ける
 */
export const postLine = (event, contents, callback): void => {
  console.log('[INFO]event: ' + JSON.stringify(event));
  const body = JSON.parse(event.body);
  const lineEvent = body.events[0];
  const type = lineEvent.type;
  console.log('[DEBUG]type: ' + type);
  switch (type){
    case 'follow':
      line.addUsers(lineEvent, contents, callback);
      break;
    case 'message':
      line.receiveMessages(lineEvent, contents, callback);
      break;
    case 'join':
    case 'unfollow':
    case 'leave':
    case 'postback':
    default:
            // TODO あとで直す
      callback(null, 'まだできないよ');
      break;
  }
};
