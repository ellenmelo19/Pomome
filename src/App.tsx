import "./styles/theme.css";
import "./styles/global.css";
import { Container } from './components/Container';
import { Menu } from './components/Menu';
import { Logo } from "./components/Logo";
import { CountDown } from "./components/Countdown";
import { DefaultInput } from "./components/DefaultInput";
import { Cycles } from "./components/Cycles";
import { DefaultButton } from "./components/DefaultButton";
import { PlayCircleIcon, StopCircleIcon } from "lucide-react";

export function App() {
	return (
        <>
            <Container>
                <Logo />
            </Container>


            <Container>
                < Menu />
            </Container>

            <Container>
                < CountDown />
            </Container>

            <Container>
               <form className='form' action="">
                    <div className="formRow">
                        <DefaultInput 
                            labelText="Task" 
                            id='meuInput' 
                            type='text'
                            placeholder="Digite aqui"
                        />
                    </div>

                    <div className="formRow">
                        <p>Lorem ipsum, dolor sit amet.</p>
                    </div>

                    <div className="formRow">
                        <Cycles />
                    </div>

                    <div className="formRow">
                        <DefaultButton icon={<PlayCircleIcon/>} color ='green'/>
                        <DefaultButton icon={<StopCircleIcon/>} color ='red'/>
                    </div>
               </form>
            </Container>
        </>
    );
}
