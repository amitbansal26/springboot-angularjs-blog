/**
 * 
 */
package com.sivalabs.bootifulspring.web.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sivalabs.bootifulspring.entities.Comment;
import com.sivalabs.bootifulspring.entities.Post;
import com.sivalabs.bootifulspring.repositories.CommentRepository;
import com.sivalabs.bootifulspring.repositories.PostRepository;

/**
 * @author Siva
 *
 */
@RestController
@RequestMapping("/posts/{postId}/comments")
@Transactional
public class CommentController {
	@Autowired private PostRepository postRepository;
	@Autowired private CommentRepository commentRepository;
	
	
	@RequestMapping(value="", method=RequestMethod.GET)
	public List<Comment> findAll(@PathVariable Integer postId) {
		Post post = postRepository.findOne(postId);
		if(post == null) return null;
		else return post.getComments();
	}
		
	@RequestMapping(value="", method=RequestMethod.POST)
	public Comment create(@PathVariable Integer postId, @RequestBody Comment comment) {
		Post post = postRepository.findOne(postId);
		comment.setPost(post);
		return commentRepository.save(comment);
	}
	
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public void delete(@PathVariable Integer postId, @PathVariable Integer id) {
		commentRepository.delete(id);
	}
}
