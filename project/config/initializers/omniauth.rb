Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV['GOOGLE_CLIENT_ID']='94943675780-rv6l3rs1lvqe1t6gfi52r575p1jovt6v.apps.googleusercontent.com', ENV['GOOGLE_CLIENT_SECRET']='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'
end

OmniAuth.config.allowed_request_methods = %i[get]