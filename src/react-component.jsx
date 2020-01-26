import React from 'react'
import ReactDOM from 'react-dom';
import '@css/App.scss';

class EasyComponent extends React.Component {
    render(){
        return (
            <div>
                <h1 id='text'>Hello Webpack from React!</h1>
            </div>
        )
    }
}

ReactDOM.render(<EasyComponent/>,document.getElementsByClassName('box')[0]);