package com.rogers.mcp.model.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by suresh on 1/13/17.
 */
@Entity
@Table(name = "TRANSLATION")
public class Translation extends Base{

    @Id
    @Column(name = "LITERAL_ID")
    @GeneratedValue
    private int id;

    @Column(name = "LITERAL_KEY")
    @NotNull
    private String key;

    @Column(name = "LITERAL_VALUE")
    @NotNull
    private String text;

    @Column(name = "LITERAL_LOCALE")
    @NotNull
    private String locale;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getLocale() {
        return locale;
    }

    public void setLocale(String locale) {
        this.locale = locale;
    }
}
