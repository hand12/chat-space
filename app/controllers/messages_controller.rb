class MessagesController < ApplicationController
  before_action :authenticate_user!
  def index
    group = Group.eager_load(:messages, :users).find(params[:id])
    @messages = group.messages.order("created_at ASC")
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
          redirect_to controller: 'groups', action: 'show', id: message.group
        end
        format.json
      else
        format.html do
          flash[:notice] = "本文を入力して下さい。"
          redirect_to controller: 'groups', action: 'show', id: message.group
        end
        format.json do
          flash[:notice] = "本文を入力して下さい。"
        end
      end
    end
  end

  private
  def create_params
    params.require(:message).permit(
      :body, :image, :group_id).merge(user_id: current_user.id)
  end
end
