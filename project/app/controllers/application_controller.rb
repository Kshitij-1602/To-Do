class ApplicationController < ActionController::Base
    # protect_from_forgery with: :null_session
    # protect_from_forgery with: :exception
    skip_forgery_protection
    # skip_before_action :verify_authenticity_token
    # protect_from_forgery prepend: true
    #
    before_action :validate_if_req_authenticated

    @is_valid = nil

    def validate_if_req_authenticated
        uid = session[:current_user_id]
        if !uid
            redirect_to controller: :users, action: :login
        else
            expires_at = User.find_by_uid(uid).expires_at
            @is_valid = expires_at && (DateTime.now.localtime < expires_at.localtime) ? true : false
        end
        @is_valid
    end
end
