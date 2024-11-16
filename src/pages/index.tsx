import CleanupBar from "@/components/cleaup_bar";
import SpillLine from "@/components/spill_line";

import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
    return (
        <DefaultLayout>
            <div className="border-2 mx-auto max-w-4xl">
                <section className="flex flex-col  border-green-300">
                    <div className="border-red-400">
                        <p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean blandit ante sed fringilla dignissim. Nulla nisi purus, pretium et fringilla quis, tempus ut sapien. Nulla eu arcu fringilla, sagittis justo eu, aliquam arcu. Nulla nec dictum velit. Cras sit amet est malesuada, efficitur dolor ac, vehicula urna. Proin et pulvinar turpis. Sed lorem sem, gravida rutrum risus vel, sodales rhoncus risus. Sed tempus maximus tempus. Nam finibus purus non finibus egestas. Proin imperdiet lectus mi, in elementum ipsum convallis a. Mauris cursus, justo sit amet fringilla accumsan, justo ipsum fringilla nisl, eget efficitur eros ex nec ante. Aenean ut condimentum urna. Vivamus varius eu nisl sit amet consectetur. Vivamus vitae bibendum orci, quis efficitur metus. Sed malesuada tellus ut magna rutrum, sed malesuada ipsum vulputate. Aenean consectetur, sem nec porta sodales, dolor tellus placerat lorem, quis molestie quam odio sed massa. </p></p>
                    </div>
                </section>
                <section className="flex flex-col items-center justify-center">
                    <h2>Spill per Year in Indiana</h2>
                    <div className="h-80 w-full border-2 border-red-400">
                        <SpillLine />
                    </div>
                </section>

                <section className="flex flex-col items-center justify-center">
                    <h2>Spill Cleanup Status</h2>
                    <div className="h-80 w-full border-2 border-red-400">
                        <CleanupBar />
                    </div>
                </section>

            </div>

        </DefaultLayout>
    );
}
