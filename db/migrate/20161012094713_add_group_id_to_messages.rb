class AddGroupIdToMessages < ActiveRecord::Migration[5.0]
  def change
    add_reference :messages, :group, index: true
  end
end
