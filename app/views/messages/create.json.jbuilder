json.set! :name, @message.user.name
json.set! :body, @message.body
json.set! :time, @message.created_at.strftime("%m/%d %H:%M")

