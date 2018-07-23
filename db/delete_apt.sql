delete from appointments
where id =$1;
select * from appointments
where client_id =$2
order by time asc