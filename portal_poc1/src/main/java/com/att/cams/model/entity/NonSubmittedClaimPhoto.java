package com.att.cams.model.entity;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by SaiRaj on 2/21/17.
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "non_submitted_claims_photos")
@XmlRootElement
public class NonSubmittedClaimPhoto extends Base {

	@Id
	@Column(name = "photo_Id")
	@GeneratedValue
	private int id;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getClaimid() {
		return claimid;
	}

	public void setClaimid(String claimid) {
		this.claimid = claimid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

/*	@ManyToOne
    @JoinColumn(name = "CLAIM_ID")*/
	@Column(name = "claim_id")
	private String claimid;
	
	@Column(name = "photo_Name")
	private String name;

	

}
