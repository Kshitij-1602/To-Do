class Task < ApplicationRecord
  belongs_to :user
  validates :task_name,presence: true
  validates :state,presence: true

  def is_task_due(task)
    @date_check = task
    if @date_check.date_time == nil
        return false
    elsif @date_check.date_time < DateTime.now.localtime
        # return true
        return true
    else    
        return false
    end
  end

  def task_mail
    @user= User.all
    @task = Task.all
    
    @user.each do |x|
      count=0
      @task.each do |u|
        if is_task_due(@task) == true
          UserMailer.with(user: @user,task: @task).notify_user.deliver_later
          count+=1
        end
      end
    end
  end
  
end
