package com.persenkultra.times.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@XmlRootElement
@Entity(name="Users")
@NamedQueries({@NamedQuery(name="allUsers", query="SELECT u FROM Users u")})
public class User {

	@Id
	@GeneratedValue
	private long id;
	
	@Column(nullable = false, length = 50)
	private String username;
	
	@JsonIgnore
	@Column(nullable = false, length = 50)
	private String password;
	
	@Column(nullable=false)
	@Enumerated(EnumType.STRING)
	private Role role = Role.VOLUNTEER;
	
	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@JsonIgnore
	public String getPassword() {
		return password;
	}

	@JsonProperty
	public void setPassword(String password) {
		this.password = password;
	}
}
