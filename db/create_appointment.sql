insert into appointments (time, client_id) values ($1, $2);
select * from appointments where client_id=$2
order by time asc