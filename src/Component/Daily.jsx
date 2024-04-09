import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Chart from 'chart.js';

const DailyReport = () => {
    const [studyHours, setStudyHours] = useState(() => parseInt(localStorage.getItem('studyHours')) || 0);
    const [exerciseHours, setExerciseHours] = useState(() => parseFloat(localStorage.getItem('exerciseHours')) || 0);
    const [workHours, setWorkHours] = useState(() => parseInt(localStorage.getItem('workHours')) || 0);
    const [otherHours, setOtherHours] = useState(() => parseInt(localStorage.getItem('otherHours')) || 0);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const totalHoursInDay = 24;
        const remainingHours = totalHoursInDay - (studyHours + exerciseHours + workHours + otherHours);

        const data = {
            labels: ['Study', 'Exercise', 'Work', 'Other', 'Remaining'],
            datasets: [{
                label: 'Hours',
                data: [studyHours, exerciseHours, workHours, otherHours, remainingHours],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            }],
        };

        setChartData(data);

        // Update localStorage
        localStorage.setItem('studyHours', studyHours);
        localStorage.setItem('exerciseHours', exerciseHours);
        localStorage.setItem('workHours', workHours);
        localStorage.setItem('otherHours', otherHours);
    }, [studyHours, exerciseHours, workHours, otherHours]);

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

    const handleInputChange = (e, setter, maxHours) => {
        const hours = parseFloat(e.target.value);
        if (!isNaN(hours) && hours >= 0 && hours <= maxHours) {
            setter(hours);
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h2 className="title">Daily Report</h2> {/* Apply custom class for title */}
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label className="label">Study (Max 15h):</Form.Label> {/* Apply custom class for label */}
                            </Col>
                            <Col>
                                <Form.Control type="number" value={studyHours} onChange={(e) => handleInputChange(e, setStudyHours, 15)} min="0" max="15" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label className="label">Exercise (Max 1.5h):</Form.Label> {/* Apply custom class for label */}
                            </Col>
                            <Col>
                                <Form.Control type="number" value={exerciseHours} onChange={(e) => handleInputChange(e, setExerciseHours, 1.5)} step="0.5" min="0" max="1.5" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label className="label">Work (Max 3h):</Form.Label> {/* Apply custom class for label */}
                            </Col>
                            <Col>
                                <Form.Control type="number" value={workHours} onChange={(e) => handleInputChange(e, setWorkHours, 3)} min="0" max="3" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label className="label">Other (Max 7h):</Form.Label> {/* Apply custom class for label */}
                            </Col>
                            <Col>
                                <Form.Control type="number" value={otherHours} onChange={(e) => handleInputChange(e, setOtherHours, 7)} min="0" max="7" />
                            </Col>
                        </Row>
                    </Form.Group>
                </Col>
                <Col>
                    <canvas id="chart" />
                </Col>
            </Row>
        </Container>
    );
};

export default DailyReport;
