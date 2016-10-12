class GroupsController < ApplicationController
  def new
    @group = Group.new
    @group.users << current_user
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
    group = Group.find(params[:id])
    if group.update(group_params)
      flash[:notice] = "グループを更新しました。"
      redirect_to :root
    else
      flash[:notice] = "タイトルを入力してください。"
      redirect_to :back
    end
  end

  def create
    group = Group.create(group_params)
    if group.save
      flash[:notice] = "グループが作成されました。"
      redirect_to :root
    else
      flash[:notice] = "タイトルを入力して下さい。"
      redirect_to :back
    end
  end

  private
  def group_params
    params.require(:group).permit(
      :name,
      user_ids: [])
  end
end
