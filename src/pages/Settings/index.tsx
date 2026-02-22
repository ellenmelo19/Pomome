import { SaveIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultInput } from '../../components/DefaultInput';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { useRef } from 'react';
import { DefaultButton } from '../../components/DefaultButton';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { showMessage } from '../../adapters/showMessage';

export function Settings() {
    const {state} = useTaskContext();
    const workTimeInput = useRef<HTMLInputElement>(null);
    const shortBreakTimeInput = useRef<HTMLInputElement>(null);
    const longBreakTimeInput = useRef<HTMLInputElement>(null);

    function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        showMessage.dismiss();

        const formErrors = [];

        const workTime = Number(workTimeInput.current?.value);
        const shortBreakTime = Number(shortBreakTimeInput.current?.value);
        const longBreakTime = Number(longBreakTimeInput.current?.value);

        if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
            formErrors.push('Digite apenas números para as configurações de tempo.');
        }

        if (workTime < 1 || workTime > 99) {
            formErrors.push('O tempo de foco deve ser entre 1 e 99 minutos.');
        }

        if (shortBreakTime < 1 || shortBreakTime > 30) {
            formErrors.push('O tempo de descanso curto deve ser entre 1 e 30 minutos.');
        }
        
        if (longBreakTime < 1 || longBreakTime > 60) {
            formErrors.push('O tempo de descanso longo deve ser entre 1 e 60 minutos.');
        }

        if (formErrors.length > 0) {
            formErrors.forEach(error => showMessage.error(error));
            return;
        }

        showMessage.success('Configurações salvas com sucesso!');
    }

    return (
        <MainTemplate>
            <Container>
                <Heading>Configurações</Heading>
            </Container>

            <Container>
                <p style={{ textAlign: 'center' }}>
                    Modifique as configurações para tempo de foco, descanso curto e descanso longo.
                </p>
            </Container>

            <Container>
                <form onSubmit={handleSaveSettings} action='' className='form'>
                    <div className="formRow">
                        <DefaultInput id='workTime' labelText='Foco' ref={workTimeInput} defaultValue={state.config.workTime} type='number'/>
                    </div>
                    <div className="formRow">
                        <DefaultInput id='shortBreakTime' labelText='Descanso Curto' ref={shortBreakTimeInput} defaultValue={state.config.shortBreakTime} type='number'/>
                    </div>
                    <div className="formRow">
                        <DefaultInput id='longBreakTime' labelText='Descanso Longo' ref={longBreakTimeInput} defaultValue={state.config.longBreakTime} type='number'/>
                    </div>
                    <div className="formRow">
                        <DefaultButton icon={<SaveIcon />} 
                        aria-label='Salvar configurações'
                        title='Salvar'/>
                    </div>
                </form>
            </Container>
        </MainTemplate>
    );
}