import React from 'react';
function Error(props){
    return(<h3 className="red">
        {props.err}
    </h3>);
}

export default Error;