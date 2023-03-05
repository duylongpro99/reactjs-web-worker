import { useEffect } from "react";
import { ToastProvider } from "react-toast-notifications";
import "./App.css";
import logo from "./logo.svg";
import { Sort } from "./sorting";

let turn = 0;

function infiniteLoop() {
    const lgoo = document.querySelector(".App-logo") as HTMLElement;
    turn += 8;
    lgoo.style.transform = `rotate(${turn % 360}deg)`;
}

function App() {
    useEffect(() => {
        const loopInterval = setInterval(infiniteLoop, 100);
        return () => clearInterval(loopInterval);
    }, []);

    return (
        <ToastProvider>
            <div className="App">
                <h1 className="App-Title">useWorker</h1>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <ul>
                        <li>Sorting Demo</li>
                    </ul>
                </header>
                <hr />
            </div>
            <div>
                <Sort />
            </div>
        </ToastProvider>
    );
}

export default App;

