import React from 'react';
function Error(props){
    return(<h1 className="red">
        {props.err}
    </h1>);
}

export default Error;