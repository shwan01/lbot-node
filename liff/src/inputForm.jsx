import React from 'react';
import * as Bluebird from 'bluebird';
import ReactDOM from 'react-dom';
import InputFieled from './inputField';
import Plusbtn from './plusbtn';

/**
 * HackMe 多すぎ、、分割したい、、、
 */
export default class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks:[]
        };
    }

    componentWillMount() {
        const {type} = this.props;
        let id;
        switch(type){
            case 'room':
                id = this.props.roomId;
                break;
            case 'group':
                id = this.props.groupId;
                break;
            case 'utou':
            default:
                id = this.props.userId;
        }
        id = 'test01'
        const url = 'https://xi9q10jx5j.execute-api.ap-northeast-1.amazonaws.com/dev/tasks?ownerId=' + id;
        console.log('[callGetTasksApi]' + id);
        $.ajax({
            url: url,
            type:'GET',
            crossDomain: true,
        }).done(function (data) {
            console.log(JSON.stringify(data));
            data.todos.forEach((task)=>{
                this.state.tasks.push({
                    taskName: task.taskName,
                    dueDate: task.dueDate
                });
            })
            this.setState({tasks : this.state.tasks});
        }).fail(function (err) {
            console.log(JSON.stringify(err));
            // TODO: Errorの時は閉じずにエラーを教える.
            // HackMe: 今はCORSのエラーが絶対くるのでとりあえず閉じている.
        });
    }

    setDateValue(i){
        //HackMe まとめたい、、、綺麗にしたい、、、
        switch(i){
            case 0:
                var today = new Date();
                today.setDate(today.getDate());
                var yyyy = today.getFullYear();
                var mm = ("0"+(today.getMonth()+1)).slice(-2);
                var dd = ("0"+today.getDate()).slice(-2);        
                this.refs.newDate.value=yyyy+'-'+mm+'-'+dd;
                this.refs.date0.classList.add('active');
                this.refs.date1.classList.remove('active');
                this.refs.date2.classList.remove('active');
                break;
            case 1:
                var tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate()+1); //翌日の日付を取得
                var yyyy = tomorrow.getFullYear();
                var mm = ("0"+(tomorrow.getMonth()+1)).slice(-2);
                var dd = ("0"+tomorrow.getDate()).slice(-2);        
                this.refs.newDate.value=yyyy+'-'+mm+'-'+dd;
                this.refs.date0.classList.remove('active');
                this.refs.date1.classList.add('active');
                this.refs.date2.classList.remove('active');
                break;
            case 2:
                this.refs.newDate.value='';
                this.refs.date0.classList.remove('active');
                this.refs.date1.classList.remove('active');
                this.refs.date2.classList.add('active');
                break;
            default:
            break;
        }
    }
   
    addTask() {
        console.log('add');
        const taskName = this.refs.newText.value;
        const dueDate = this.refs.newDate.value;
        // タスク名フォームが空なら何もしない
        if(!taskName){
            console.log('[add]taskName is null');
            return;
        }
        // 追加
        this.state.tasks.push({
            taskName: taskName,
            dueDate: dueDate
        });

        //保存
        this.setState({tasks : this.state.tasks});
        this.submitTasks(taskName, dueDate)
        console.log('[add]'+ taskName + ' / ' + dueDate);
        // テキストフィールド初期化
        this.refs.newText.value='';
        this.refs.newDate.value='';
    }

    // 削除機能
    deleteTask(i) {
        // 削除
        this.state.tasks.splice(i, 1);
        // 保存
        this.setState({tasks : this.state.tasks});
    }

    submitTasks(taskName, dueDate){
        if(!task){
            console.log('[submit]taskName is null');
            return;
        };


        this.callAddTasksApi(taskName, dueDate);
        
        
        callApi.then(() => {
            //一旦ここに書いておく
            // TODO: ↑が終わってから（成功してから）これやるようにする。
            // メッセージの内容は仮
            liff.sendMessages([
                {
                type: 'text',
                text: '[submit]'
                }
            ]).then(() => {
                liff.closeWindow()
            })
        })

        // const messages = this.createMessage(tasks);
        // console.log(messages);
            //  エラーがでるから一旦仮のメッセージで代用
            // liff.sendMessages(messages);
    }

    createMessage(tasks){
        let messages = [];
        let columns = [];
        tasks.forEach((task) => {
            const name = task.taskName;
            const date = task.dueDate;
            let column;
            if(date){
                column = {
                    "title": task.taskName,
                    "text": "期限: " + task.dueDate,
                    "actions": [
                        {
                            "type": "uri",
                            "label": "俺にまかせろ",
                            "uri": ""
                        }
                    ]
                };
            }else{
                column = {
                    "title": task.taskName,
                    "text": "期限なし",
                    "actions": [
                        {
                            "type": "uri",
                            "label": "俺にまかせろ",
                            "uri": "http://example.com"
                        }
                    ]
                };
            }
            columns.push(column);
        });
        const message = {
                "type": "template",
                "template": {
                    "type": "carousel",
                    columns
                }
        };
        messages.push(message);
        return messages;
    }

    callAddTasksApi(taskName, dueDate) {
        const {type} = this.props;
        let id;
        switch(type){
            case 'room':
                id = this.props.roomId;
                break;
            case 'group':
                id = this.props.groupId;
                break;
            case 'utou':
            default:
                id = this.props.userId;
        }
        const url = 'https://xi9q10jx5j.execute-api.ap-northeast-1.amazonaws.com/dev/tasks';
        const data = {
            "ownerId": id,
            "taskName": taskName,
            "dueDate": dueDate
        }
        console.log('[callApi]' + data.taskName + ' / ' + data.dueDate);
        console.log(data);
        $.ajax({
            url: url,
            type:'POST',
            data : JSON.stringify(data),
            contentType: 'application/JSON',
            dataType : 'JSON',
        }).done(function (data) {
            console.log(JSON.stringify(data));
        }).fail(function (err) {
            console.log(JSON.stringify(err));
            // TODO: Errorの時は閉じずにエラーを教える.
            // HackMe: 今はCORSのエラーが絶対くるのでとりあえず閉じている.
        });
    }


    render() {
        return (
            <div>
                    <div>
                        <div className={"form-group row"}>
                            <div className={"input-group mb-3"}>
                                <input type={"text"} className={"form-control form-taskName"} placeholder={"なにする？"} ref={"newText"}/>
                                <div className={"input-group-append"}>
                                    <button className={"btn btn-outline-secondary add-btn"} type={"button"} id={"button-addon2"} onClick={() => this.addTask()}>追加</button>
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-2 mgr20">
                                <button type={"button"} className={"btn btn-outline-secondary btn-lg wi100 date-btn active"} onClick={()=>this.setDateValue(2)} ref={"date2"}>期限なし</button>
                            </div>
                            <div class="form-group col-md-2 mgr20">
                                <button type={"button"} className={"btn btn-outline-secondary btn-lg wi100 date-btn"} onClick={()=>this.setDateValue(0)} ref={"date0"}>今日中</button>
                            </div>
                            <div class="form-group col-md-2 mgr20">
                                <button type={"button"} className={"btn btn-outline-secondary btn-lg wi100 date-btn"} onClick={()=>this.setDateValue(1)} ref={"date1"}>明日</button>
                            </div>
                            <div class="form-group col-md-5">
                                <div className={"input-group"}>
                                    <div className={"input-group-append"}>
                                        <label for={"date-input"}>
                                        <span class="input-group-text date-btn" id="basic-addon2">日付指定</span>
                                        </label>
                                    </div>
                                    <input className={"form-control btn-lg date-btn"} type={"date"} id={"date-input"} ref={"newDate"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"tasks-list"}>
                    <ul class="list-group">
                        {this.state.tasks.map((task, i) => {
                            return <li key={i} class="list-group-item tasks-list-part">
                                    {task.taskName}
                                </li>
                        })}
                    </ul>
                    </div>
                    <div class="row mx-auto submit-form">
                        <div className={"mgr80"}>
                            <button type="button" class="btn btn-lg btn-primary taskSubmitbtn" onClick={() => this.submitTasks()}>送信する</button>
                        </div>
                        <div>
                            <button type="button" class="btn btn-secondary btn-lg taskSubmitbtn">もどる</button>
                        </div>
                    </div>
            </div>
        );
    }
}