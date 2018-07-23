select * from appointments
where client_id = $1
order by time asc
