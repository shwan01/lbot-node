import React from 'react';
import InputForm from './inputForm';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
        };
    }

    componentWillMount() {
        liff.init(
            data => {
              const userId = data.context.userId;
              this.setState({userId: userId});
            }
        )
    }

    render() {
        return (
                <InputForm
                    userId={this.state.userId}
                />
        )
    }

}