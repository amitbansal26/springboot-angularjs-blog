/**
 * 
 */
package com.sivalabs.bootifulspring.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sivalabs.bootifulspring.entities.User;

/**
 * @author Siva
 *
 */
public interface UserRepository extends JpaRepository<User, Integer>
{

	User findByEmail(String email);

}
