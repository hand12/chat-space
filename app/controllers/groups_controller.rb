class GroupsController < ApplicationController
  def index
    @users = User.all
    respond_to do |format|
      format.json
    end
  end

  def new
    @group = Group.new
    @group.users << current_user
  end

  def edit
    @group = Group.find(params[:id])
  end

  def show
    @groups = current_user.groups.eager_load(:users).sort{|b,a| a.newest_message_time.to_s <=> b.newest_message_time.to_s}
    @group = Group.eager_load(:users, :messages).find(params[:id])
    @message = Message.new
  end

  def update
    group = Group.find(params[:id])
    if group.update(group_params)
      flash[:notice] = "グループを更新しました。"
      redirect_to group
    else
      flash[:notice] = "タイトルを入力してください。"
      redirect_to action: 'new'
    end
  end

  def create
    group = Group.create(group_params)
    if group.save
      flash[:notice] = "グループが作成されました。"
      redirect_to group
    else
      flash[:notice] = "タイトルを入力して下さい。"
      redirect_to action: 'new'
    end
  end

  private
  def group_params
    params.require(:group).permit(
      :name,
      user_ids: [])
  end
end
