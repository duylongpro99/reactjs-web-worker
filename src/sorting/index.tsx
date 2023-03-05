import { useWorker, WORKER_STATUS } from "@koale/useworker";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { bubleSort } from "../bubble-sort/bubble-sort";

const numbers = [...Array(100000)].map(() =>
    Math.floor(Math.random() * 1000000)
);

export const Sort = () => {
    const { addToast } = useToasts();
    const [status, setStatus] = useState(false);
    const [sortWorker, { status: workerStatus }] = useWorker(bubleSort);

    const onSortClick = () => {
        setStatus(true);
        const result = bubleSort(numbers);
        setStatus(false);
        addToast("Finished: Sort", { appearance: "success" });
        console.log("Buble Sort", result);
    };

    const onWorkerSortClick = () => {
        sortWorker(numbers).then((result) => {
            console.log("Buble Sort useWorker()", result);
            addToast("Finished: Sort using useWorker.", {
                appearance: "success",
            });
        });
    };
    return (
        <>
            <div>
                <section className="App-section">
                    <button
                        type="button"
                        disabled={status}
                        className="App-button"
                        onClick={() => onSortClick()}
                    >
                        {status ? `Loading...` : `Buble Sort`}
                    </button>
                    <button
                        type="button"
                        disabled={workerStatus === WORKER_STATUS.RUNNING}
                        className="App-button"
                        onClick={() => onWorkerSortClick()}
                    >
                        {workerStatus === WORKER_STATUS.RUNNING
                            ? `Loading...`
                            : `Buble Sort useWorker()`}
                    </button>
                </section>
                <section className="App-section">
                    <span style={{ color: "white" }}>
                        Open DevTools console to see the results.
                    </span>
                </section>
            </div>
        </>
    );
};

