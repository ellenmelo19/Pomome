# 🍅 Pomome - Pomodoro Timer App

Um aplicativo Pomodoro elegante e funcional construído com React e TypeScript para ajudar você a gerenciar seu tempo e aumentar sua produtividade.

![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Vite](https://img.shields.io/badge/Vite-6.0-purple)
![License](https://img.shields.io/badge/license-MIT-green)

<img width="600" height="600" alt="image" src="https://github.com/user-attachments/assets/3eba624f-1232-4fcc-bbd9-8be1774f963f" />


## ✨ Funcionalidades

- ⏰ **Timer Pomodoro** - Ciclos de foco, pausas curtas e longas
- 📊 **Histórico de Tarefas** - Acompanhe todas as suas tarefas completadas
- 💾 **Persistência Local** - Seu progresso salvo automaticamente no localStorage
- 🔊 **Notificações Sonoras** - Alertas quando um ciclo é completado
- 📱 **Design Responsivo** - Funciona perfeitamente em desktop e mobile
- 🎯 **Ordenação de Histórico** - Organize tarefas por nome, duração ou data
- ⚙️ **Configurável** - Ajuste os tempos de acordo com sua preferência

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e servidor de desenvolvimento
- **Context API** - Gerenciamento de estado
- **Web Workers** - Timer em background
- **React Toastify** - Notificações elegantes
- **CSS Modules** - Estilização componentizada
- **LocalStorage** - Persistência de dados

```

## 🛠️ Instalação

```bash
# Clone o repositório
git clone https://github.com/ellenmelo19/pomome.git

# Entre no diretório
cd pomome

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a versão de produção
- `npm run preview` - Visualiza a versão de produção localmente
- `npm run lint` - Executa o linter

## 🎯 Como Usar

1. **Iniciar uma tarefa**: Digite o nome da tarefa e clique no botão play
2. **Ciclos Pomodoro**:
   - 🟢 **Foco**: 25 minutos (padrão)
   - 🔵 **Pausa Curta**: 5 minutos
   - 🟣 **Pausa Longa**: 15 minutos
3. **Interromper**: Clique no botão stop para interromper a tarefa atual
4. **Histórico**: Acesse a página de histórico para ver todas as tarefas
5. **Ordenar**: Clique nos cabeçalhos da tabela para ordenar as tarefas

## ⚙️ Configuração

Você pode ajustar os tempos default dos ciclos no arquivo de configuração:

```typescript
// src/contexts/TaskContext/initialTaskState.ts
export const initialTaskState = {
    config: {
        workTime: 25,        // minutos de foco
        shortBreakTime: 5,   // minutos de pausa curta
        longBreakTime: 15,   // minutos de pausa longa
    },
    // ... outros estados
}
```

## 🧠 Como Funciona o Timer

O aplicativo utiliza **Web Workers** para garantir que o timer continue funcionando mesmo quando a aba não está ativa:

1. O worker é inicializado no `TaskContextProvider`
2. Quando uma tarefa começa, o worker inicia a contagem regressiva
3. A cada segundo, o worker envia uma mensagem com o tempo restante
4. O componente atualiza a UI com o novo tempo
5. Quando o tempo chega a zero, a tarefa é automaticamente completada

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Siga os passos:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

⭐️ **Se este projeto te ajudou, dê uma estrela no GitHub!** ⭐️
