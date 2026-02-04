import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";

export function MainForm() {
    const {state, setState} = useTaskContext();
    const taskNameInput = useRef<HTMLInputElement>(null);

    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (taskNameInput.current === null) return;

        const taskName = taskNameInput.current.value.trim();

        if (!taskName) {
            alert("Por favor, insira o nome da tarefa.");
            return;
        }

        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration: state.config[nextCycleType] ,
            type: nextCycleType,
        };

        const secondsremaining = newTask.duration * 60;

        setState(prevState => {
            return {
                ...prevState,
                config: {...prevState.config},
                activeTask: newTask,
                currentCycle: nextCycle,
                secondsremaining,
                formattedSecondsRemaining: formatSecondsToMinutes(secondsremaining),
                tasks: [...prevState.tasks, newTask]
                
            };
        });
    }

    function handleInterruptTask() {
        setState(prevState => {
            return {
                ...prevState,
                activeTask: null,
                secondsremaining: 0,
                formattedSecondsRemaining: "00:00",
                
            };
        });
    }

    return (
        <form onSubmit={handleCreateNewTask} className="form" action=''>
            <div className="formRow">
                <DefaultInput
                    labelText='task'
                    id='meuInput'
                    type='text'
                    placeholder="Digite aqui"
                    ref={taskNameInput}
                    disabled={!!state.activeTask}
                />
            </div>
            <div className="formRow">
                <p>Vou trabalhar em 25 min </p>
            </div>

            {state.currentCycle > 0 && (
            <div className="formRow">
                <Cycles />
            </div>
            )}

            <div className="formRow">
                {!state.activeTask && (
                <DefaultButton aria-label='Iniciar nova tarefa' 
                               title="Iniciar nova tarefa"
                               type='submit' 
                               icon={<PlayCircleIcon />} 
                               key='startButton'
                               
                />
                )}
                {!!state.activeTask &&  (
                <DefaultButton aria-label='Interromper tarefa em andamento' 
                               title="Interromper tarefa em andamento"
                               type='button' 
                               icon={<StopCircleIcon />} 
                               color='red'
                               onClick={handleInterruptTask}
                               key='stopButton'
                />
                )}

            </div>
            
        </form>
    );
}

