import React, { BaseSyntheticEvent } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

interface ICommentFormProps {
    canAddComment: boolean;
    handleSubmit?: (event: BaseSyntheticEvent) => void;
}

function CommentForm(props: ICommentFormProps) {
    const [state, setState] = React.useState(false);

    // TODO:: connect to backend and DB
    const mockData = [
        {
            commentId: 1,
            comment: "Comment One"
        },
        {
            commentId: 2,
            comment: "Comment Two"
        },
        {
            commentId: 3,
            comment: "Comment Three"
        }
    ]

    const addComment = () => {
        setState(true)
    }

    const deleteComment = () => {
        setState(false)
    }

    return (
        <div style={{ marginBottom: "8px" }}>
            {mockData.map((x, index) => (
                <textarea key={`comment-key-${index}`} id="comments" name={`comment-name-${index}`} value={x.comment} disabled cols={30} />
            ))}
            {props.canAddComment && (
                <>
                    <br />
                    <br />
                    <button onClick={addComment} style={{ margin: "auto", backgroundColor: "#72BAD1", color: "white", border: "0", width: "150px", padding: "8px", borderRadius: "5px", cursor: state ? "not-allowed" : "auto" }} disabled={state}>Add Comment</button>
                    <br />
                    <br />
                </>
            )}
            {state && (
                <>
                    <form onSubmit={props.handleSubmit}>
                        <textarea key={`comment-keys`} id="comments" name={`comment-name`} cols={30} />
                        <div style={{ display: "flex" }}>
                            <button onClick={deleteComment} style={{ margin: "auto", marginRight: "0px", marginTop: "0px", marginBottom: "0px", backgroundColor: "red", color: "white", border: "0", borderRadius: "5px", height: "30.98px" }}><DeleteIcon fontSize="small" /></button>{"   "}
                            <input type="submit" value="Submit" style={{ margin: "auto", marginLeft: "5px", backgroundColor: "#72BAD1", color: "white", border: "0", width: "100px", padding: "8px", borderRadius: "5px" }} />
                        </div>
                    </form>
                </>
            )}
        </div>
    )
}
export default CommentForm;