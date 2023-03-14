package com.vum.commentsapi.model.requests;

import javax.validation.constraints.NotBlank;

public class CreateCommentRequest {
    private String comment;

    private String bookId;

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }
}
