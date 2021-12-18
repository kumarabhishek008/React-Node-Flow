import React, { useState } from 'react';
import './sidebar.css';
import { CloseOutlined } from '@material-ui/icons'
import { Button } from '@material-ui/core';

const options = [
    {
        key : 'option_1',
        value : 'Option 1',
        active : false,
    },
    {
        key : 'option_2',
        value : 'Option 2',
        active : false,
    },
    {
        key : 'option_3',
        value : 'Option 3',
        active : false,
    },
    {
        key : 'option_4',
        value : 'Option 4',
        active : false,
    },
    {
        key : 'option_5',
        value : 'Option 5',
        active : false,
    },
]

const Component2 = () => {
    const [data, setData] = useState(options);
    const [open, setOpen] = useState(true);

    const handleClickActive = (e, key) => {

        // const activeElements = Array.from(document.getElementsByClassName('active'));
        // activeElements.forEach(ele=>{
        //     if(ele.classList.contains('active')){
        //         ele.classList.remove('active');
        //     }
        // });
        // e.target.classList.add('active');

        setData([...data.map(item => {
            if(item.key == key){
                item.active = true;
            }else{
                item.active = false
            }
            return item
        })]);
    }

    const handleOpenSidebar = () => {
        setOpen(true)
        const element = Array.from(document.getElementsByClassName('sidebar'));
        element[0].classList.remove('removeSidebar')
        element[0].classList.add('sidebar');
    }
    

    const handleCloseSidebar = () => {
        // setOpen(false);
        const element = Array.from(document.getElementsByClassName('sidebar'));
        element[0].classList.remove('sidebar');
        element[0].classList.add('removeSidebar');
        setTimeout(() => {
            setOpen(false)
        }, 200);
    }
    
    
    return (
        <div style={{display:'flex'}}>
            <Button variant="contained" color="primary" size="large" onClick={handleOpenSidebar}>Open</Button>
            <div className='sidebar_cover'>
                {
                        open &&
                        <div className={open ? 'sidebar' : ''}>
                            <div className='sidebar_header'>
                                <h1>React Sidebar</h1>
                                <CloseOutlined onClick={handleCloseSidebar} style={{cursor:'pointer'}}/>
                            </div>
                            <ul>
                                {
                                    data.map(items=>
                                        <li key={items.key} onClick={(e)=>handleClickActive(e,items.key)} className={items.active ? 'active' : ''}>
                                            {
                                                items.value
                                            }
                                        </li>
                                        )
                                }
                            </ul>
                        </div>
                }
            </div>
        </div>
    )
}

export default Component2

