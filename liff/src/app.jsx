import React from 'react';
import InputForm from './inputForm';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type:null,
            userId: null,
            roomId: null,
            groupId: null,
            utouId: null,
        };
    }

    componentWillMount() {
        liff.init(
            data => {
              this.setState({type: data.context.type});
              this.setState({userId: data.context.userId});
              switch(data.context.type){
                  case 'utou':
                    this.setState({utouId: data.context.utouId});
                  break;
                  case 'room':
                    this.setState({roomId: data.context.roomId});
                  break;
                  case 'group':
                    this.setState({groupId: data.context.groupId});
                  break;
                  default:
                  break;
              }
            }
        )
    }

    render() {
        return (
                <div>
                    <InputForm
                        type={this.state.type}
                        userId={this.state.userId}
                        roomId={this.state.roomId}
                        groupId={this.state.groupId}
                        utouId={this.state.utouId}
                    />
                    <p className={'fo20'}>type: {this.state.type}</p>
                    <p className={'fo20'}>UserId: {this.state.userId}</p>
                    <p className={'fo20'}>roomId: {this.state.roomId}</p>
                    <p className={'fo20'}>groupId: {this.state.groupId}</p>
                </div>
        )
    }

}