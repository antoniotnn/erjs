import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Info from "../../app/components/Info/Info";

interface InfoProps {
    title: string;
    description: string;
}

export function info(props: InfoProps) {

    //setTimeout usado por conta do EventLoop do Javascript (micro e macrotasks)
    // info em: https://javascript.info/event-loop e https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Event_loop
    setTimeout(() => {
        confirmAlert({
            overlayClassName: 'info-overlay',
            customUI: () => {
                return (
                    <Info
                        title={props.title}
                        description={props.description}
                    />
                );
            }
        });
    }, 0);

}