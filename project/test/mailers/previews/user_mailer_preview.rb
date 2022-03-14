class UserMailerPreview < ActionMailer::Preview
    def notify_user
        UserMailer.with(user: User.last,task: Task.first).notify_user
    end
end