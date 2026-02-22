// src/contexts/TaskContext/TaskContextProvider.tsx
import { useEffect, useReducer, useRef, useCallback } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './taskActions';
import { loadBeep } from '../../utils/loadBeep';
import type { TaskStateModel } from '../../models/TaskStateModel';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storageState = localStorage.getItem('state');

    if (storageState === null) return initialTaskState;

    const parsedStorageState = JSON.parse(storageState) as TaskStateModel;

    return {
      ...parsedStorageState,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: '00:00',
    };
  });
  
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);
  const workerRef = useRef<TimerWorkerManager | null>(null);

  // Inicializa o worker e configura o handler de mensagens apenas uma vez
  useEffect(() => {
    // Obtém a instância do worker
    workerRef.current = TimerWorkerManager.getInstance();

    // Define o handler de mensagens
    const handleWorkerMessage = (e: MessageEvent) => {
      const countDownSeconds = e.data;

      if (countDownSeconds <= 0) {
        if (playBeepRef.current) {
          playBeepRef.current();
          playBeepRef.current = null;
        }
        dispatch({
          type: TaskActionTypes.COMPLETE_TASK,
        });
        if (workerRef.current) {
          workerRef.current.terminate();
        }
      } else {
        dispatch({
          type: TaskActionTypes.COUNT_DOWN,
          payload: { secondsRemaining: countDownSeconds },
        });
      }
    };

    // Atribui o handler ao worker
    if (workerRef.current) {
      workerRef.current.onmessage = handleWorkerMessage;
    }

    // Cleanup: termina o worker quando o componente for desmontado
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []); // Array vazio = executa apenas uma vez na montagem

  // Efeito para sincronizar estado com localStorage e worker
  useEffect(() => {
    // Salva no localStorage
    localStorage.setItem('state', JSON.stringify(state));

    // Se não há tarefa ativa, termina o worker
    if (!state.activeTask) {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    }

    // Atualiza o título da página
    document.title = `${state.formattedSecondsRemaining} - Pomome Pomodoro`;

    // Envia o estado atual para o worker (se ele existir)
    if (workerRef.current) {
      workerRef.current.postMessage(state);
    }
  }, [state]); // Executa sempre que o estado mudar

  // Efeito para gerenciar o beep
  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else if (!state.activeTask) {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}