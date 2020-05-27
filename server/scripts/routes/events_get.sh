curl \
-H "Content-Type: application/json" \
-X GET "localhost:5000/api/events" | jq '.'
