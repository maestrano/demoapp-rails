class AddMaestranoToCompanies < ActiveRecord::Migration
  def self.up
    change_table(:companies) do |t|
      ## User source identification fields
      t.string :provider
      t.string :uid
    end
  end

  def self.down
    # By default, we don't want to make any assumption about how to roll back this migration.
    # Please edit below which fields you would like to remove in this migration.
    raise ActiveRecord::IrreversibleMigration
  end
end
