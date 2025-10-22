/* jshint ignore:start */

/* global React, Chart */

class ChartHome extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        const ctx = this.chartRef.current.getContext('2d');
        let chartType = this.props.type || 'bar';
        let chartData = {};
        let chartOptions = {};
        // Configuración según el tipo de gráfico
        if (chartType === 'bar') {
            chartData = {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [
                    {
                        label: 'Ventas mes anterior',
                        data: [100, 140, 160, 80, 180, 150, 190, 170, 210, 200, 230, 250],
                        backgroundColor: 'rgba(255, 0, 0, 0.7)', 
                        borderRadius: 8,
                        borderSkipped: false
                    },
                    {
                        label: 'Ventas mes actual',
                        data: [120, 150, 180, 90, 200, 170, 210, 190, 230, 220, 250, 270],
                        backgroundColor: 'rgba(0, 0, 255, 0.7)', 
                        borderRadius: 8,
                        borderSkipped: false
                    }
                ]
            };
            chartOptions = {
                responsive: true,
                plugins: {
                    legend: { display: true, position: 'bottom' },
                    title: { display: true }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: 'var(--primary-dark)' }
                    },
                    y: {
                        grid: { color: 'rgba(67,97,238,0.08)' },
                        ticks: { color: 'var(--primary-dark)' }
                    }
                }
            };
        } else if (chartType === 'line') {
            chartData = {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [
                    {
                        label: 'Productos vendidos mes anterior',
                        data: [70, 90, 110, 60, 140, 120, 160, 130, 180, 170, 190, 210],
                        fill: true,
                        borderColor: 'rgba(255, 0, 0, 0.7)', 
                        backgroundColor: 'rgba(255, 0, 0, 0.3)',
                        tension: 0.4,
                        pointRadius: 4,
                        pointBackgroundColor: 'rgba(255, 0, 0, 0.7)', 
                    },
                    {
                        label: 'Productos vendidos mes actual',
                        data: [80, 100, 130, 70, 160, 140, 180, 150, 200, 190, 210, 230],
                        fill: true,
                        borderColor: 'rgba(0, 0, 255, 0.7)', 
                        backgroundColor: 'rgba(0, 0, 255, 0.3)',
                        tension: 0.4,
                        pointRadius: 4,
                        pointBackgroundColor: 'rgba(0, 0, 255, 0.7)', 
                    }
                ]
            };
            chartOptions = {
                responsive: true,
                plugins: {
                    legend: { display: true, position: 'bottom' },
                    title: { display: true }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: 'var(--primary-dark)' }
                    },
                    y: {
                        grid: { color: 'rgba(255,159,64,0.08)' },
                        ticks: { color: 'var(--primary-dark)' }
                    }
                }
            };
        } else if (chartType === 'doughnut') {
            chartData = {
                labels: ['Clientes nuevos', 'Clientes recurrentes', 'Clientes inactivos'],
                datasets: [{
                    label: 'Clientes',
                    data: [45, 120, 30],
                    backgroundColor: [
                        'rgba(0, 0, 255, 0.7)', 
                        'rgba(255, 94, 0, 0.7)',
                        'rgba(255, 0, 0, 0.7)',
                    ],
                    borderWidth: 2,
                    borderColor: 'rgba(255,255,255,0.8)'
                }]
            };
            chartOptions = {
                responsive: true,
                plugins: {
                    legend: { display: true, position: 'bottom' },
                    title: { display: true }
                }
            };
        }
        this.chart = new Chart(ctx, {
            type: chartType,
            data: chartData,
            options: chartOptions
        });
    }
    componentWillUnmount() {
        if (this.chart) this.chart.destroy();
    }
    render() {
        return (
            <div style={{display: "flex", justifyContent: "center", width: '100%', height: '180px'}}>
                <canvas ref={this.chartRef} style={{width: '100%', height: '180px'}}></canvas>
            </div>
        );
    }
}

window.ChartHome = ChartHome;

/* jshint ignore:end */