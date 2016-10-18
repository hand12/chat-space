class Group < ApplicationRecord
  has_many :messages
  has_many :user_groups
  has_many :users, through: :user_groups
  validates :name, presence: true

  def newest_message
    messages.last.body unless messages.last.nil?
  end

  def newest_message_time
    messages.last.created_at unless messages.last.nil?
  end

  def order_by_message
    sort{|a,b| a.newest_message_time.to_s <=> b.newest_message_time.to_s}
  end

end
