package com.vum.commentsapi.repository;

import com.vum.commentsapi.model.db.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.NotBlank;
import java.util.UUID;


@Repository
public interface CommentsRepository extends JpaRepository<Comment, UUID> {

}

