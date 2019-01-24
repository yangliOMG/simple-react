import { enqueueSetState } from './set-state-queue'

class Component {
    constructor( props = {} ) {
        this.isReactComponent = true;

        this.state = {};
        this.props = props;
    }

    setState( stateChange, calllback ) {
        enqueueSetState( stateChange, this, calllback );
    }
}

export default Component;