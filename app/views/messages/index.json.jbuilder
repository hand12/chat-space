json.array!(@messages) do |message|
  json.extract! message, :id, :body, :created_at
end
