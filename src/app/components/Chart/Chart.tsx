import { Line } from 'react-chartjs-2';
import * as ChartJS from 'chart.js';
import styled from "styled-components";
import {transparentize} from "polished";
import Heading from "../Typography/Heading";
import NoData from "../NoData/NoData";


const options: ChartJS.ChartOptions = {
    maintainAspectRatio: true,
    elements: {
        line: {
            tension: 0
        }
    },
    legend: {
        display: true,
        position: 'bottom',
        align: 'center',
        labels: {
            usePointStyle: true
        }
    },
    scales: {
        xAxes: [
            {
                display: true,
                gridLines: {
                    display: false
                }
            }
        ],
        yAxes: [
            {
                type: 'linear',
                display: false,
                position: 'left',
                id: 'cashflow',
            }
        ],
    },
};

export interface ChartProps {
    data: ChartJS.ChartData;
    title: string;
}

export default function Chart ({ data, title }: ChartProps) {
    return <ChartWrapper style={{ width: '100%' }}>
        <div style={{ marginBottom: 16}}>
            <Heading level={3}>
                { title }
            </Heading>
        </div>

        {/*Width e Height é uma proporção nesse componente Line e não um Width e Height real.*/}
        {
            data ?
                <Line
                    type="line"
                    height={139}
                    width={600}
                    data={data}
                    options={options}
                />
            : <NoData height={139} />
        }

    </ChartWrapper>
}

const ChartWrapper = styled.div`
    text-align: center;
    border: 1px solid ${transparentize(0.9, '#274060')};
    padding: 20px;
`;