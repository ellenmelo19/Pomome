import { useEffect, useReducer, useRef } from 'react';
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

  useEffect(() => {
    workerRef.current = TimerWorkerManager.getInstance();

    workerRef.current.onmessage((e: MessageEvent) => {
      const countDownSeconds = e.data;

      if (countDownSeconds <= 0) {
        if (playBeepRef.current) {
          playBeepRef.current();
          playBeepRef.current = null;
        }
        
        dispatch({
          type: TaskActionTypes.COMPLETE_TASK,
        });
      } else {
        dispatch({
          type: TaskActionTypes.COUNT_DOWN,
          payload: { secondsRemaining: countDownSeconds },
        });
      }
    });

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []); 

  useEffect(() => {
    if (state.activeTask && state.secondsRemaining > 0) {
      console.log('Iniciando timer com', state.secondsRemaining, 'segundos');
      
      if (workerRef.current) {
        workerRef.current.startTimer(state.secondsRemaining);
      }
    } 
    else {
      console.log('Parando timer');
      
      if (workerRef.current) {
        workerRef.current.stopTimer();
      }
    }
  }, [state.activeTask, state.secondsRemaining]); 

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
    document.title = `${state.formattedSecondsRemaining} - Pomome Pomodoro`;
  }, [state]);

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