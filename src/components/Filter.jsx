import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({handler})=> {
    return (
    <div>
        filter show with
        <input type = 'text' onChange = {handler} ></input> 
    </div>
    )
}
Filter.propTypes = {
    handler: PropTypes.func.isRequired,
}
export default Filter