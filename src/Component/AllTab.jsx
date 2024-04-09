import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Nav from 'react-bootstrap/Nav';
import WeeklyHours from './Weekly';

function AllTab() {
    const button = [
        { 'name': 'Daily', 'code': 'daily' },
        { 'name': 'Weekly', 'code': 'weekly' },
        { 'name': 'Month', 'code': 'month' },
    ]
    const [selectedButton, setSelectedButton] = useState('weekly');
    const handleChange = (code) => {
        setSelectedButton(code);
    }

    return (
        <>
            <Nav fill variant="tabs" className='mt-3' size="lg">
                {button.map(({ name, code }) => {
                    return (
                        <Nav.Item>
                            <Nav.Link onClick={() => { handleChange(code) }} style={{ color: selectedButton == code ? 'blue' : 'white' }}>{name}</Nav.Link>
                        </Nav.Item>
                    )
                })}

            </Nav>
            {selectedButton == 'weekly' &&
                <WeeklyHours />
            }
        </>
    )
}

export default AllTab;