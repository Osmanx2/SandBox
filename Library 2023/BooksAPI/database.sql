
CREATE EXTENSION pgcrypto;
SELECT gen_random_uuid();


CREATE TABLE books (
    id VARCHAR(32) PRIMARY KEY not null default gen_random_uuid(),
	date_created  timestamp not null,
	created_by VARCHAR(64) not null,
	publiser VARCHAR(512) null, -- Correct typo ie publisher
	date_issued  timestamp not null,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(5120) not null,
	cover_id VARCHAR(64),
    cost NUMERIC(5,2)
);


CREATE TABLE authors (
    id VARCHAR(32) PRIMARY KEY not null default gen_random_uuid(),
	date_of_birth timestamp not null,
    name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255) NULL,
	avatar VARCHAR(64),
    surname VARCHAR(255) NOT null
);


CREATE TABLE books_authors (
    id VARCHAR(32) PRIMARY KEY not null default gen_random_uuid(),
    author_id VARCHAR(255) NOT NULL,
    book_id VARCHAR(255) NOT NULL
);


ALTER TABLE books_authors
ADD CONSTRAINT books_authors_author_fk FOREIGN KEY (author_id) REFERENCES authors(id);
ALTER TABLE books_authors
ADD CONSTRAINT books_authors_book_fk FOREIGN KEY (book_id) REFERENCES books(id);



drop table books_authors;
drop table authors;
drop table books;