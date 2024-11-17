import CleanupBar from "@/components/cleaup_bar";
import SpillLine from "@/components/spill_line";
import PieChart from "@/components/pi_chart";
import DefaultLayout from "@/layouts/default";
import { Spacer } from "@nextui-org/spacer";

export default function IndexPage() {
    return (
        <DefaultLayout>
            <div className="mx-auto max-w-4x">
                <section className="border-l-8 border-gray-500 flex flex-col items-center justify-center bg-slate-100 rounded-r-3xl shadow-xl">
                    <h2 className="font-bold pb-2 text-lg">About the spills in Indiana</h2>
                    <Spacer y={3} />
                    <h2>Spill per Year in Indiana</h2>
                    <div className="h-80 w-full">
                        <SpillLine />
                        <p className="text-center bg-white w-fit mx-auto m-2 px-1 rounded-md"><span className="italic">Figure 1:</span> This figure shows the spills reported in Indiana for each year from 2010 to 2014.</p>
                    </div>
                </section>

                <Spacer y={20} />

                <section className="border-l-8 border-gray-500 flex flex-col items-center justify-center bg-slate-100 rounded-r-3xl shadow-xl">
                    <h2 className="font-bold pb-2 text-lg">Toxins over the Years</h2>

                    <Spacer y={3} />

                    <h2>Cumulative Toxins from 2010 - 2024</h2>
                    <div className="h-[54rem] w-full">
                        <CleanupBar />
                        <p className="text-center bg-white w-fit m-2 px-1 mt-4 rounded-md mx-auto"><span className="italic">Figure 2:</span> This figure shows the detected toxins from 2010 to 2014.</p>
                    </div>
                    <Spacer y={3} />
                </section>

                <Spacer y={20} />

                <section className="border-l-8 border-gray-500 flex flex-col items-center justify-center bg-slate-100 rounded-r-3xl shadow-xl">
                    <h2 className="font-bold pb-2 text-lg">2023 Toxin Ratio</h2>

                    <Spacer y={3} />

                    <h2></h2>
                    <div className="h-80 w-full">
                        <PieChart />
                        <p className="text-center bg-white w-fit m-2 px-1 rounded-md mx-auto"><span>Figure 3: </span>The figure above splits the carcinogenics into two groups for 2023.</p>
                    </div>
                </section>

                <Spacer y={20} />

            </div>
        </DefaultLayout>
    );
}
