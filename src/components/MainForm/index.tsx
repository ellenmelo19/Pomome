import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { Tips } from "../Tips";
import { showMessage } from "../../adapters/showMessage";

export function MainForm() {
    const {state, dispatch} = useTaskContext();
    const taskNameInput = useRef<HTMLInputElement>(null);
    const lastTaskName = state.tasks[state.tasks.length - 1]?.name || "";

    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        showMessage.dismiss();

        if (taskNameInput.current === null) return;

        const taskName = taskNameInput.current.value.trim();

        if (!taskName) {
            showMessage.warn("Por favor, insira o nome da tarefa.");
            return;
        }

        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration: state.config[nextCycleType],
            type: nextCycleType,
        };

        dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });

        showMessage.success(`Tarefa "${taskName}" iniciada!`);
    }

    function handleInterruptTask() {
        showMessage.dismiss();
        showMessage.warn(`Tarefa "${state.activeTask?.name}" interrompida!`);
        dispatch({ type: TaskActionTypes.INTERRUPT_TASK});
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
                    defaultValue={lastTaskName}
                />
            </div>
            <div className="formRow">
                <Tips />
                
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

