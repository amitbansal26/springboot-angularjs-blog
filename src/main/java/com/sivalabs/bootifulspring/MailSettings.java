/**
 * 
 */
package com.sivalabs.bootifulspring;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * @author Siva
 *
 */
@Component
@ConfigurationProperties(prefix="spring.mail")
public class MailSettings {
	private String host;
	private int port;
	public String getHost() {
		return host;
	}
	public void setHost(String host) {
		this.host = host;
	}
	public int getPort() {
		return port;
	}
	public void setPort(int port) {
		this.port = port;
	}
	
	
}