import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";

export function MainForm() {

    const {setState} = useTaskContext();

    function handleclick() {
        setState(prevState => {
            return {
                ...prevState,
                formattedSecondsRemaining: "24:59",
            };
        });
    }

    return (
        <form className="form" action=''>
            <button type="button" onClick={handleclick}>Clicar</button>
            <div className="formRow">
                <DefaultInput
                    labelText='task'
                    id='meuInput'
                    type='text'
                    placeholder="Digite aqui"
                />
            </div>
            <div className="formRow">
                <p>Vou trabalhar em 25 min </p>
            </div>
            <div className="formRow">
                <Cycles />
            </div>
            <div className="formRow">
                <DefaultButton icon={<PlayCircleIcon />} />
            </div>
            
        </form>
    );
}

