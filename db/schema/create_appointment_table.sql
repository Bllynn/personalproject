create table appointments(
	 id serial primary key,
	time varchar(45),
	client_id  integer references Users(id)
	)