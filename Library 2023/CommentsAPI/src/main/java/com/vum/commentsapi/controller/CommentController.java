package com.vum.commentsapi.controller;

import com.vum.commentsapi.model.db.Comment;
import com.vum.commentsapi.model.requests.CreateCommentRequest;
import com.vum.commentsapi.repository.CommentsRepository;
import com.vum.commentsapi.utils.ResourceNotFoundException;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.jwt.consumer.JwtConsumer;
import org.jose4j.jwt.consumer.JwtConsumerBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    CommentsRepository commentRepository;

    public String getUserIdFromTicket(String token){

        try{

            JwtConsumer jwtConsumer = new JwtConsumerBuilder()
                    .setSkipSignatureVerification()
                    .build();

            JwtClaims jwtClaims = jwtConsumer.processToClaims(token.split(" ")[1]);
            System.out.println("JWT validation succeeded! " + jwtClaims);
            return jwtClaims.getClaimValue("id", String.class);
        }
        catch( Exception e)
        {
            System.out.println(e.getMessage().toString());
        }
       return "";
    }

    @GetMapping("")
    public List<Comment> getAllComments( @RequestHeader("Authorization") String token) {
        var userId = getUserIdFromTicket(token.split(" ")[1]);
        return commentRepository.findAll();
    }

    @PostMapping("")
    public Comment createComment(@RequestHeader("Authorization") String token, @RequestBody CreateCommentRequest commentRequest) {
        var comment =new Comment();
        comment.setComment(commentRequest.getComment());
        comment.setBookId(commentRequest.getBookId());
        comment.setUserId(getUserIdFromTicket(token));
        comment.setCreatedAt(new Date());

        return commentRepository.save(comment);
    }

    @GetMapping("/{id}")
    public Comment getCommentById(@PathVariable(value = "id") UUID commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", "id", commentId));
    }

    @PutMapping("/{id}")
    public Comment updateComment(@PathVariable(value = "id") UUID commentId, @RequestBody Comment commentDetails) {

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", "id", commentId));

        comment.setComment(commentDetails.getComment());

        Comment updatedComment = commentRepository.save(comment);
        return updatedComment;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable(value = "id") UUID commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", "id", commentId));

        commentRepository.delete(comment);

        return ResponseEntity.ok().build();
    }
}
