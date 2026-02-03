import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";

export function MainForm() {
    const {setState} = useTaskContext();
    const taskNameInput = useRef<HTMLInputElement>(null);

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
            duration: 1,
            type: 'workTime',
        };

        const secondsremaining = newTask.duration * 60;

        setState(prevState => {
            return {
                ...prevState,
                config: {...prevState.config},
                activeTask: newTask,
                currentCycle: 1,
                secondsremaining,
                formattedSecondsRemaining: '00:00',
                tasks: [...prevState.tasks, newTask]
                
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

