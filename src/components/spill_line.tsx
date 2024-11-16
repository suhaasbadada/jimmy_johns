import spill_data from "@/data/spill_graph_data.json";
import { ResponsiveLine } from "@nivo/line";

export default function SpillLine() {
    return (
        <ResponsiveLine
            animate
            enablePointLabel
            enableTouchCrosshair
            useMesh
            axisBottom={{
                format: "%Y",
                legendOffset: 36,
                legend: "time",
                legendPosition: "middle",
                tickValues: "every 2 years",
            }}
            axisLeft={{
                legendOffset: -45,
                legendPosition: "middle",
                legend: "Toxins"
            }}
            curve="monotoneX"
            data={spill_data}

            margin={{ top: 50, right: 20, bottom: 50, left: 50 }}
            pointBorderColor={{
                from: "color",
                modifiers: [["darker", 0.3]],
            }}

            pointBorderWidth={1}
            pointSize={16}
            xFormat="time:%Y-%m-%d"
            xScale={{
                format: "%Y-%m-%d",
                precision: "day",
                type: "time",
                useUTC: false,
            }}
            yScale={{
                type: "linear",
            }}
        />
    )
}