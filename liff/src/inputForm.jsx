import React from 'react';
import ReactDOM from 'react-dom';


export default class InputForm extends React.Component {

    //エラーが出て進まない、、、、、
    callAddTasksApi() {
        //const {userId} = this.props;
        //const formData = new FormData(ReactDOM.findDOMNode(this.refs.form));
        const url = 'https://xi9q10jx5j.execute-api.ap-northeast-1.amazonaws.com/dev/tasks';
        const data = {
            "ownerId": "hoge",
            "taskName": "hoge"
         }
         console.log(data);
        $.ajax({
            url: url,
            type:'POST',
            data : JSON.stringify(data),
            contentType: 'application/JSON',
            dataType : 'JSON',
        }).done(function (data) {
            alert('ok');
        }).fail(function (err) {
            console.log(JSON.stringify(err));
            alert('err');
        });
    }

    render() {
        return (
            <div>
            <form ref={'form'}>
                <div>
                    <div className={"mdl-textfield mdl-js-textfield mdl-textfield--floating-label"}>
                        <input name={'taskName'} className={"mdl-textfield__input input-big"} type={"text"} id={"taskName"}/>
                        <label className={"mdl-textfield__label label-big"} for={"taskName"}>なにするの?</label>
                    </div>
                </div>
                <div className={"pdb10"}>
                    <div className={"mdl-textfield mdl-js-textfield"}>
                        <label className={"mdl-textfield__label label-big height80"} for={"dueDate"}>いつまで?</label>
                    </div>
                </div>
                <div className={"pl50"}> 
                    <label className={"mdl-radio mdl-js-radio mdl-js-ripple-effect pdr10"} for={"option-1"}>
                            <input type="radio" id="option-1" className={"mdl-radio__button"} name={"options"} value="1" checked/>
                            <span className={"mdl-radio__label fo20"}>今日</span>
                    </label>
                    <label className={"mdl-radio mdl-js-radio mdl-js-ripple-effect pdr10"} for={"option-2"}>
                            <input type="radio" id="option-2" className={"mdl-radio__button"} name={"options"} value="2"/>
                            <span className={"mdl-radio__label fo20"}>明日</span>
                    </label>
                    <label className={"mdl-radio mdl-js-radio mdl-js-ripple-effect"} for={"option-3"}>
                            <input type="radio" id="option-3" className={"mdl-radio__button"} name={"options"} value="3"/>
                            <span className={"mdl-radio__label fo20"}>そのうち</span>
                    </label>   
                </div>
                <div className={"pdt30"}>
                    <button className={"taskSubmitbtn"} onClick={() => this.callAddTasksApi()}>登録</button>
                </div>   
            </form>
            </div>
        );
    }
}