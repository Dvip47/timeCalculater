import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Chart from 'chart.js';

const WeeklyHours = () => {
    const [sleepHours, setSleepHours] = useState();
    const [officeHours, setOfficeHours] = useState();
    const [isOfficeChecked, setIsOfficeChecked] = useState(true);
    const [isToggleOpen, setIsToggleOpen] = useState(false);
    const [miscellaneousHours, setMiscellaneousHours] = useState(2);
    const [chartData, setChartData] = useState(null);
    let remainingHours = 0;
    useEffect(() => {
        const totalHoursInWeek = 168;
        const totalSleepHours = sleepHours?7 * sleepHours:0;
        remainingHours = totalHoursInWeek - totalSleepHours;

        let officeHoursInWeek = 0;
        if (isOfficeChecked) {
            officeHoursInWeek = officeHours ? officeHours * 5 : 0;
        }

        const totalMiscellaneousHours = miscellaneousHours * 7;

        const studyHours = remainingHours - officeHoursInWeek - totalMiscellaneousHours;

        const data = {
            labels: ['Sleep', 'Office/School', 'Miscellaneous', 'Study'],
            datasets: [{
                label: 'Hours',
                data: [totalSleepHours, officeHoursInWeek, totalMiscellaneousHours, studyHours],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            }],
        };

        setChartData(data);
    }, [sleepHours, officeHours, isOfficeChecked, miscellaneousHours]);

    useEffect(() => {
        const ctx = document.getElementById('chart');
        if (ctx && chartData) {
            new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                            },
                        }],
                    },
                },
            });
        }
    }, [chartData]);

    const toggleHover = () => {
        setIsToggleOpen(!isToggleOpen);
    };
    const handleSleepChange = (e) => {
        const hours = parseInt(e.target.value);
        if (!isNaN(hours) && hours >= 4) {
            setSleepHours(hours);
        }
    };

    const handleOfficeChange = (e) => {
        setIsOfficeChecked(e.target.checked);
    };

    const handleOfficeHoursChange = (e) => {
        const hours = parseInt(e.target.value);
        if (!isNaN(hours) && hours >= 0 && hours <= 12) {
            setOfficeHours(hours);
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h2>Study Hours Calculator</h2>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Sleep Hours per Day:</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" value={sleepHours} onChange={handleSleepChange} min="0" max={7} />
                            </Col>
                            <Col md={1}></Col>
                        </Row>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Office/School per Day:</Form.Label>

                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control type="number" value={officeHours} onChange={handleOfficeHoursChange} min="0" max="12" />
                            </Form.Group>
                        </Col>

                        <Col md={1}>
                            <Form.Group>
                                <Form.Check
                                    type="checkbox"
                                    checked={isOfficeChecked}
                                    onChange={handleOfficeChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Miscellaneous:</Form.Label>
                        </Col>
                        <Col>
                            <span>{miscellaneousHours}</span>
                            <i
                                className="fa fa-info-circle ms-2"
                                style={{ cursor: 'pointer' }}
                                onMouseEnter={toggleHover}
                                onMouseLeave={toggleHover}
                                aria-hidden="true"
                            ></i>

                        </Col>
                        <Col>
                            {isToggleOpen && (
                                <div className="toggle-content">
                                    <p>Bothing+Eatingand other routine things</p>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <canvas id="chart" />
                </Col>
            </Row>

        </Container>
    );
};

export default WeeklyHours;
