import { useEffect, useReducer, useState } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";

type TaskContextProviderProps = {
    children: React.ReactNode;
};

export function TaskContextProvider({children}: TaskContextProviderProps) {
    const [state, setState] = useState(initialTaskState);

    type ActionType = {
        type: string,
        payload?: number;
    };

    const [myState, dispatch] = useReducer(
        (state, action: ActionType) => {

        switch(action.type) {
            case 'INCREMENT':{
                if (!action.payload) return state;

                return {
                    ...state,
                    secondsRemaining: state.secondsRemaining + action.payload,
                };
            }
        }
        return state;
    },{
            secondesRemaining: 0,
        },
    );

    // useEffect(() => {
    //     console.log(state);

    // },[state]);

    return (
    <TaskContext.Provider value={{state, setState}}>
        {JSON.stringify(myState)}
        <button onClick={() => dispatch({type: "INCREMENT", payload:10})}> Incrementar </button>
    </TaskContext.Provider>)
}