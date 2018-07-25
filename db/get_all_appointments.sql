select * from appointments a
join users u on a.client_id = u.id
order by a.time asc