import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input } from 'reactstrap';
import { SearchIcon } from '../Icons';

const Searching = (props) => {
    const { onSearchValueChange, value } = props;

    function handleOnChange(value) {
        onSearchValueChange(value);
    }

    function handleOnKeyUp(e){
        e.preventDefault();
        if(e.key === 'Enter' || e.keyCode === '13'){
            onSearchValueChange(e.target.value);
        }
    }

    return (
        <FormGroup className="search-by-name">
            <Input onChange={e => handleOnChange(e.target.value)}
            value={value}
            onKeyUp={e => handleOnKeyUp(e)}
            type="text" name="searchByName" placeholder="Search by name" className="w-100" />
            <SearchIcon stylingId="search-by-name-icon" />
        </FormGroup>
    );
}

Searching.defaultProps = {
    searchValue: '',
    onSearchValueChange: null
};

Searching.propTypes = {
    searchValue: PropTypes.string,
    onSearchValueChange: PropTypes.func
};

export default Searching;