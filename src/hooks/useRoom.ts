// Import React
import { useEffect } from "react";
import { useState } from "react";

// Import Firebase
import { dataBase } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
  likes: Record<string, {
    authorId: string,
  }>
}>

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
  likeCount: number;
  likeId: string | undefined;
}

export function useRoom( roomId: string ) {
  const { user } = useAuth();
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
            isHighLighted: value.isHighLighted,
            likeCount: Object.entries(value.likes ?? {}).length,
            likeId: Object.entries( value.likes ?? {} )
              .find(([ key, like ]) => like.authorId === user?.id)?.[0],
          }
        });

      setTitle( dataBaseRoom.title );
      setQuestion( parsedQuestions );
    });

    return () => {
      roomRef.off('value')
    }
  }, [ roomId, user?.id ]);

  return{ questions, title };
}