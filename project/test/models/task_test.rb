require "test_helper"

class TaskTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "Checks for task name" do
    task = Task.new(task_name:"")
    assert_not task.valid?
    puts "Task name present"
  end

  test "should not save task without State" do
    task = Task.new
    assert_not task.save
  end
  
end
