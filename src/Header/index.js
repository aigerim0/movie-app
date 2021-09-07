import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";

const Header = () => {
    const [search, setSearch] = useState('')
    const history = useHistory()

    const handleInput = (e) => {
        setSearch(e.target.value)
    }
    const handleBtn = () => {
        if (search.trim()) {
            history.push(`/search/multi/${search}`)
        }
    }
    return (
        <header className='header'>

            <i className='bx bx-camera-movie logo'></i>
            <div className='search-inputBtn'>
                <Link to={`/`} className='home'>Home</Link>
                <input className='search' onChange={handleInput} type="text" placeholder='Search...'/>
                <button onClick={handleBtn} className='search-btn'><i className='bx bx-search'></i></button>

            </div>
        </header>
    );
};

export default Header;