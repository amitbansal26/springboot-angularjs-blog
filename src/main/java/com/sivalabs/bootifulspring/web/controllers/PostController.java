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

import com.sivalabs.bootifulspring.entities.Post;
import com.sivalabs.bootifulspring.repositories.PostRepository;

/**
 * @author Siva
 *
 */
@RestController
@RequestMapping("/posts")
@Transactional
public class PostController {
	@Autowired private PostRepository postRepository;
	
	@RequestMapping(value="", method=RequestMethod.GET)
	public List<Post> findAll() {
		return postRepository.findAll();
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public Post findById(@PathVariable Integer id) {
		return postRepository.findOne(id);
	}
	
	@RequestMapping(value="", method=RequestMethod.POST)
	public Post create(@RequestBody Post post) {
		return postRepository.save(post);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public Post update(@PathVariable Integer id, @RequestBody Post post) {
		Post persistentPost = postRepository.findOne(id);
		if(persistentPost != null){
			post.setId(id);
			return postRepository.save(post);
		} else {
			throw new RuntimeException("Invalid Post Id");
		}
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public void delete(@PathVariable Integer id) {
		postRepository.delete(id);
	}
}
