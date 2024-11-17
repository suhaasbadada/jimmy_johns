import { ResponsiveBar } from '@nivo/bar'
//import dummy_bar from "@/data/dummy_bar.json";
//import bar_data from "@/data/bar_chart_data.json";
import bar_data from "@/data/t20_reporting_counties_tri.json";

export default function BarChartCounties() {
    let size = bar_data.length;

    let k = []
    for (let i = 1; i <= size; i++) {
        //k.push(bar_data[i].x);
        k.push("y" + i.toString())
    }

    return (
        <ResponsiveBar
            data={bar_data}
            keys={
                k
            }
            layout='vertical'

            indexBy="x"
            margin={{ top: 5, right: 30, bottom: 100, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'x'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'sandwich'
                    },
                    id: 'lines'
                }
            ]}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 45,
                legend: 'County',
                legendPosition: 'middle',
                legendOffset: 90,
                truncateTickAt: 0,

            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Toxins Count',
                legendPosition: 'middle',
                legendOffset: -40,
                truncateTickAt: 0
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}

            role="application"
            ariaLabel="Toxins"
            barAriaLabel={e => e.id + ": " + e.formattedValue + " in toxins " + e.indexValue}
        />
    )
}