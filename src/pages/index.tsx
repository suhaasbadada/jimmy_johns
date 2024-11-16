import { ResponsiveLine } from "@nivo/line";

import DefaultLayout from "@/layouts/default";
import data from "@/data/dummy_line.json";
import data2 from "@/data/dummy_line2.json";
import spill_data from "@/data/spill_graph_data.json";

export default function IndexPage() {
    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="h-72 w-3/4 border-2 border-red-400">
                    <p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean blandit ante sed fringilla dignissim. Nulla nisi purus, pretium et fringilla quis, tempus ut sapien. Nulla eu arcu fringilla, sagittis justo eu, aliquam arcu. Nulla nec dictum velit. Cras sit amet est malesuada, efficitur dolor ac, vehicula urna. Proin et pulvinar turpis. Sed lorem sem, gravida rutrum risus vel, sodales rhoncus risus. Sed tempus maximus tempus. Nam finibus purus non finibus egestas. Proin imperdiet lectus mi, in elementum ipsum convallis a. Mauris cursus, justo sit amet fringilla accumsan, justo ipsum fringilla nisl, eget efficitur eros ex nec ante. Aenean ut condimentum urna. Vivamus varius eu nisl sit amet consectetur. Vivamus vitae bibendum orci, quis efficitur metus. Sed malesuada tellus ut magna rutrum, sed malesuada ipsum vulputate. Aenean consectetur, sem nec porta sodales, dolor tellus placerat lorem, quis molestie quam odio sed massa. </p></p>
                </div>
            </section>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <p>test</p>
                <div className="h-72 w-3/4 border-2 border-red-400">
                    <ResponsiveLine
                        animate
                        enablePointLabel
                        enableTouchCrosshair
                        useMesh
                        axisBottom={{
                            format: "%b %d",
                            legendOffset: 36,
                            legend: "time",
                            legendPosition: "middle",
                            tickValues: "every 2 years",
                        }}
                        axisLeft={{
                            legendOffset: -35,
                            legendPosition: "middle",
                            legend: "Toxins"
                        }}
                        curve="monotoneX"
                        data={spill_data}
                        legends={[
                            {
                                anchor: "bottom-right",
                                direction: "column",
                                justify: false,
                                translateX: 100,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: "left-to-right",
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: "circle",
                                symbolBorderColor: "rgba(0, 0, 0, .5)",
                                effects: [
                                    {
                                        on: "hover",
                                        style: {
                                            itemBackground:
                                                "rgba(0, 0, 0, .03)",
                                            itemOpacity: 1,
                                        },
                                    },
                                ],
                            },
                        ]}
                        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
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
                </div>
                <div className="h-72 w-3/4 border-2">
                    <ResponsiveLine
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "transportation",
                            legendOffset: 36,
                            legendPosition: "middle",
                            truncateTickAt: 0,
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "count",
                            legendOffset: -40,
                            legendPosition: "middle",
                            truncateTickAt: 0,
                        }}
                        axisRight={null}
                        axisTop={null}
                        data={data2}
                        enableTouchCrosshair={true}
                        legends={[
                            {
                                anchor: "bottom-right",
                                direction: "column",
                                justify: false,
                                translateX: 100,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: "left-to-right",
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: "circle",
                                symbolBorderColor: "rgba(0, 0, 0, .5)",
                                effects: [
                                    {
                                        on: "hover",
                                        style: {
                                            itemBackground:
                                                "rgba(0, 0, 0, .03)",
                                            itemOpacity: 1,
                                        },
                                    },
                                ],
                            },
                        ]}
                        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                        pointBorderColor={{ from: "serieColor" }}
                        pointBorderWidth={2}
                        pointColor={{ theme: "background" }}
                        pointLabel="data.yFormatted"
                        pointLabelYOffset={-12}
                        pointSize={10}
                        useMesh={true}
                        xScale={{ type: "point" }}
                        yFormat=" >-.2f"
                        yScale={{
                            type: "linear",
                            min: "auto",
                            max: "auto",
                            stacked: true,
                            reverse: false,
                        }}
                    />
                </div>
            </section>
        </DefaultLayout>
    );
}
