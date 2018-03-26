UPDATE reviews
SET reviewsid= $1, reviewname = $2, description = $3
WHERE reviewsid = $1;