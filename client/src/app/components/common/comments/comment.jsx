import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../../utils/displayDate";
import { getCurrentUserId } from "../../../store/users";
import { useSelector } from "react-redux";
import userService from "../../../services/user.service";
const Comment = ({
    content,
    created_at: created,
    _id: id,
    pageId,
    userId,
    onRemove,
    showPage
}) => {
    const currentUserId = useSelector(getCurrentUserId());
    const [user, setUser] = useState();
    useEffect(() => {
        userService.getOneUser(userId).then(res => setUser(res.content));
    }, []);

    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {user && user?.firstName + " " + user?.lastName}{" "}
                                        <span className="small">
                                            - {displayDate(created)}
                                        </span>
                                    </p>
                                    {currentUserId === userId && (
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() => onRemove(id)}
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    )}
                                    {showPage && (
                                        <p>{pageId}</p>
                                    )}
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
Comment.propTypes = {
    content: PropTypes.string,
    edited_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    userId: PropTypes.string,
    onRemove: PropTypes.func,
    showPage: PropTypes.bool,
    _id: PropTypes.string,
    pageId: PropTypes.string
};

export default Comment;
