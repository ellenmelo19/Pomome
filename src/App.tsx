import { Heading } from "./components/Heading"; 

import "./styles/theme.css";
import "./styles/global.css";
import { TimerIcon } from "lucide-react";

export function App() {
	
	return (
        <>
            <Heading>
                Olá munde
                <button>
                    <TimerIcon/>
                </button>
            </Heading>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earumm cumque
                incidunt accusamus commodi quasi sit, doloribus in fugiat, repellat
                laudantium voluptas praesentium labore dolore unde! Aliquam, dolorem
                quia rerum!
            </p>
        </>
	);
}
