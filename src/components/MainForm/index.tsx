import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";

export function MainForm() {

    return (
        <form className="form" action=''>
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

