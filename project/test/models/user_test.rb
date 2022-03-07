require "test_helper"

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  test "should not save user without email" do
    user = User.new
    assert_not user.save
  end

  test "Check for User name" do
    user = User.new
    assert_not user.valid?,"Invlaid User Name"
    puts "Valid user name"
  end

  test "should not save user without uid" do
    user = User.new
    assert_not user.save
  end
   

end
