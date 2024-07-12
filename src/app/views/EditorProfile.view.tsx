import DefaultLayout from "../layouts/default";
import EditorProfile from "../features/EditorProfile";
import ErrorBoundary from "../components/ErrorBoundary";

function EditorProfileView () {

    return <DefaultLayout>
        <ErrorBoundary>
            <EditorProfile hidePersonalData />
        </ErrorBoundary>
    </DefaultLayout>
}

export default EditorProfileView;