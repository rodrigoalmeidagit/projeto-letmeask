// Import CSS Style
import './style.scss'

// TypeScript
type QuestionsProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }  
}

export function Question( { content, author, }: QuestionsProps ) {
  return (
    <div className="question">
      <p>{ content }</p>
      <footer>
        <div className="user-info">
          <img src={ author.avatar } alt="{ author.avatar }" />
          <span>{ author.name }</span>
        </div>
        <div></div>
      </footer>
    </div>
  );
}