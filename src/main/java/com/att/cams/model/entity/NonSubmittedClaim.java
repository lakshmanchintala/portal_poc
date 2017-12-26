package com.att.cams.model.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by SaiRaj on 2/15/17.
 */
@Entity
@Table(name = "NON_SUBMITTED_CLAIMS")
@XmlRootElement
public class NonSubmittedClaim extends Base {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "CLAIM_ID")
	//@GeneratedValue
	private String id;

	@Column(name = "CLAIM_JSON")
	private String value;

	@Column(name = "CREATION_DATE")
	private Date creationDate;
	
	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public String getId() {
		return id;
	}

	public String getValue() {
		return value;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setValue(String value) {
		this.value = value;
	}

}
