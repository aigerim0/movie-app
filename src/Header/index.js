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
            setSearch('')
        }
    }
    return (
        <header className='header'>

          <div className='container header-container'>
              <i className='bx bx-camera-movie logo'></i>
              <div className='search-inputBtn'>
                  <Link to={`/`} className='home'>Home</Link>
                  <input className='search' value={search} onKeyDown={e => {if(e.key === "Enter") handleBtn()}} onChange={handleInput} type="text" placeholder='Search...'/>
                  <button onClick={handleBtn} className='search-btn'><i className='bx bx-search'></i></button>

              </div>
          </div>
        </header>
    );
};

export default Header;

