class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :task_name
      t.datetime :date_time
      t.string :description
      t.string :state,default: "OPEN"
      t.string :comments
      t.boolean :is_active,default: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
