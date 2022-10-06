import React from 'react';
import Search from './Search';
import UserChats from './UserChats';

const Sidebar = () => {
    return (
        <div className='flex-1'>
            <Search />
            <UserChats />
        </div>
    );
}

export default Sidebar;
