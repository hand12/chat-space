class MessagesController < ApplicationController
  before_action :set_messages, only: [:index, :create]
  before_action :authenticate_user!
  def index
    @message = Message.new
    @groups = current_user.groups
    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    @message = Message.new(create_params)
    respond_to do |format|
      if @message.save
        format.html do
          redirect_to :root
        end
        format.json
      else
        format.html do
          flash[:notice] = "本文を入力して下さい。"
          redirect_to :root
        end
        format.json do
          flash[:notice] = "本文を入力して下さい。"
          redirect_to :root
        end
      end
    end
  end

  private
  def create_params
    params.require(:message).permit(
      :body, :image).merge(group_id: current_user.groups.first.id, user_id: current_user.id)
  end

  def set_messages
    @messages = Message.order("created_at ASC")
  end
end
