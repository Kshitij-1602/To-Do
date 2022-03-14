class UserMailer < ApplicationMailer

    #Condition to check if due date has passed

    # def is_task_due(task)
    #     @date_check = task
    #     if(@date_check.date_time == nil)
    #         return false
    #     elseif (@date_check.date_time < DateTime.now.localtime)  
    #         return true
    #     else    
    #         return false
    #     end
    # end
    def notify_user
        @user = params[:user]
        @task = params[:task]

        # if is_task_due(@task) == true
        mail(to: @user.email,subject:"Task is due")
        # end
    end


    # def notify_user
    #     @user = params[:user]
    #     @task = params[:task]
    #     mail(to: @user.email,subject:"Task is Due")
    # end

end
# due date passed-null ignored