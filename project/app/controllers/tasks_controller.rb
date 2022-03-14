class TasksController < ApplicationController
  before_action :set_user
  before_action :set_task, only: %i[ show edit update ]

  # skip_forgery_protection

  # GET /tasks or /tasks.json
  def index

    @tasks = @user.tasks
    # format.html { redirect_to user_tasks_path(@user.id), notice: "Tasks" }
    respond_to do |format|
      format.json {render json: @tasks }
    end
  end

  # rails postman 
  # def a func to check due date case.
  
  # GET /tasks/1 or /tasks/1.json
  def show
    @task = @user.tasks.find(params[:id])
    respond_to do |format|
      if is_task_due(@task) == true
        UserMailer.with(user: @user,task: @task).notify_user.deliver_later
      end
     
      format.json { render json: @task, status: :created }
    end

  end

  # GET /tasks/new
  def new
    # @task = Task.new
    #@user = User.find(params[:user_id])

    @task = @user.tasks.new()

  end

  # GET /tasks/1/edit
  def edit
    #@user = User.find(params[:user_id])

    @task = @user.tasks.find(params[:id])

  end

  # POST /tasks or /tasks.json
  def create
    #@user = User.find(params[:user_id])

    @task = @user.tasks.new(task_params)
    respond_to do |format|
      if @task.save
        format.json { render json: @task, status: :created, location: @user }
      else
        format.json { render json: @user.errors, status: :unprocessable_entity }   
      end
    end
  end
        # format.json { render json: @task.errors, status: :unprocessable_entity }
  # PATCH/PUT /tasks/1 or /tasks/1.json

  def update
    #@user = User.find(params[:user_id])

    @task = @user.tasks.find(params[:id])

    respond_to do |format|
      if @task.update(task_params)
   
         format.json { render json: @task, status: :ok, location: @user,notice: "Task updated" }
        else
          # format.html { render :edit, status: :unprocessable_entity }
          format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tasks/1 or /tasks/1.g
  def destroy
    #@user = User.find(params[:user_id])

    @task = @user.tasks.find(params[:id])

    @task.destroy
    respond_to do |format|
     # format.html { redirect_to user_tasks_path(@user.id), notice: "Task was successfully destroyed." }
     format.json { render json: @user.id,notice: "Task destroyed"}
    end
  end

  def get_my_tasks
    index
  end
   
  def create_my_tasks
    create
  end


  def show_my_tasks
    show
  end

  def update_my_tasks
    update
  end
  
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




  private
    # Use callbacks to share common setup or constraints between actions.

    def set_user
      @user = User.find_by_uid(session[:current_user_id])
    end
    def set_task
      @task = @user.tasks.find(params[:id])
      # @task = Task.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.require(:task).permit(:task_name, :date_time, :description, :state, :comments, :user_id,:is_active)
    end
end
