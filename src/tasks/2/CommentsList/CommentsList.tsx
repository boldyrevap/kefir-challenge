import {FC, useState, useEffect} from "react";
import authors from "../data/authors";
import comments from "../data/comments";
import getDataRequest from "../data/getDataRequest";
import "./style.css";
import {Icon} from "./Icon";

interface IAuthor {
    id: number;
    name: string;
    avatar: string;
}

interface IComment {
    id: number;
    created: string;
    text: string;
    author: number;
    parent: number | null;
    likes: number;
}
interface ICommentsListState {
    authors: Array<IAuthor>;
    comments: Array<IComment>;
}

interface ICommentProps {
    comments: Array<IComment>;
    comment: IComment;
    authors: Array<IAuthor>;
}

const Comment: FC<ICommentProps> = (props) => {
    const {comments, comment, authors} = props;
    const {id, author, created, text, likes} = comment;
    const date = created ? new Date(created).toLocaleString() : "";
    const authorInfo = authors.find((a) => a.id === author);
    const children = comments.filter((c) => c.parent === id);

    return (
        <div className="comments__item">
            <div className="comment">
                <div className="comment__wrap">
                    <div className="comment__head">
                        <div className="comment__creds">
                            <div
                                className="comment__avatar"
                                style={{
                                    backgroundImage: `url(${authorInfo?.avatar})`,
                                }}
                            />
                            <div className="comment__info">
                                <p className="comment__author">
                                    {authorInfo?.name}
                                </p>
                                <p className="comment__date">{date}</p>
                            </div>
                        </div>
                        <div className="comment__likes">
                            <Icon />
                            <span className="comment__likes-value">
                                {likes}
                            </span>
                        </div>
                    </div>
                    <div className="comment__content">
                        <p className="comment__text">{text}</p>
                    </div>
                </div>
            </div>
            {!!children.length && (
                <div className="comment__child">
                    {children.map((c) => (
                        <Comment
                            key={c.id}
                            comment={c}
                            comments={comments}
                            authors={authors}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const CommentsList: FC = () => {
    const [values, setValues] = useState<ICommentsListState>({
        authors: [],
        comments: [],
    });

    const getData = async () => {
        try {
            const {comments, authors} = await getDataRequest();
            setValues({authors, comments});
        } catch (e) {
            console.log("e", e);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <div className="comments">
                {values.comments
                    .filter((comment) => comment.parent === null)
                    .map((comment) => {
                        return (
                            <Comment
                                key={comment.id}
                                comment={comment}
                                comments={comments}
                                authors={authors}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default CommentsList;
