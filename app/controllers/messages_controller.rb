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
      flash[:notice] = "本文を入力してください。"
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
