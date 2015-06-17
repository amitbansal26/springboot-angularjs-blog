/**
 * 
 */
package com.sivalabs.bootifulspring.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sivalabs.bootifulspring.entities.Post;

/**
 * @author Siva
 *
 */
public interface PostRepository extends JpaRepository<Post, Integer>{

}
