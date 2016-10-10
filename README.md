# README

# Table Design

## messages_tabel
belongs_to :user
belongs_to :group
- body     :text
- image    :string
- group_id references: grounps
- user_id  references: users

## groups_tabel
has_many :messages
has_many :users, through: users_groups
- name     :string
- summary  :text

## users_tabel
has_many :messages
has_many :groups, through: users_groups
- name     :string
- profile  :text

## users_groups_table
belongs_to :user
belongs_to :group
user_id    :references: users
group_id   :references: groups
