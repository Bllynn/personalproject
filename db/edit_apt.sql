update appointments
set time = $2
where id = $1;
select * from appointments
where client_id = $3