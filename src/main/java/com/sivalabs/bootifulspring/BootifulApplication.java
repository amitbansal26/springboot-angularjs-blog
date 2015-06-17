
package com.sivalabs.bootifulspring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

/**
 * @author Siva
 *
 */
@SpringBootApplication
@EnableConfigurationProperties
public class BootifulApplication 
{

	public static void main(String[] args) 
	{
		SpringApplication.run(BootifulApplication.class, args);
	}

}
