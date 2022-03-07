class SessionsController < ApplicationController

  skip_before_action :validate_if_req_authenticated, :only => [:googleAuth]
  def googleAuth
      # Get access tokens from the google server
      access_token = request.env["omniauth.auth"]
      user = User.from_omniauth(access_token)

      # Refresh_token to request new access_token
      # Note: Refresh_token is only sent once during the first request
      refresh_token = access_token.credentials.refresh_token
      #user.google_refresh_token = refresh_token if refresh_token.present?
      user.expires_at = Time.at(access_token.credentials.expires_at).to_datetime
      user.uid = access_token.uid
      save_success = user.save
      #u can access these cookies in Frontend
      #cookies[:current_user_id] = user.uid # user.session_id
      #cookies[:current_user_name] = user.name
      session[:current_user_id] = user.uid
      @is_valid = true
      redirect_to root_path
    end
  end