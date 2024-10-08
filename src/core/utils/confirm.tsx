import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Confirm from "../../app/components/Confirm/Confirm";

interface ConfirmProps {
    title: string;
    onConfirm?: (...args: any[] ) => void;
    onCancel?: (...args: any[]) => void;
}

export default function confirm(props: ConfirmProps) {
    //setTimeout usado por conta do EventLoop do Javascript (micro e macrotasks)
    // info em: https://javascript.info/event-loop e https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Event_loop
    setTimeout(() => {
        confirmAlert({
            overlayClassName: 'confirm-overlay',
            customUI: ({ onClose }) => {
                return (
                    <Confirm
                        title={props.title}
                        onConfirm={() => {
                            if (props.onConfirm) props.onConfirm();
                            onClose()
                        }}
                        onCancel={() => {
                            if (props.onCancel) props.onCancel();
                            onClose();
                        }}
                    />
                );
            }
        });
    }, 0);
}