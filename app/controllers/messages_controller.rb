class MessagesController < ApplicationController
  before_action :set_messages, only: [:index, :create]
  def index
    @message = Message.new
  end

  def create
    message = Message.new(create_params)
    if message.save
      flash[:notice] = "送信完了しました。"
    else
      flash[:notice] = "送信できませんでした。しばらく時間を置いてからもう一度実行してください。"
    end
  end

  private
  def create_params
    params.require(:message).permit(
      :body)
  end

  def set_messages
    @messages = Message.order("created_at ASC")
  end
end
