// Import Img
import copyImg from '/home/rodrigo/Workspace/projeto-letmeask/src/assets/images/copy.svg';

// Import CSS Style
import '../RoomCode/style.scss';

// TypeScript
type RoomCodeProps = {
  code: string;
}

export function RoomCode( props: RoomCodeProps ) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText( props.code )
  }

  return (
    <button className="room-code" onClick={ copyRoomCodeToClipboard }>
      <div>
        <img src={ copyImg } alt="Copy room code" />
      </div>
      <span>Sala #{ props.code }</span>
    </button> 
  );
}