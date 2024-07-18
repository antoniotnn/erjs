import {useCallback, useState} from "react";
import {User, UserService} from "tnn-sdk";

export default function useSingleEditor() {
    const [editor, setEditor] = useState<User.EditorDetailed>();

    const fetchEditor = useCallback(async function fetchEditor(editorId: number) {
        UserService.getExistingEditor(editorId).then(setEditor);
    }, []);


    return {
        fetchEditor,
        editor
    }
}