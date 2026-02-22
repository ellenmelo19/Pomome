import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";

import styles from "./styles.module.css";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { useEffect, useState, useMemo, useCallback } from "react";
import { sortTasks, type SortTasksOptions } from "../../utils/sortTasks";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

export function History() {
    const {state, dispatch} = useTaskContext();
    const hasTasks = state.tasks.length > 0;

    const [sortConfig, setSortConfig] = useState<Omit<SortTasksOptions, 'tasks'>>({
        field: 'startDate',
        direction: 'desc',
    });

    // Usa useMemo em vez de useEffect para ordenar as tarefas
    const sortedTasks = useMemo(() => {
        return sortTasks({
            tasks: state.tasks,
            field: sortConfig.field,
            direction: sortConfig.direction,
        });
    }, [state.tasks, sortConfig.field, sortConfig.direction]);

    useEffect(() => {
        document.title = 'Histórico de Tarefas | Pomome';
    }, []);

    useEffect(() => {
        return () => {
            showMessage.dismiss();
        };
    }, []);

    const handleSortTasks = useCallback(({field}: Pick<SortTasksOptions, 'field'>) => {
        setSortConfig(prev => ({
            field,
            direction: prev.direction === 'desc' ? 'asc' : 'desc',
        }));
    }, []);

    const handleResetHistory = useCallback(() => {
        showMessage.dismiss();
        showMessage.confirm('Tem certeza que quer apagar o histórico?', (confirmation: boolean) => {
            if (confirmation) {
                dispatch({type: TaskActionTypes.RESET_STATE});
            }
        });
    }, [dispatch]);

    return (
        <MainTemplate>
            <Container>
                <Heading>
                    <span>History</span>
                    {hasTasks && (
                        <span className={styles.buttonContainer}>
                            <DefaultButton 
                                icon={<TrashIcon />} 
                                color='red'
                                aria-label='Apagar todo o histórico'
                                title='Apagar todo o histórico'
                                onClick={handleResetHistory}
                            />
                        </span>
                    )}
                </Heading>
            </Container>
            
            <Container>
                {hasTasks && (
                <div className={styles.responsiveTable}>
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => handleSortTasks({field: 'name'})} className={styles.thSort}>
                                    Tarefa {sortConfig.field === 'name' && (sortConfig.direction === 'desc' ? '▼' : '▲')}
                                </th>
                                <th onClick={() => handleSortTasks({field: 'duration'})} className={styles.thSort}>
                                    Duração {sortConfig.field === 'duration' && (sortConfig.direction === 'desc' ? '▼' : '▲')}
                                </th>
                                <th onClick={() => handleSortTasks({field: 'startDate'})} className={styles.thSort}>
                                    Data {sortConfig.field === 'startDate' && (sortConfig.direction === 'desc' ? '▼' : '▲')}
                                </th>
                                <th>Status</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTasks.map(task => {
                                const taskTypeDictionary = {
                                    workTime: "Foco",
                                    shortBreakTime: "Descanso curto",
                                    longBreakTime: "Descanso longo",
                                };
                                
                                return (
                                    <tr key={task.id}>
                                        <td>{task.name}</td>
                                        <td>{task.duration}</td>
                                        <td>{formatDate(task.startDate)}</td>
                                        <td>{getTaskStatus(task, state.activeTask)}</td>
                                        <td>{taskTypeDictionary[task.type]}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                )}

                {!hasTasks && <p style={{ textAlign: 'center', fontWeight: 'bold'}}>
                    Ainda não existem tarefas criadas</p>}
            </Container>
        </MainTemplate>
    );
}