import { useState } from "react";

interface CommentItemProps {
    comment: any;
    allComments: any[];
    blogId: number;
    handleReply: (
        blogId: number,
        parentCommentId: number,
        text: string
    ) => Promise<void>;
}

function CommentItem({
    comment,
    allComments,
    blogId,
    handleReply
}: CommentItemProps) {

    const [showReply, setShowReply] =
        useState(false);

    const [replyText, setReplyText] =
        useState("");

    const childReplies =
        allComments.filter(
            (c: any) =>
                c.parentCommentId ===
                comment.commentId
        );

    return (

        <div
            className="comment-card"
            style={{
                marginLeft:
                    comment.parentCommentId
                        ? "40px"
                        : "0"
            }}
        >

            <strong>
                {comment.fullName}
            </strong>

            <span
                style={{
                    marginLeft: "10px",
                    color: "#94a3b8",
                    fontSize: "12px"
                }}
            >
                {new Date(comment.createdAt).toLocaleString()}
            </span>

            <div className="comment-text">
                {comment.commentText}
            </div>

            <button
                className="reply-btn"
                onClick={() =>
                    setShowReply(
                        !showReply
                    )
                }
            >
                Reply
            </button>

            {
                showReply && (

                    <div
                        style={{
                            marginTop: "10px"
                        }}
                    >

                        <input
                            type="text"
                            placeholder="Write reply..."
                            value={replyText}
                            onChange={(e) =>
                                setReplyText(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            className="action-btn"
                            onClick={async () => {

                                await handleReply(
                                    blogId,
                                    comment.commentId,
                                    replyText
                                );

                                setReplyText("");

                                setShowReply(
                                    false
                                );

                            }}
                        >
                            Post Reply
                        </button>

                    </div>

                )
            }

            {
                childReplies.map(
                    (reply: any) => (

                        <CommentItem
                            key={
                                reply.commentId
                            }
                            comment={reply}
                            allComments={
                                allComments
                            }
                            blogId={blogId}
                            handleReply={
                                handleReply
                            }
                        />

                    )
                )
            }

        </div>

    );
}

export default CommentItem;