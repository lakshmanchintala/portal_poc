CREATE TABLE TRANSLATION(
	LITERAL_ID Integer not null,
	LITERAL_KEY varchar(256) not null,
	LITERAL_VALUE varchar(256) not null,
	LITERAL_LOCALE varchar(256) not null
);

INSERT into TRANSLATION (LITERAL_ID, LITERAL_KEY, LITERAL_VALUE, LITERAL_LOCALE) values (1,'KEY_TITLE','Welcome','English');
INSERT into TRANSLATION (LITERAL_ID, LITERAL_KEY, LITERAL_VALUE, LITERAL_LOCALE) values (2,'KEY_NAME','Name','English');
INSERT into TRANSLATION (LITERAL_ID, LITERAL_KEY, LITERAL_VALUE, LITERAL_LOCALE) values (3,'KEY_TITLE_MCP','Member Center Portal','English');

