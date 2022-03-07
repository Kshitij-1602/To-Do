class Task < ApplicationRecord
  belongs_to :user
  validates :task_name,presence: true
  validates :state,presence: true
end
