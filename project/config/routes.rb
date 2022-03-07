Rails.application.routes.draw do
  # resources :tasks
  root 'users#root'
# /getTasks-task controller get task method,get the user id from seddion,then fetch the tasks
# gem devise/Goauth
  get 'logout', to: 'users#logout'
  get 'login', to: 'users#login'
  
  get 'user-detail',to: 'users#details'

  get 'get-tasks', to: 'tasks#get_my_tasks'
  post 'post-tasks',to: 'tasks#create_my_tasks'

  get 'get-onetask/:id',to: 'tasks#show_my_tasks'
  put 'put-tasks/:id',to: 'tasks#update_my_tasks'


  resources :users do
    resources :tasks
  end
  get 'auth/:provider/callback', to: 'sessions#googleAuth'
  get 'auth/failure', to: redirect('/')

  # get 'home/about'

  # get '/about'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  #root '#index'

  get '/*path', to: 'users#root'
  
end