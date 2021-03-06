import { renderComponent } from '../react-dom/diff'

const setStateQueue = [];
const renderQueue = [];


export function enqueueSetState( stateChange, component, calllback ) {
    // 如果queue的长度是0，也就是在上次flush执行之后第一次往队列里添加
    if ( setStateQueue.length === 0 ) {
        defer( flush );
    }
    setStateQueue.push( {
        stateChange,
        component, 
        calllback
    } );
    // 如果renderQueue里没有当前组件，则添加到队列中
    if ( !renderQueue.some( item => item === component ) ) {
        renderQueue.push( component );
    }
}

function flush() {
    let item, component;
    // 遍历
    while( item = setStateQueue.shift() ) {

        const { stateChange, component, calllback } = item;

        // 如果没有prevState，则将当前的state作为初始的prevState
        if ( !component.prevState ) {
            component.prevState = Object.assign( {}, component.state );
        }

        // 如果stateChange是一个方法，也就是setState的第二种形式
        if ( typeof stateChange === 'function' ) {
            Object.assign( component.state, stateChange( component.prevState, component.props ) );
        } else {
            // 如果stateChange是一个对象，则直接合并到setState中
            Object.assign( component.state, stateChange );
        }

        component.prevState = component.state;
        if(calllback){
            calllback()
        }
    }
    // 渲染每一个组件
    while( component = renderQueue.shift() ) {
        renderComponent( component );
    }
}

function defer( fn ) {
    return Promise.resolve().then( fn );
}