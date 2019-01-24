import React from './react'
import ReactDOM from './react-dom'



class Counter extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            num: 0,
        }
    }

    componentWillUpdate() {
        // console.log( 'update' );
    }

    componentWillMount() {
        // console.log( 'mount' );
        // for (let i = 0; i < 10; i++) {
        //     this.setState({num: this.state.num + i});
        // }
    }

    onClick() {
        var start = new Date().getTime()
        for (let i = 0; i < 1000; i++) {
            this.setState( { num: this.state.num + 1 } ,()=>console.log('stateSave'));
        }
        var end = new Date().getTime()
        console.log(end-start)
    }

    render() {
        return (
            <div onClick={ () => this.onClick() }>
                <h1>number: {this.state.num}</h1>
                <button>add</button>
            </div>
        );
    }
}

ReactDOM.render(
    <Counter />,
    document.getElementById( 'root' )
);
