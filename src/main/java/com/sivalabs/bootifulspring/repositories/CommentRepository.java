/**
 * 
 */
package com.sivalabs.bootifulspring.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sivalabs.bootifulspring.entities.Comment;

/**
 * @author Siva
 *
 */
public interface CommentRepository extends JpaRepository<Comment, Integer>{

}
