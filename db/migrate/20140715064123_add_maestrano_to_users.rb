class AddMaestranoToUsers < ActiveRecord::Migration
  def self.up
    change_table(:users) do |t|
      ## User source identification fields
      t.string :provider
      t.string :uid
      t.string :tenant
    end
  end

  def self.down
    # By default, we don't want to make any assumption about how to roll back this migration.
    # Please edit below which fields you would like to remove in this migration.
    raise ActiveRecord::IrreversibleMigration
  end
end
