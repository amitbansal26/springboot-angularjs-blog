/**
 * 
 */
package com.sivalabs.bootifulspring.services;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sivalabs.bootifulspring.MailSettings;

/**
 * @author Siva
 *
 */
@Component
public class EmailService 
{
	@Autowired MailSettings mailSettings;
	
	@PostConstruct
	public void init() {
		System.out.println("Host: "+mailSettings.getHost());
	}
}
