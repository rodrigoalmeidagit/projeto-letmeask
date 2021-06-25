// Import React
import { useEffect } from "react";
import { useState } from "react";

// Import Firebase
import { dataBase } from "../services/firebase";

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean
}>

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean
}

export function useRoom( roomId: string ) {
  const [ questions, setQuestion ] = useState<QuestionType[]>( [] );
  const [ title, setTitle ] = useState('');


  useEffect( () => {
    const roomRef = dataBase.ref( `rooms/${ roomId }` );

    roomRef.on( 'value', room => {
      const dataBaseRoom = room.val();
      const fireBaseQuestions: FirebaseQuestions = dataBaseRoom.questions ?? {};
      const parsedQuestions = Object.entries( fireBaseQuestions )
        .map( ( [key, value] ) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isAnswered: value.isAnswered,
            isHighLighted: value.isHighLighted
          }
        });

      setTitle( dataBaseRoom.title );
      setQuestion( parsedQuestions );
    });
  }, [ roomId ]);

  return{ questions, title };
}