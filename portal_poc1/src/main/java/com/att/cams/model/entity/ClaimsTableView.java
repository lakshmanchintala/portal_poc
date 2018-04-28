package com.att.cams.model.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by lc5015 on 7/23/2017.
 */
@Entity
@Table(name = "CLAIMS_TABLE_VIEW")
@XmlRootElement
public class ClaimsTableView extends Base {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "VIEW_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id;

	@Column(name = "VIEW_NAME")
	private String name;

	@Column(name = "CREATED_DATE")
	private Date createdDate;

	@Column(name = "CREATED_BY")
	private String createdBy;

	@Column(name = "MODIFIED_DATE")
	private Date modifiedDate;
	
	@Column(name = "MODIFIED_BY")
	private String modifiedBy;
	
	@Column(name = "FIELDS_TO_DISPLAY")
	private String fieldsToDisplay;
	
	@Column(name = "VISIBILITY")
	private String visibility;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public String getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

	public String getFieldsToDisplay() {
		return fieldsToDisplay;
	}

	public void setFieldsToDisplay(String fieldsToDisplay) {
		this.fieldsToDisplay = fieldsToDisplay;
	}

	public String getVisibility() {
		return visibility;
	}

	public void setVisibility(String visibility) {
		this.visibility = visibility;
	}

}
