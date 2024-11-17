import { ResponsiveBar } from '@nivo/bar'
//import dummy_bar from "@/data/dummy_bar.json";
import bar_data from "@/data/bar_chart_data.json";

export default function CleanupBar() {
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
            layout='horizontal'

            indexBy="x"
            margin={{ top: 5, right: 10, bottom: 50, left: 140 }}
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
                legend: 'Count',
                legendPosition: 'middle',
                legendOffset: 45,
                truncateTickAt: 0,

            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Toxins',
                legendPosition: 'middle',
                legendOffset: -125,
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