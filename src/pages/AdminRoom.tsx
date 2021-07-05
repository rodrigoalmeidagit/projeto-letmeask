// Import Hook
// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';

// Import Firebase
import { dataBase } from '../services/firebase';

// Import React Router
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

// Import Components
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

// Import Img
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';


// Import CSS Style
import '../styles/room.scss';
import { Question } from '../components/Question';


// TypeScript
type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;  
  // const { user } = useAuth();
  const { questions, title } = useRoom( roomId );

  async function handleEndRoom() {
    await dataBase.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/');
  }

  async function handleDeleteQuestion( questionId: string ) {
    if(window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await dataBase.ref( `rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  return(
    <div className="page-room">      
      <header>
        <div className="content">
          <img src={ logoImg } alt="Logo Letmeask" />
          <div>
            <RoomCode code={ roomId } />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>  
          </div>
        </div>
      </header>

      <main>      
        <div className="room-title">
          <h1>Sala { title }</h1>
          { questions.length > 0 && <span>{ questions.length } pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map( question => {
          return (
            <Question
              // Consultar doc - algoritmo de reconciliação
              key={ question.id } 
              content={ question.content }
              author={ question.author }            
            >
              <button
                type="button"
                onClick={ () => handleDeleteQuestion( question.id )}
              >
                <img src={ deleteImg } alt="Remover pergunta" />
              </button>
            </Question>
          );
        } ) }
        </div>
      </main>
    </div>
  );
}