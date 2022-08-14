import { orderBy } from "lodash";
import React from "react";
import CommentsList, { AddCommentForm } from "../common/comments";
import PropTypes from "prop-types";
import Loader from "../common/loader";
import { useProduct } from "../../hooks/useProduct";

const Comments = ({ pageId }) => {
    const { comments, isCommentsLoading, removeComment, createComment } = useProduct();
    const handleRemoveComment = (id) => {
        removeComment(id);
    };
    const handleSubmit = (data) => {
        createComment({ ...data, pageId });
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!isCommentsLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            <Loader />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

Comments.propTypes = {
    pageId: PropTypes.string
};

export default Comments;
